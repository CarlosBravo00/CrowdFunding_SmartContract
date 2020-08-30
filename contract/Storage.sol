pragma solidity >=0.4.22 <0.7.0;

contract Ballot {
   
    struct Voter {
        bool voted;  // if true, that person already voted
        uint vote;   // index of the voted proposal
    }

    struct Proposal {
        address owner;
        string name; 
        string descr;// short name (up to 32 bytes)
        uint voteCount; // number of accumulated votes
    }

    mapping(address => Voter) voters;

    Proposal[] proposals;
    
    function createProposal(string _name, string _descr) public {
            proposals.push(Proposal({
                owner:  msg.sender,
                name: _name,
                descr: _descr,
                voteCount: 0
            }));
    }
    
    function getProposal( uint proposal) public view returns (string, uint){
        return (proposals[proposal].name,proposals[proposal].voteCount);
    }
    
    function vote(uint proposal) public{
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "Already voted.");
        require(proposals[proposal].owner != msg.sender, "Cant vote for own");
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
