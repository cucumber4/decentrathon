// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Voting {
    struct Poll {
        string name;
        string[] candidates;
        mapping(string => uint256) votes;
        mapping(address => bool) hasVoted;
        bool active;
    }

    mapping(uint256 => Poll) public polls;
    uint256 public pollCount;

    // Создание голосования
    function createPoll(string memory _name, string[] memory _candidates) public {
        Poll storage newPoll = polls[pollCount];
        newPoll.name = _name;
        newPoll.candidates = _candidates;
        newPoll.active = true;
        pollCount++;
    }

    // Голосование за кандидата
    function vote(uint256 pollId, string memory candidate) public {
        require(pollId < pollCount, "Vote poll does not exist");
        Poll storage poll = polls[pollId];
        require(poll.active, "Vote poll closed");
        require(!poll.hasVoted[msg.sender], "You have alreadt voted");
        
        poll.votes[candidate]++;
        poll.hasVoted[msg.sender] = true;
    }

    // Получение результата для конкретного кандидата
    function getResult(uint256 pollId, string memory candidate) public view returns (uint256) {
        require(pollId < pollCount, "Vote poll does not exist");
        return polls[pollId].votes[candidate];
    }
}
