pragma solidity >=0.4.21 <0.6.0;

import './ERC721Mintable.sol';

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
//import './../../zokrates/code/square/verifier.sol';
contract Verifier {

    function verifyTx(
            uint[2] memory a,
            uint[2][2] memory b,
            uint[2] memory c,
            uint[2] memory input
        ) public returns (bool r);
}


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class

contract SolnSquareVerifier is ERC721Mintable {

Verifier zkVerifier;

// TODO define a solutions struct that can hold an index & an address
struct Solution{
    uint256 index;
    address addr;
}

// TODO define an array of the above struct
Solution[] solution_list;
uint256 solutionCount = 0;

// TODO define a mapping to store unique solutions submitted
mapping(bytes32 => Solution) submittedSolutions;

constructor(address verifierAddress, string memory name, string memory symbol) ERC721Mintable(name, symbol) public
{
    zkVerifier = Verifier(verifierAddress);
}

// TODO Create an event to emit when a solution is added
event AddedSolution(uint256 index, address addr);


// TODO Create a function to add the solutions to the array and emit the event
function AddSolution(uint[2] memory a,
            uint[2][2] memory b,
            uint[2] memory c,
            uint[2] memory input) internal {

        bytes32 key = keccak256(abi.encodePacked(input[0], input[1]));
        require(submittedSolutions[key].addr == address(0), "Solution exists already");

        bool verified = zkVerifier.verifyTx(a, b, c, input);
        require(verified, "Solution could not be verified");

        Solution memory solution;
        solution.index = solutionCount;
        solution.addr = msg.sender;
        submittedSolutions[key] = solution;
        solution_list.push(solution);

        emit AddedSolution(solutionCount, msg.sender);
        solutionCount++;
}


// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly
function mint(uint a, uint b,address to) external {

    bytes32 key = keccak256(abi.encodePacked(a, b));
    require(submittedSolutions[key].addr == msg.sender, "Is not allowed to mint the token");
    require(submittedSolutions[key].addr != address(0), "There is no solution");
    super.mint(to, submittedSolutions[key].index);
}

}


























