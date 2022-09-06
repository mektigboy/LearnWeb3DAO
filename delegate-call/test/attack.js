const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers, waffle } = require("hardhat");

describe("Attack", function () {
  it("Should change the owner of the Good contract.", async function () {
    const helperContract = await ethers.getContractFactory("Helper");
    const _helperContract = await helperContract.deploy();
    await _helperContract.deployed();
    console.log("Helper contract address:", _helperContract.address);

    const goodContract = await ethers.getContractFactory("Good");
    const _goodContract = await goodContract.deploy(_helperContract.address);
    await _goodContract.deployed();
    console.log("Good contract address:", _goodContract.address);

    const attackContract = await ethers.getContractFactory("Attack");
    const _attackContract = await attackContract.deploy(_goodContract.address);
    await _attackContract.deployed();
    console.log("Attack contract address:", _attackContract.address);

    let tx = await _attackContract.attack();
    await tx.wait();

    expect(await _goodContract.owner()).to.equal(_attackContract.address);
  });
});
