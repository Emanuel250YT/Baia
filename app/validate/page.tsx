"use client";

import { useState } from "react";
import PillButton from "@/components/Buttons/PillButton";
import Navbar from "@/components/Navigation/Navbar";
import Image from "next/image";

export default function Validate() {
  const [comment, setComment] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("submit");

    const formData = new FormData();
    formData.append("comment", comment);
    if (file) {
      formData.append("photo", file);
    }

    try {
      const response = await fetch("url", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        return; // handle success
      } else {
        return; // handle not success
      }
    } catch (error) {
      return; // handle catch error
    }
  };

  return (
    <main className="bg-white flex min-h-screen flex-col gap-y-5 pb-4 text-black text-[15px]">
      <Navbar title="Validar" returnTo={"/donate"}></Navbar>

      <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5">
        <div className="w-full flex flex-col items-center justify-center gap-3 text-center">
          <h2>Escribe tu validación</h2>
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
          <h2>Aporta evidencia en fotos de las pérdidas</h2>
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
              onChange={handleFileChange}
            />
          </label>
        </div>
      </section>

      <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5">
        <div className="w-full flex flex-col items-center justify-center gap-3 text-center">
          <PillButton
            label="Validar pedido de *"
            action={handleSubmit}
          ></PillButton>
        </div>
      </section>
    </main>
  );
}
