pragma solidity >=0.4.22 <0.7.0;

contract CrowdFunding{
    
    struct Proposal {
        address owner;
        string name; 
        uint voteCount; 
    }
    
    struct Voter {
        bool voted;  
        uint vote;   
    }
    

    event voted(address voter, uint proposal);

    mapping(address => Voter) voters;

    Proposal[] proposals;
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
    
    function getVoter() public view returns( bool, uint){
         Voter storage sender = voters[msg.sender];
         return(sender.voted,sender.vote);
    }
    
    function vote(uint proposal) public{
        Voter storage sender = voters[msg.sender];
        require(!sender.voted);
        require(proposals[proposal].owner != msg.sender);
        sender.voted = true;
        sender.vote = proposal;
        emit voted(msg.sender, proposal);
        proposals[proposal].voteCount += 1;
    }

    function TopProposal() public view returns (uint topProposal_)
    {
        uint topVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > topVoteCount) {
                topVoteCount = proposals[p].voteCount;
                topProposal_ = p;
            }
        }
    }

}