pragma solidity >=0.5.0 <0.6.0;

contract Main {
  address owner;
  uint watthour;
  
  constructor() public {
    owner = msg.sender;
  }

  struct Panel {
    uint registrationNumber;
    uint16 monthsOfLife;
    uint16 pp10kForPanel; //ratio for total income to panel in parts per 10k, for instance 10% = 1000pp10k
    string manufacturer;
    address payable manufacturerAddress;
    address payable ownerAddress;
    address payable recyclerAddress;
    bool isActive;
    uint balance;
    uint recyclingCost;
    //******** New ********////******** New ********////******** New ********////******** New ********//
    //***edit 1 */
    watthour[] watthours;
    //******** New ********////******** New ********////******** New ********////******** New ********//
  }

  Panel[] public panels;
  mapping (uint => uint) public registrationToId;
  //***edit 2 */
  //watthour[] public watthours;
  /* modifier to restrict function calls to only active panels */
  modifier isActive(uint _panelId) {
    require(panels[_panelId].isActive);
    _;
  }

  /* Modifier requiring that the sender address is trusted third party */
  modifier trusted() {
    /* TODO
    check if the caller of the function is trusted third party,
    or oracle, maybe in form of a list of addresses checked against
    msg.sender */
    require(owner==msg.sender);
    _;
  }
//******** New ********////******** New ********////******** New ********////******** New ********//
  modifier onlyManufacturer() {
    //TODO: make array with manufacturer addresses
    require(true);
    _;
  }
//******** New ********////******** New ********////******** New ********////******** New ********//


  event PanelRegistered(uint panelId, uint registrationNumber, string manufacturer, address manufacturerAddress, address ownerAddress);
  /* Function to register a panel, this marks the beginning of the lifetime of a panel */
  //******add only manufacturer New ********////******** New ********////******** New ********////******** New ********//
  function registerPanel(uint _registrationNumber, string calldata _manufacturer, address payable _manufacturerAddress, address payable _ownerAddress) external onlyManufacturer() returns (uint) {
    uint panelId = panels.push(Panel(_registrationNumber, 0, uint16(1000), _manufacturer, _manufacturerAddress, _ownerAddress, address(uint160(0)), true, 0, 0, new uint[](0))) - 1;
    registrationToId[_registrationNumber] = panelId;
    emit PanelRegistered(panelId, _registrationNumber, _manufacturer, _manufacturerAddress, _ownerAddress);
    return panelId;
  }

  /* Function to say that a panel has been operating for 1 month longer */
  //******** private ********////******** New ********////******** New ********////******** New ********//
  function _increaseLifetime(uint _panelId) private {
    panels[_panelId].monthsOfLife++;
  }

  event DepositMade(uint panelId, uint valueReceived, address payerAddress);
  /* Funtion to deposit ether to a panel */
  function deposit(uint _panelId) external payable {
    panels[_panelId].balance = panels[_panelId].balance + msg.value;
    emit DepositMade(_panelId, msg.value, msg.sender);
  }
//******** uint _watthours ********////******** New ********////******** New ********////******** New ********//
  function pay(uint _panelId, uint _watthour) external payable {
    Panel storage panel = panels[_panelId];
    uint valueForPanel = msg.value*panel.pp10kForPanel/10000;
    uint valueForOwner = msg.value - valueForPanel;
    panel.ownerAddress.transfer(valueForOwner);
    panel.balance = panel.balance + valueForPanel;
    panel.watthours.push(_watthour);
    _increaseLifetime(_panelId);
    emit DepositMade(_panelId, valueForPanel, msg.sender);
  }

  function updatePanelShare(uint _panelId, uint _pp10kForPanel) external trusted() {
    panels[_panelId].pp10kForPanel = uint16(_pp10kForPanel);
  }

  /* Function to set the address and the cost of the recycler */
  function setRecycler(uint _panelId, address payable _recyclerAddress, uint _recyclingCost) external trusted() {
    require(_recyclerAddress != address(0));
    panels[_panelId].recyclerAddress = _recyclerAddress;
    panels[_panelId].recyclingCost = _recyclingCost; //Assume that recyclingCost already includes some profit margin for recycling company
  }

  /* Helper function calculating the shares for the involced parties based on balance etc... */
  function calculateShares(uint _panelId) public view returns (uint, uint, uint) {
    Panel storage panel = panels[_panelId];
    require(panel.recyclerAddress != address(0));
    uint ownerShare = 0;
    uint recyclerShare = panel.recyclingCost;
    uint manufacturerShare = 0;
    // Recycler gets his cost, if balances not sufficcient then just all the balances
    recyclerShare = panel.recyclingCost;
    if (recyclerShare >= panel.balance) {
        recyclerShare = panel.balance;
    }
    // If the panel lasted longer than 3 years, the manufacturer gets 5% of the rest
    if (panel.monthsOfLife >= 3*12) {
        manufacturerShare = 5 * (panel.balance - recyclerShare) / 100;
    }
    // finally user gets the rest
    ownerShare = panel.balance - recyclerShare - manufacturerShare;
    return(ownerShare, recyclerShare, manufacturerShare);
  }

  event PanelClosed(uint panelId, address ownerAddress, uint ownerShare, address recyclerAddress, uint recyclerShare, address manufacturerAddress, uint manufacturerShare);
  /* This function marks the end of the lifetime of the PV panel,
  The shares for the involced parties are calculated and paid. */
  function close(uint _panelId) external trusted() {
    uint ownerShare;
    uint recyclerShare;
    uint manufacturerShare;
    (ownerShare, recyclerShare, manufacturerShare) = calculateShares(_panelId);
    Panel storage panel = panels[_panelId];
    panel.ownerAddress.transfer(ownerShare);
    panel.recyclerAddress.transfer(recyclerShare);
    panel.manufacturerAddress.transfer(manufacturerShare);
    panel.isActive = false;
    emit PanelClosed(_panelId, panel.ownerAddress, ownerShare, panel.recyclerAddress, recyclerShare, panel.manufacturerAddress, manufacturerShare);
  }
}