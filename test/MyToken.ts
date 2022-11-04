import { MyToken__factory } from "../typechain-types";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("MyToken", function () {
    let tokenFactory: MyToken__factory;
    let otherAccount: any;
    let owner: any;
    let token: any;

    beforeEach(async function () {
        [owner, otherAccount] = await ethers.getSigners();

        tokenFactory = (await ethers.getContractFactory("MyToken", owner));
        const totalSupply = (10 ** 9).toString()

        token = await tokenFactory.deploy(ethers.utils.parseEther(totalSupply))
    });

    describe("Deployment", function () {
        it("Should assign the total supply of tokens to the owner", async function () {
            const ownerBalance = await token.balanceOf(owner.address);
            expect(await token.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe("Basic functionalities", function () {
        it("Owner can call the 'mint' function", async function () {
            expect(await token.connect(owner).mint(2000)).to.contain({ confirmations: 1 });
            expect(await token.connect(otherAccount).mint(2000)).to.be.revertedWith(`Ownable: caller is not the owner`);
        });
    });

});
