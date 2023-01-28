import { HardhatUserConfig, task } from "hardhat/config";
import { config } from "dotenv";

import "@typechain/hardhat";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@openzeppelin/hardhat-upgrades";

// using community plugins
import "solidity-coverage";
import "hardhat-gas-reporter";
import "hardhat-contract-sizer";
import "hardhat-deploy";

config();

const accounts = [process.env.PRIVATE_KEY] as string[];

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const hardhatConfig: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      accounts: {
        count: 150,
      },
    },
    localhost: {
      url: "http://localhost:8545",
      saveDeployments: true,
      loggingEnabled: true,
      live: true,
      tags: ["testnet", "staging"],
    },
    polygon: {
      url: process.env.POLYGON_RPC_URL,
      accounts,
      saveDeployments: true,
      loggingEnabled: true,
      live: true,
      tags: ["polygon", "mainnet"],
      verify: {
        etherscan: {
          apiKey: "FSYHBPSIYA743ZKG6ECWM9753AN5KG8P8U",
        },
      },
    },
    ethereum: {
      url: process.env.ETH_RPC_URL,
      accounts,
      saveDeployments: true,
      loggingEnabled: true,
      live: true,
      tags: ["eth-testnet", "staging"],
      verify: {
        etherscan: {
          apiKey: process.env.ETH_API_KEY,
        },
      },
    },
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
      1: 0,
      4: 0,
      56: 0,
      97: 0,
      137: 0,
      2221: 0,
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 20000,
    color: true,
  },
  etherscan: {
    apiKey: String(process.env.POLYGON_API_KEY),
  },
  gasReporter: {
    currency: "USD",
    enabled: Boolean(process.env.REPORT_GAS),
    coinmarketcap: process.env.CMC_API_KEY,
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
};

export default hardhatConfig;
