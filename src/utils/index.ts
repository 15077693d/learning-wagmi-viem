import { avalancheFuji } from "viem/chains";
import { getPublicClient, getWalletClient } from "../constants/clients";
import { FUJI_NFT_CONFIG } from "../constants/contracts";
import { decodeEventLog } from "viem";

/**
 * Writes a contract and gets event logs.
 * @returns {Promise<Array>} An array containing the logs and decoded event logs.
 * @answer https://github.com/wagmi-dev/viem/discussions/916
 */
export const writeContractAndGetEventLogs = async () => {
  const walletClient = await getWalletClient(avalancheFuji);
  const account = walletClient.account;
  if (account) {
    const hash = await walletClient.writeContract({
      account,
      ...FUJI_NFT_CONFIG,
      functionName: "safeMint",
      args: ["0x3261C3819dAc9e2e4D39721A0552a0547Bd92906", 5n],
    });
    const { logs } = await getPublicClient(
      avalancheFuji
    ).waitForTransactionReceipt({ hash });
    return [
      logs,
      logs.map((log) => decodeEventLog({ ...log, abi: FUJI_NFT_CONFIG.abi })),
    ];
  }
};
