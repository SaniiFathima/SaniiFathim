// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract SubContract {

    // Events that NGOs have can be of two types
    enum typeOfEvent {
        shortTermEvent, // 1 or 2 day event
        longTermEvent // usually week or month long
    }

    // Each volunteer (address), for a particular event is assigned a hash
    mapping(address => mapping(uint16 => uint8)) listOfVolunteerHashes;

    // Structure for volunteer details
    struct VolunteerDetails {
        string name;
        string email;
        string phone;
    }

    // Each NGO has some metadata, like the owner address and the list of activities they have
    struct NGODetails {
        string name;
        string location;
        string[] eventName; // Name of the event
        string[] eventLocation;
        string[] shiftStartTime; // When the shift starts, volunteer clocks in
        string[] shiftEndTime; // When the shift ends, volunteer clocks out, or gets auto-clocked out
        string[] startDate;
        string[] endDate;
        uint128 lastEventCounter; // Doubles as eventID
    }

    // Structure to send back metadata only
    struct EventDetails {
        string eventName; // Name of the event
        string eventLocation;
        string shiftStartTime; // When the shift starts, volunteer clocks in
        string shiftEndTime; // When the shift ends, volunteer clocks out, or gets auto-clocked out
        string startDate;
        string endDate;
    }

    // Mappings
    mapping(address => NGODetails) public listOfNGOs; // Each NGO (owner address) is mapped to their own metadata and list of events
    mapping(address => mapping(uint128 => address[])) volunteersListForEventIDForANGO;
    mapping(address => VolunteerDetails) public listOfVolunteers; // Each volunteer (address) is mapped to their own details

    // Add a short activity for a NGO
    function addActivity(
        string memory _name, 
        string memory _shiftStartTime,
        string memory _shiftEndTime,
        string memory _startDate, 
        string memory _endDate, 
        string memory _location, 
        address _NGOAddress
    ) public {          
        uint128 currentCounter = listOfNGOs[_NGOAddress].lastEventCounter; // Free index
        // Set all event metadata
        listOfNGOs[_NGOAddress].eventName[currentCounter] = _name;
        listOfNGOs[_NGOAddress].eventLocation[currentCounter] = _location;
        listOfNGOs[_NGOAddress].shiftStartTime[currentCounter] = _shiftStartTime;
        listOfNGOs[_NGOAddress].shiftEndTime[currentCounter] = _shiftEndTime;
        listOfNGOs[_NGOAddress].startDate[currentCounter] = _startDate;
        listOfNGOs[_NGOAddress].endDate[currentCounter] = _endDate;
        // Increment counter
        updateEventCounterForNGO(_NGOAddress);
    }
    
    // Get activities for a NGO
    function getActivities(address _NGOAddress) public view returns(NGODetails memory) {
        return listOfNGOs[_NGOAddress];
    }

    // Add volunteers to an event ID for a NGO
    function addVolunteersToAnEventIDForANGO(
        address _NGOAddress, 
        uint128 _eventID, 
        address _volunteerAddress
    ) public {
        volunteersListForEventIDForANGO[_NGOAddress][_eventID].push(_volunteerAddress);
    }

    // To add or set NGO data
    function setNGOToContract(
        string memory _name,
        string memory _location,
        address _NGOAddress,
        string[] memory _temporary
    ) public {
        listOfNGOs[_NGOAddress] = NGODetails(
            _name, 
            _location, 
            _temporary, 
            _temporary, 
            _temporary, 
            _temporary, 
            _temporary, 
            _temporary, 
            0
        );
    }

    // To increment the counter
    function updateEventCounterForNGO(address _NGOAddress) internal {
        listOfNGOs[_NGOAddress].lastEventCounter += 1;
    }

    // To get complete information for an event given eventID and NGOAddress (for user)
    function getCompleteInformationOnAnEventUserRegisteredFor(
        uint128 _eventID, 
        address _NGOAddress
    ) public view returns (EventDetails memory) {
        NGODetails memory temp = listOfNGOs[_NGOAddress];
        EventDetails memory returnObj = EventDetails(
            temp.eventName[_eventID], 
            temp.eventLocation[_eventID],
            temp.shiftStartTime[_eventID],
            temp.shiftEndTime[_eventID],
            temp.startDate[_eventID],
            temp.endDate[_eventID]
        );
        return returnObj;
    }

    // To add or set volunteer data
    function setVolunteerToContract(
        string memory _name,
        string memory _email,
        string memory _phone,
        address _volunteerAddress
    ) public {
        listOfVolunteers[_volunteerAddress] = VolunteerDetails(_name, _email, _phone);
    }

    // To get volunteer details
    function getVolunteerDetails(address _volunteerAddress) public view returns (VolunteerDetails memory) {
        return listOfVolunteers[_volunteerAddress];
    }

    // To get NGO details
    function getNGODetails(address _NGOAddress) public view returns (NGODetails memory) {
        return listOfNGOs[_NGOAddress];
    }

}
