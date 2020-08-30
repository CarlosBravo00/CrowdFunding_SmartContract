pragma solidity >=0.4.22 <0.7.0;

contract Ballot {
    
    struct Voter {
        bool voted;  
        uint vote;   
    }

    struct Proposal {
        address owner;
        string name; 
        uint voteCount; 
    }

    mapping(address => Voter) voters;

    Proposal[] public proposals;
    
    function createProposal(string _name) public {
            proposals.push(Proposal({
                owner:  msg.sender,
                name: _name,
                voteCount: 0
            }));
    }
    
    function getProposal( uint proposal) public view returns (string , uint){
        return (proposals[proposal].name,proposals[proposal].voteCount);
    }
    
    function vote(uint proposal) public{
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "Already voted.");
        require(proposals[proposal].owner != msg.sender, "Cant vote for own Proposal");
        sender.voted = true;
        sender.vote = proposal;
        proposals[proposal].voteCount += 1;
    }

    function TopProposal() public view
            returns (uint winningProposal_)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

}