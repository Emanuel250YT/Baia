/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  MiniKit,
  VerificationLevel,
  ISuccessResult,
  MiniAppVerifyActionErrorPayload,
  IVerifyResponse,
} from "@worldcoin/minikit-js";
import { useCallback, useState } from "react";

export type VerifyCommandInput = {
  action: string;
  signal?: string;
  verification_level?: VerificationLevel; // Default: Orb
};

export const VerifyBlock = ({
  validation,
  wallet,
}: {
  validation: string;
  wallet: string;
}) => {
  const verifyPayload: VerifyCommandInput = {
    action: "verify-action", // This is your action ID from the Developer Portal
    signal: JSON.stringify({ validation: validation, wallet: wallet }),
    verification_level:
      process.env.ENV == "production"
        ? VerificationLevel.Orb
        : VerificationLevel.Device, // Orb | Device
  };

  const [handleVerifyResponse, setHandleVerifyResponse] = useState<
    MiniAppVerifyActionErrorPayload | IVerifyResponse | null
  >(null);

  const handleVerify = useCallback(async () => {
    if (!MiniKit.isInstalled()) {
      console.warn("Tried to invoke 'verify', but MiniKit is not installed.");
      return null;
    }

    const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload);

    // no need to verify if command errored
    if (finalPayload.status === "error") {
      console.log("Command error");
      console.log(finalPayload);

      setHandleVerifyResponse(finalPayload);
      return finalPayload;
    }

    // Verify the proof in the backend
    const verifyResponse = await fetch(`/api/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payload: finalPayload as ISuccessResult, // Parses only the fields we need to verify
        action: verifyPayload.action,
        signal: verifyPayload.signal, // Optional
      }),
    });

    // TODO: Handle Success!
    const verifyResponseJson = await verifyResponse.json();

    if (verifyResponseJson.status === 200) {
      console.log("Verification success!");
      console.log(finalPayload);
    }

    setHandleVerifyResponse(verifyResponseJson);
    return verifyResponseJson;
  }, []);

  return (
    <button
      onClick={handleVerify}
      className={
        "py-3 px-4 rounded-2xl text-center w-full flex-1 text-[19px] font-semibold flex items-center justify-center gap-2 transition duration-100 cursor-pointer disabled:cursor-not-allowed disabled:animate-pulse"
      }
    >
      Verificar
    </button>
  );
};

export const VerifyCauseDevice = ({ cause }: { cause: string }) => {
  const verifyPayload: VerifyCommandInput = {
    action: "verify-orb-action", // This is your action ID from the Developer Portal
    signal: JSON.stringify({ cause: cause, level: "0" }),
    verification_level: VerificationLevel.Device, // Orb | Device
  };

  const [handleVerifyResponse, setHandleVerifyResponse] = useState<
    MiniAppVerifyActionErrorPayload | IVerifyResponse | null
  >(null);

  const handleVerify = useCallback(async () => {
    if (!MiniKit.isInstalled()) {
      console.warn("Tried to invoke 'verify', but MiniKit is not installed.");
      return null;
    }

    const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload);

    // no need to verify if command errored
    if (finalPayload.status === "error") {
      console.log("Command error");
      console.log(finalPayload);

      setHandleVerifyResponse(finalPayload);
      return finalPayload;
    }

    // Verify the proof in the backend
    const verifyResponse = await fetch(`/api/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payload: finalPayload as ISuccessResult, // Parses only the fields we need to verify
        action: verifyPayload.action,
        signal: verifyPayload.signal, // Optional
      }),
    });

    // TODO: Handle Success!
    const verifyResponseJson = await verifyResponse.json();

    if (verifyResponseJson.status === 200) {
      console.log("Verification success!");
      console.log(finalPayload);
    }

    setHandleVerifyResponse(verifyResponseJson);
    return verifyResponseJson;
  }, []);

  return (
    <button
      onClick={handleVerify}
      className={
        "py-3 px-4 rounded-2xl text-center w-full flex-1 text-[19px] font-semibold flex items-center justify-center gap-2 transition duration-100 cursor-pointer disabled:cursor-not-allowed disabled:animate-pulse"
      }
    >
      Verificar
    </button>
  );
};

export const VerifyCauseOrb = ({ cause }: { cause: string }) => {
  const verifyPayload: VerifyCommandInput = {
    action: "verify-orb-action", // This is your action ID from the Developer Portal
    signal: JSON.stringify({ cause: cause, level: "1" }),
    verification_level: VerificationLevel.Orb, // Orb | Device
  };

  const [handleVerifyResponse, setHandleVerifyResponse] = useState<
    MiniAppVerifyActionErrorPayload | IVerifyResponse | null
  >(null);

  const handleVerify = useCallback(async () => {
    if (!MiniKit.isInstalled()) {
      console.warn("Tried to invoke 'verify', but MiniKit is not installed.");
      return null;
    }

    const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload);

    // no need to verify if command errored
    if (finalPayload.status === "error") {
      console.log("Command error");
      console.log(finalPayload);

      setHandleVerifyResponse(finalPayload);
      return finalPayload;
    }

    // Verify the proof in the backend
    const verifyResponse = await fetch(`/api/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payload: finalPayload as ISuccessResult, // Parses only the fields we need to verify
        action: verifyPayload.action,
        signal: verifyPayload.signal, // Optional
      }),
    });

    // TODO: Handle Success!
    const verifyResponseJson = await verifyResponse.json();

    if (verifyResponseJson.status === 200) {
      console.log("Verification success!");
      console.log(finalPayload);
    }

    setHandleVerifyResponse(verifyResponseJson);
    return verifyResponseJson;
  }, []);

  return (
    <button
      onClick={handleVerify}
      className={
        "py-3 px-4 rounded-2xl text-center w-full flex-1 text-[19px] font-semibold flex items-center justify-center gap-2 transition duration-100 cursor-pointer disabled:cursor-not-allowed disabled:animate-pulse"
      }
    >
      Verificar
    </button>
  );
};
