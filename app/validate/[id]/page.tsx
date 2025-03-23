"use client";

import { useCallback, useEffect, useState } from "react";
import PillButton from "@/components/Buttons/PillButton";
import Navbar from "@/components/Navigation/Navbar";
import Image from "next/image";

import { redirect, useParams } from "next/navigation";
import Subtitle from "@/components/Text/Subtitle";
import {
  ISuccessResult,
  IVerifyResponse,
  MiniAppVerifyActionErrorPayload,
  MiniKit,
  VerificationLevel,
  VerifyCommandInput,
} from "@worldcoin/minikit-js";
import { ICause } from "@/classes/Cause";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { GetWalletSession } from "@/utils/GetWalletSession";

export default function Validate() {
  const router = useRouter();

  const { id } = useParams<{ id: string }>();

  const [cause, setCause] = useState<ICause | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [comment, setComment] = useState<string>("");
  const [photos, setPhotos] = useState<File[]>([]);

  const [wallet, setWallet] = useState<string>(
    MiniKit.walletAddress || "0x427cc9d8e489287c221d4c75edd446723ee0e1a0"
  );

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    setPhotos(selectedFiles);
  };

  const removePhoto = (index: number) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("description", comment);

    // Append each photo file to FormData
    photos.forEach((photo) => {
      formData.append("images", photo);
    });

    formData.append("cause", id);
    formData.append("wallet", wallet);

    try {
      const response = await fetch("/api/validations", {
        method: "POST",
        body: formData,
      });

      if (response.status === 200) {
        const data = await response.json();

        handleVerify({
          validation: data.uuid,
          wallet: wallet,
        });
        router.push("/success-validation");
      } else {
        return; // handle not success
      }
    } catch (error) {
      console.error(error);
      return; // handle catch error
    } finally {
      setLoading(false);
    }
  };

  

  const handleVerify = async ({ validation, wallet }: {validation: string, wallet: string}) => {
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
  };

  const fetchWallet = async (): Promise<void> => {
    const address = await GetWalletSession();
    if (address) {
      setWallet(address);
    }
  };

  useEffect(() => {
    if (!id) {
      router.push("/");
      return;
    }
    setLoading(true);

    fetchWallet();

    async function fetchCause() {
      const request = await fetch(`/api/causes/cause/${id}`);
      if (request.status === 200) {
        const data = await request.json();
        console.log(data);
        setCause(data.body);
      }
    }

    fetchCause();

    setLoading(false);
  }, [id]);

  return (
    <main className="bg-white flex min-h-screen flex-col gap-y-5 pb-4 text-black text-[15px]">
      <Navbar title="Validar"></Navbar>

      <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5">
        <div className="w-full flex flex-col items-center justify-center gap-3 text-center">
          <Subtitle content={"📝 Escribe tu validación"}></Subtitle>
          <textarea
            className="w-full p-5 border border-gray-300 text-gray-500 rounded-2xl text-left bg-[rgba(0,0,0,0.05)]"
            placeholder="Comentario..."
            value={comment}
            onChange={handleCommentChange}
          ></textarea>
        </div>
      </section>

      <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5">
        <div className="w-full flex flex-col items-center justify-center gap-3 text-center">
          <Subtitle
            content={"📸 Aporta evidencia en fotos de las pérdidas"}
          ></Subtitle>
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full p-5 border border-gray-300 text-gray-700 rounded-2xl cursor-pointer bg-[rgba(0,0,0,0.05)]"
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <Image
                src="/uploadImage.png"
                alt="Upload image"
                className="opacity-60"
                width={42}
                height={42}
              ></Image>
              <p className="text-gray-500 text-[15px] text-center">
                Adjuntar fotos para legitimizar el pedido de Julián e inspirar
                más confianza a otros donantes.
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
          </label>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {photos.map((photo, index) => (
              <div key={index} className="relative">
                <Image
                  src={URL.createObjectURL(photo)}
                  alt={`Pérdida ${index + 1}`}
                  width={80}
                  height={80}
                  className="rounded-md border w-20 h-20 p-2 object-contain"
                />
                <button
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 rounded-full"
                  onClick={() => removePhoto(index)}
                >
                  <X size={16}></X>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5">
        <div className="w-full flex flex-col items-center justify-center gap-3 text-center">
          <PillButton
            label={
              loading || !cause ? "Cargando..." : `Validar pedido de ${cause?.owner}`
            }
            submitting={loading || !cause}
            action={handleSubmit}
          ></PillButton>
        </div>
      </section>
    </main>
  );
}