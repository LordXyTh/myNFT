
const MyNFT = artifacts.require('MyNFT');

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(MyNFT);
};