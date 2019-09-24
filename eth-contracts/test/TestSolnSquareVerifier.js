
var SquareVerifier = artifacts.require('Verifier');
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var JsonProof = require('../../zokrates/code/square/proof.json');

contract('TestSolnSquareVerifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('Verify SolnSquareVerifier', function () {
        beforeEach(async function () { 
            let verifier = await SquareVerifier.new({from: account_one});
            this.contract = await SolnSquareVerifier.new(verifier.address,"DykrasToken", "DT_721",{from: account_one});
        })

        // Test if a new solution can be added for contract - SolnSquareVerifier
        it('Test if a new solution can be added for contract', async function () { 

            let result = true;
            try {
                await this.contract.addSolution(JsonProof.proof["a"],JsonProof.proof["b"],
                                                JsonProof.proof["c"],JsonProof.inputs,{from:account_one});
            }
            catch(e) {
                result = false;
            }
            assert.equal(result, true, "Token cannot be minted.");
        });
            
        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it('Test if an ERC721 token can be minted for contract', async function () { 
            
            await this.contract.addSolution(JsonProof.proof["a"],JsonProof.proof["b"],
                                                JsonProof.proof["c"],JsonProof.inputs,{from:account_one});
            let result = true;
            try {
                await this.contract.mintNewNFT(JsonProof.inputs[0], JsonProof.inputs[1],account_two,{from:account_one});
            }catch(e) {
                result = false;
            }
            assert.equal(result, true, "Same solution added.");
        });

        it('Test if a solution can be added twice for contract', async function () { 
            
            await this.contract.addSolution(JsonProof.proof["a"],JsonProof.proof["b"],
                                                JsonProof.proof["c"],JsonProof.inputs,{from:account_one});
            let result = true;
            try {
                await this.contract.addSolution(JsonProof.proof["a"],JsonProof.proof["b"],
                                                JsonProof.proof["c"],JsonProof.inputs,{from:account_two});
            }
            catch(e) {
                result = false;
            }
            assert.equal(result, false, "Same solution added.");
        });

    });

})