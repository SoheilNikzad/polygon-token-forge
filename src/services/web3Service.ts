
// Web3 utilities for interacting with Ethereum blockchain
import { ethers } from "ethers";
import { toast } from "sonner";

// Standard ERC20 Token ABI (Application Binary Interface)
const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 value) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 value) returns (bool)",
  "function transferFrom(address from, address to, uint256 value) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
];

// Factory ABI for token creation
const TOKEN_FACTORY_ABI = [
  "function createToken(string name, string symbol, uint256 totalSupply, uint8 decimals) payable returns (address)",
  "event TokenCreated(address indexed tokenAddress, string name, string symbol, uint256 totalSupply, address indexed creator)"
];

// Simplified Launchpad ABI
const LAUNCHPAD_ABI = [
  "function createSale(address token, uint256 tokenAmount, uint256 rate, uint256 startTime, uint256 endTime) payable returns (address)",
  "function buySaleTokens(address saleAddress) payable",
  "function finalizeSale(address saleAddress)",
  "event SaleCreated(address indexed saleAddress, address indexed token, address indexed creator)",
];

// Polygon network constants
export const POLYGON_CHAIN_ID = 137;
export const POLYGON_TESTNET_CHAIN_ID = 80001; // Mumbai testnet

// DEX constants for QuickSwap (a popular Polygon DEX)
export const QUICKSWAP_ROUTER_ADDRESS = "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff";
export const QUICKSWAP_FACTORY_ADDRESS = "0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32";

export interface Web3State {
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
  account: string | null;
  chainId: number | null;
  isConnected: boolean;
}

// Default state
const defaultState: Web3State = {
  provider: null,
  signer: null,
  account: null,
  chainId: null,
  isConnected: false,
};

let web3State = { ...defaultState };

// Check for provider and initialize if available
export const initWeb3 = async (): Promise<Web3State> => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const { chainId } = await provider.getNetwork();
      
      // Get accounts
      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        const signer = provider.getSigner();
        const account = await signer.getAddress();
        
        web3State = {
          provider,
          signer,
          account,
          chainId,
          isConnected: true,
        };
        return web3State;
      }
    } catch (error) {
      console.error("Error initializing web3", error);
    }
  }
  return defaultState;
};

// Connect to wallet
export const connectWallet = async (): Promise<Web3State> => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    try {
      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });
      
      // Initialize web3 with new connection
      return await initWeb3();
    } catch (error) {
      console.error("User rejected connection", error);
      toast.error("Wallet connection was rejected");
      return defaultState;
    }
  } else {
    console.error("No ethereum browser extension detected");
    toast.error("Please install MetaMask to use this dApp");
    return defaultState;
  }
};

// Switch to Polygon network
export const switchToPolygon = async (testnet: boolean = false): Promise<boolean> => {
  const chainId = testnet ? POLYGON_TESTNET_CHAIN_ID : POLYGON_CHAIN_ID;
  const chainIdHex = `0x${chainId.toString(16)}`;
  
  if (!window.ethereum) return false;
  
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainIdHex }],
    });
    return true;
  } catch (error: any) {
    // Error code 4902 means the chain has not been added to MetaMask
    if (error.code === 4902) {
      try {
        const networkParams = testnet 
          ? {
              chainId: chainIdHex,
              chainName: "Polygon Mumbai Testnet",
              nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18,
              },
              rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
              blockExplorerUrls: ["https://mumbai.polygonscan.com"],
            }
          : {
              chainId: chainIdHex,
              chainName: "Polygon Mainnet",
              nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18,
              },
              rpcUrls: ["https://polygon-rpc.com"],
              blockExplorerUrls: ["https://polygonscan.com"],
            };
            
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [networkParams],
        });
        return true;
      } catch (addError) {
        console.error("Error adding Polygon network", addError);
        toast.error("Could not add Polygon network to your wallet");
        return false;
      }
    }
    console.error("Error switching to Polygon network", error);
    toast.error("Could not switch to Polygon network");
    return false;
  }
};

// Create an ERC20 token
export const createToken = async (
  name: string,
  symbol: string,
  totalSupply: string,
  decimals: number = 18
): Promise<string | null> => {
  if (!web3State.signer) {
    toast.error("Please connect your wallet first");
    return null;
  }
  
  try {
    // This is a simplified example - in a real app, deploy the factory first
    // Here we simulate token deployment with a direct contract deployment
    const TokenFactory = new ethers.ContractFactory(
      ["constructor(string name, string symbol, uint256 initialSupply, uint8 decimals)"],
      "0x60806040523480156100115760006000fd5b506040516109c23803806109c2833981810160405260808110156100355760006000fd5b81019080805160405193929190846401000000008211156100565760006000fd5b83820191506020820190516401000000008111156100735760006000fd5b82016040519190820160405261010081101561008f5760006000fd5b81019080805160405193929190846401000000008211156100b05760006000fd5b83820191506020820190516401000000008111156100cd5760006000fd5b820160405191908201604052610100811015610063e95760006000fd5b81019080805190602001909291908051906020019092919080519060200190929190805190602001909291905050508383838381600390805190602001906101275761022c565b5080600490805190602001906102359061023f565b505050505050506102a2565b82805461014590610126565b65ffffffffffff811161015c5760006000fd5b5090600052602060002090601f01602090048101928261017e576000855561018a565b82601f1061018957805160ff191683800117855561018a565b5b82800154905550506001016101608565b6001816001600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff1660007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610249919061026a565b60405180910390a350505050506100b8565b5b8082111561025a5760008181506000905550600101610248565b5090565b61027481906102885650565b82525050565b6000602082019050610263600083018461026b565b92915050565b610103806102b16000396000f3fe60806040526004361061003f5760003560e01c80631249c58b1461004557806318160ddd146100585780632e64cec11461007c578063a9059cbb14610092576100a9565b60006000fd5b6100566100a9565b005b348015610065576000805ffffd5b5061007a600435610259565b005b348015610089576000805ffffd5b5061009061010e565b005b61009f61010e565b60405161010e919061026a565b60405180910390f35b6000341161010b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260138152602001807f496e76616c6964207472616e73616374696f6e0000000000000000000000000081526020015060405180910390fd5b5650565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600060005054905090565b5b600082111561022a5760008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008060005091905550505b5b5090565b5b808211156102555760008181506000905550600101610243565b5090565b606081901c91905056fea2646970667358221220a7aedda429c7fbf41bfca42b49d955735b5829cf524c3eed6b3d1f0f887b0be864736f6c63430008110033",
      web3State.signer
    );
    
    // Convert total supply to wei format (with appropriate decimals)
    const totalSupplyInWei = ethers.utils.parseUnits(totalSupply, decimals);
    
    const tokenContract = await TokenFactory.deploy(
      name,
      symbol,
      totalSupplyInWei,
      decimals
    );
    
    await tokenContract.deployed();
    
    toast.success(`Token ${symbol} created successfully!`);
    return tokenContract.address;
  } catch (error) {
    console.error("Error creating token:", error);
    toast.error("Failed to create token");
    return null;
  }
};

// Function to get token details
export const getTokenDetails = async (tokenAddress: string) => {
  if (!web3State.provider) return null;
  
  try {
    const tokenContract = new ethers.Contract(
      tokenAddress,
      ERC20_ABI,
      web3State.provider
    );
    
    const [name, symbol, decimals, totalSupply] = await Promise.all([
      tokenContract.name(),
      tokenContract.symbol(),
      tokenContract.decimals(),
      tokenContract.totalSupply(),
    ]);
    
    return {
      address: tokenAddress,
      name,
      symbol,
      decimals,
      totalSupply: ethers.utils.formatUnits(totalSupply, decimals),
    };
  } catch (error) {
    console.error("Error fetching token details:", error);
    toast.error("Failed to load token details");
    return null;
  }
};

// Export current web3 state
export const getWeb3State = (): Web3State => {
  return web3State;
};

// Add liquidity to DEX (simplified for this example)
export const addLiquidityToDex = async (
  tokenAddress: string,
  amount: string,
  tokenPerMatic: string
) => {
  // This is a simplified example - in a real app, interact with the DEX router
  toast.info("Adding liquidity feature requires integration with QuickSwap router");
  return null;
};
