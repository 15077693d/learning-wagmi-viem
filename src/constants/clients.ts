import { createPublicClient, http, createWalletClient, custom } from "viem";
import { Chain } from "viem/chains";

export const getPublicClient = (chain: Chain) =>
  createPublicClient({
    chain,
    transport: http(),
  });

export const getWalletClient = async (chain: Chain) => {
  const [account] = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  return createWalletClient({
    account,
    chain,
    transport: custom(window.ethereum),
  });
};
