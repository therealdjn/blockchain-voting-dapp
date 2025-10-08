// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    address public admin;
    bool public votingActive = false;

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    struct Voter {
        bool registered;
        bool voted;
    }

    mapping(address => Voter) public voters;
    Candidate[] public candidates;

    event Voted(address indexed voter, uint candidateId);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    modifier onlyDuringVoting() {
        require(votingActive, "Voting not active");
        _;
    }

    constructor(string[] memory candidateNames) {
        admin = msg.sender;
        for (uint i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate(i, candidateNames[i], 0));
        }
    }

    function registerVoter(address _voter) public onlyAdmin {
        voters[_voter].registered = true;
    }

    function startVoting() public onlyAdmin {
        votingActive = true;
    }

    function endVoting() public onlyAdmin {
        votingActive = false;
    }

    function vote(uint candidateId) public onlyDuringVoting {
        Voter storage sender = voters[msg.sender];
        require(sender.registered, "Not registered");
        require(!sender.voted, "Already voted");
        require(candidateId < candidates.length, "Invalid candidate");

        sender.voted = true;
        candidates[candidateId].voteCount += 1;
        emit Voted(msg.sender, candidateId);
    }

    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getResults() public view returns (uint[] memory) {
        uint[] memory results = new uint[](candidates.length);
        for (uint i = 0; i < candidates.length; i++) {
            results[i] = candidates[i].voteCount;
        }
        return results;
    }
}