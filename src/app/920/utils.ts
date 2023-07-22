import { http, createPublicClient, createWalletClient, custom } from "viem";
import { avalancheFuji, mainnet } from "viem/chains";
import { NFT_CONFIG, WAGMI_CONFIG } from "./constants";
export const prepareTXWithError = async () => {
  const [account] = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const walletClient = createWalletClient({
    chain: avalancheFuji,
    account,
    transport: custom(window.ethereum),
  });
  const publicClient = createPublicClient({
    chain: avalancheFuji,
    transport: http(),
  });

  const { request } = await publicClient.simulateContract({
    ...NFT_CONFIG,
    account,
    args: ["0x<arg1>", 2n],
    functionName: "safeMint",
  });
  console.log(request);
  // fails with: method is currently not implemented: eth_sendTransaction
  // works when we use custom(window.ethereum) as the transport
  const txHash = await walletClient.writeContract(request);
};

export const prepareTXWithNotError = async () => {
  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(),
  });

  const { request } = await publicClient.simulateContract({
    ...WAGMI_CONFIG,
    functionName: "mint",
    args: [69420n],
    account: "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
  });
  console.log(request);
  // fails with: method is currently not implemented: eth_sendTransaction
  // works when we use custom(window.ethereum) as the transport
  // const txHash = await walletClient.writeContract(request);
};
