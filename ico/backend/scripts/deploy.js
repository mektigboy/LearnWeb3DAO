const { CRYPTO_DEVS_NFT_CONTRACT_ADDRESS } = require("../constants");
const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {
  const cryptoDevsNFTContract = CRYPTO_DEVS_NFT_CONTRACT_ADDRESS;
  const cryptoDevsTokenContract = await ethers.getContractFactory("Token");
  const deployedCryptoDevsTokenContract = await cryptoDevsTokenContract.deploy(
    cryptoDevsNFTContract
  );

  console.log(
    "Crypto Devs Token Contract Address:",
    deployedCryptoDevsTokenContract.address
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
