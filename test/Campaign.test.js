const Campaign = artifacts.require("Campaign");

var chai =  require("chai");
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);
require("dotenv").config({path: "../.env"});
var chaiAsPromised =  require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("Campaign", async (accounts) => {

    
    it(". . . should be able donate", async () => {
        let instance = await Campaign.deployed();

        await instance.donate({ from: accounts[1], value: web3.utils.toWei("10", "ether") });
    });

    it(". . . should be able to withdrawal", async () => {
        let instance = await Campaign.deployed();

        await instance.withdrawal();
    });

})