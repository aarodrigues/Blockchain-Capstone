
var SquareVerifier = artifacts.require('Verifier');
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var JsonProof = require('../../zokrates/code/square/proof.json');

contract('TestSolnSquareVerifier', accounts => {

    describe('Verify SolnSquareVerifier', function () {
        beforeEach(async function () { 
            let verifier = await SquareVerifier.new({from: accounts[0]});
            this.contract = await SolnSquareVerifier.new(verifier.address,"DykrasToken", "DT_721",{from: accounts[0]});
        })

        // Test if a new solution can be added for contract - SolnSquareVerifier
        it('Test if a new solution can be added for contract', async function () { 

            await this.contract.addSolution(JsonProof.proof["a"],JsonProof.proof["b"],
                                                JsonProof.proof["c"],JsonProof.input,{from:account_one});
            let result = true;
            try {
                await this.contract.mint(GeneratedProof.input,account_two,{from:account_one});
            }
            catch(e) {
                result = false;
            }
            assert.equal(result, true, "Token cannot be mined");
        });
            
        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it('Test if an ERC721 token can be minted for contract', async function () { 
            
        });

    });

})