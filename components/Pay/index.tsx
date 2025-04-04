"use client";
import {
  MiniKit,
  tokenToDecimals,
  Tokens,
  PayCommandInput,
} from "@worldcoin/minikit-js";

export const sendPayment = async (_wallet: string, _cause: string, _amount: number) => {
  try {
    const res = await fetch(`/api/initiate-payment`, {
      method: "POST",
      body: JSON.stringify({ wallet: _wallet, cause: _cause, amount: Number(_amount) })
    });



    const { id } = await res.json();


    const payload: PayCommandInput = {
      reference: id,
      to: _wallet, // Test address
      tokens: [
        {
          symbol: Tokens.WLD,
          token_amount: tokenToDecimals(_amount, Tokens.WLD).toString(),
        },
        {
          symbol: Tokens.USDCE,
          token_amount: tokenToDecimals(_amount, Tokens.USDCE).toString(),
        },
      ],
      description: "¡Un mundo mejor empieza por vos!",
    };
    if (MiniKit.isInstalled()) {
      return await MiniKit.commandsAsync.pay(payload);
    }
    return null;
  } catch (error: unknown) {
    console.log("Error sending payment", error);
    return null;
  }
};

export const handlePay = async (_wallet: string, _cause: string, _amount: number) => {
  if (!MiniKit.isInstalled()) {
    console.error("MiniKit is not installed");
    return;
  }
  const sendPaymentResponse = await sendPayment(_wallet, _cause, _amount);
  const response = sendPaymentResponse?.finalPayload;

  if (!response) {
    ;
    return false;
  }

  if (response.status == "success") {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_WEB_BASE_URL}/confirm-payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payload: response }),
    });
    const payment = await res.json();
    if (payment.success) {
      return true;
    } else {
      return false;
    }
  }
  return false;
};

export const PayBlock = () => {
  return (
    <>
      <button className="bg-blue-500 p-4" onClick={() => handlePay("0x412b4ed9b20e99a5c8b89c9f86ce40b65b34a529", "5edca441-4318-495a-89dc-6635179214bf", 0.1)}>
        Pay HEXPOD
      </button>
      <button className="bg-blue-500 p-4" onClick={() => handlePay("0x427cc9d8e489287c221d4c75edd446723ee0e1a0", "a1174977-2a5c-45a2-9680-06756bd2fb44", 0.1)}>
        Pay EMANUEL
      </button>
    </>
  );
};
