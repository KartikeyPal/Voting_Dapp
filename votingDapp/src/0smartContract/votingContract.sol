// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Vote {
    address electionComission;
    address public winner;
    bool stopVoting; 
    enum Gender{Male,Female,Other}

    //User
    struct Voter {
        string name;
        uint age;
        uint voterId;
        Gender gender;
        uint voteCandidateId;
        address voterAddress;
    }

    struct Candidate {
        string name;
        string party;
        uint age;
        Gender gender;
        uint candidateId;
        address candidateAddress;
        uint votes;
    }
    enum VotingStatus{Notstarted,InProgress,Ended}

    uint nextVoterId = 1; 
    uint nextCandidateId = 1; 
    uint startTime; 
    uint endTime; 

    mapping(uint => Voter) voterDetails; 
    mapping(uint => Candidate) candidateDetails; 
    mapping(address =>uint) VoterProfile;
   

    IERC20 public voteToken;
    event NewCandidateRegistered(string name, string party, uint age, Gender gender, uint candidateId);
    event NewVoterRegistered(string name,uint age, Gender gender, uint VoterId);
    event VoteCasted(uint VoterId,uint candidateId);
    event VotingPeriodSet(uint startTime,uint endTime);
    event VotingStatusUpdated(VotingStatus status);
    event ElectionResultAnnouced(address winner);

    constructor(address _voteToken) {
        voteToken = IERC20(_voteToken);
        electionComission = msg.sender; 
    }

    modifier isVotingActive() {
        // require(block.timestamp > endTime || stopVoting == true, "Voting is not over");
        require(startTime!=0,"Voting is not Started");
        require(block.timestamp < endTime,"Voting is over");
        require(stopVoting==false ,"Voting is stoped By election Commission");
        _;
    }

    modifier onlyCommissioner() {
        require(electionComission == msg.sender, "Not from election commission");
        _;
    }
    function candidateVerification(address _person) internal view returns(bool) {
        for(uint i=1;i<nextCandidateId;i++){
            if(candidateDetails[i].candidateAddress==_person){
                return false;
            }
        }
        return true;
    }

    function voterList() public view returns(Voter[] memory) {
        Voter[] memory array = new Voter[](nextVoterId -1);
        for(uint i=1;i<nextVoterId;i++){
            array[i-1]=voterDetails[i];
        }
        return array;
    }

    function voterVerification(address _person) internal view returns(bool) {
         for(uint i=1;i<nextVoterId;i++){
            if(voterDetails[i].voterAddress==_person){
                return false;
            }
        }
        return true;
    }

    function candidateRegister(string calldata _name, string calldata _party, uint _age, Gender _gender) external {
       require(msg.sender!=electionComission,"Election Commision not allowed");
       require(candidateVerification(msg.sender),"Twice registration not possible");
       require(_age>18,"Inelgibile to vote");
       require(nextCandidateId<3,"Candidate registration over");
       candidateDetails[nextCandidateId]=Candidate({
        name : _name,
        party : _party,
        age:_age,
        gender : _gender,
        candidateId : nextCandidateId,
        candidateAddress : msg.sender,
        votes : 0
       });
       nextCandidateId++;
    }

    function candidateList() public view returns(Candidate[] memory) { 
        Candidate[] memory array = new Candidate[](nextCandidateId-1);
        for(uint i=1;i<nextCandidateId;i++){
            array[i-1]=candidateDetails[i];
        }
        return array;
    }

    


    function voterRegister(string calldata _name, uint _age, Gender _gender) external {
        require(voterVerification(msg.sender), "Voter Already Registered");
        require(_age >= 18, "You are not eligible");
        voterDetails[nextVoterId] = Voter({
            name: _name,
            age: _age,
            voterId: nextVoterId,
            gender: _gender,
            voteCandidateId : 0,
            voterAddress : msg.sender
        });
        VoterProfile[msg.sender] = nextVoterId;
        emit NewVoterRegistered(_name, _age,  _gender,  nextVoterId);
        nextVoterId++;
    }

    function userProfile() public view returns (Voter memory) {
        uint voterId = VoterProfile[msg.sender];
        return voterDetails[voterId];
    }


    function vote(uint _voterId, uint _Id) external isVotingActive(){
        require(voteToken.balanceOf(msg.sender)>0,"Not enough Tokens ");
        require(voterDetails[_voterId].voteCandidateId==0,"Already voted");
        require(voterDetails[_voterId].voterAddress==msg.sender,"You are not a voter");
        require(startTime!=0,"Voting not yet started");
        require(nextCandidateId==3,"Canidates have not registered");
        require(_Id>0  && _Id<3,"Invalid candidates id");
        voterDetails[_voterId].voteCandidateId=_Id;
        candidateDetails[_Id].votes++;
        emit VoteCasted(_voterId, _Id);
    }

    function voteTime(uint _startTime, uint _endTime) external onlyCommissioner() {
        require(_endTime > _startTime, "End time must be after start time");
        startTime=_startTime; 
        endTime=_endTime;
        emit VotingPeriodSet(startTime,endTime);
    }

    function votingStatus() public view returns(VotingStatus) {
       if(startTime==0){
           return VotingStatus.Notstarted;
       }else if((startTime!=0 && endTime>block.timestamp) && !stopVoting){
           return VotingStatus.InProgress;
       }else{
           return VotingStatus.Ended;
       }
    }

    function result() external onlyCommissioner() {
        require(nextCandidateId>1,"No candidates registered");
        uint maximumVotes=0;
        address currentWinner;
        for(uint i=1;i<nextCandidateId;i++){
            if(candidateDetails[i].votes>maximumVotes){
                maximumVotes=candidateDetails[i].votes;
                currentWinner=candidateDetails[i].candidateAddress;
                }
        }
        winner = currentWinner;
        emit ElectionResultAnnouced(winner);
    }

    function emergency() public onlyCommissioner() {
       stopVoting=true;
    }
}

