pragma solidity >=0.4.21 <0.6.0;

import './ERC721Mintable.sol';

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract Verifier {

}


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class

contract SolnSquareVerifier is CustomToken {

Verifier zkVerifier;

// TODO define a solutions struct that can hold an index & an address
struct Solutions{
    uint256 index;
    address addr;
}

// TODO define an array of the above struct
Solutions[] solutions_list;

// TODO define a mapping to store unique solutions submitted
mapping(bytes32 => Solutions) submittedSolutions;

constructor(address verifierAddress, string memory name, string memory symbol) CustomToken(name, symbol) public
{
    zkVerifier = Verifier(verifierAddress);
}

// TODO Create an event to emit when a solution is added
event AddedSolution(uint256 index, address addr);


// TODO Create a function to add the solutions to the array and emit the event
function AddSolution(Solutions storage solution) internal {
    solutions_list.push(solution);
    bytes32 key = keccak256(abi.encodePacked(solution.index,solution.addr));
    submittedSolutions[key] = solution;
    emit AddedSolution(solution.index,solution.addr);
}


// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly
function mint() external {

}

}


























