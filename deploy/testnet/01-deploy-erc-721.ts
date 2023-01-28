import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const log = console.log;

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  try {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;

    log(`loading fixtures for NFT`);
    const { deployer } = await getNamedAccounts();

    const nft = await deploy("WhrrlNFTContract", {
      from: deployer,
      args: [],
      log: true,
      autoMine: true,
      skipIfAlreadyDeployed: true,
    });

    log(`NFT deployed with ${nft.transactionHash} at ${nft.address}`);
  } catch (err) {
    if (err instanceof Error) {
      log(err.message);
    }
  }
};

export default func;
