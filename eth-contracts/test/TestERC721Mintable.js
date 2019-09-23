var ERC721Mintable = artifacts.require('ERC721Mintable');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        let tokens = [2,4,6,8,10];
        beforeEach(async function () { 
            this.contract = await ERC721Mintable.new("DykrasToken", "DT_721", {from: account_one});

            // TODO: mint multiple tokens
            for (let i = 0; i < tokens.length; i++) {
                await this.contract.mint(accounts[i + 1], tokens[i], {from: account_one});
            }
        
        })

        it('should return total supply', async function () { 

            let total = await this.contract.totalSupply .call({from: account_two});
            assert.equal(total.toString(), tokens.length, "Wrong token amount.");
        })

        it('should get token balance', async function () { 
            let balance = await this.contract.balanceOf.call(accounts[1],{from: account_two});
            assert.equal(balance.toString(), 1, "Wrong token amount to user.");
        })

        // // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenURI = await this.contract.tokenURI.call(tokens[2],{from: account_two});
            assert.equal(tokenURI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"+tokens[2], "Invalid token URI.");
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferOwnership(account_two,{from: account_one});
            let new_owner = await this.contract.getOwner.call({from: account_one});
            assert.equal(new_owner,account_two, "Owner could not be changed");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721Mintable.new("DykrasToken", "DT_721",{from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            tokenId = 3;
            success = true;
            try{
                await this.contract.mint(accounts[1], tokenId, {from: account_two});
            }catch(e){
                success = false;
            }
            assert.equal(success, false, "It is possible to mint a token without be owner.");
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.getOwner.call({from: account_one});
            assert.equal(owner,account_one, "Invalid owner.")
        })

    });
})