import { MiniKit } from "@worldcoin/minikit-js";

export const GetWalletSession = async (): Promise<string | null> => {
  if (!MiniKit.isInstalled()) {
    console.warn("MiniKit no está instalado.");
    return null;
  }

  if (!MiniKit.walletAddress) {
    try {
      const res = await fetch(`/api/nonce`);
      const { nonce } = await res.json();

      const { commandPayload: generateMessageResult, finalPayload } =
        await MiniKit.commandsAsync.walletAuth({
          nonce,
          requestId: "0",
          expirationTime: new Date(
            new Date().getTime() + 7 * 24 * 60 * 60 * 1000
          ),
          notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
          statement:
            "This is my statement and here is a link https://worldcoin.com/apps",
        });

      if (finalPayload.status === "error") {
        return null;
      }

      const response = await fetch("/api/complete-siwe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payload: finalPayload, nonce }),
      });

      if (!response.ok) {
        return null;
      }

      return finalPayload.address || null;
    } catch (error) {
      return null;
    }
  } else return MiniKit.walletAddress;
};
