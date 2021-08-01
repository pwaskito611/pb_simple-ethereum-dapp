var Campaign = artifacts.require("./Campaign.sol");

require("dotenv").config({path: "../.env"});

module.exports = function(deployer) {
  deployer.deploy(Campaign);
};
