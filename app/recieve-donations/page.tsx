"use client";

import { useState } from "react";
import PillButton from "@/components/Buttons/PillButton";
import Navbar from "@/components/Navigation/Navbar";
import Image from "next/image";
import { X } from "lucide-react";
import { PostBaseData } from "@/requests/baseMethod";
import { CreateCause } from "@/requests/causes/methods";

export default function RecieveDonations() {
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [cause, setCause] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

  const [lossPhotos, setLossPhotos] = useState<File[]>([]);

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setProfilePhoto(file);
  };

  const handleLossPhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setLossPhotos((prevPhotos) => [...prevPhotos, ...filesArray]);
    }
  };

  const removeLossPhoto = (index: number) => {
    setLossPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("submit");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    formData.append("cause", cause);
    formData.append("description", description);

    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }

    lossPhotos.forEach((photo, index) => {
      formData.append(`lossPhotos[${index}]`, photo);
    });


    try {
      const response = await CreateCause(formData)

      console.log(response)
    } catch (error) {
      return; // handle catch error
    }
  };

  return (
    <main className="bg-white flex min-h-screen flex-col gap-y-5 pb-4 text-black text-[15px]">
      <Navbar title="Validar" returnTo={"/donate"}></Navbar>

      <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5">
        <div className="w-full flex flex-col items-center justify-center gap-3 text-center">
          <h2>Completa con tus datos personales</h2>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 text-gray-500 rounded-2xl text-left bg-[rgba(0,0,0,0.05)]"
            placeholder="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 text-gray-500 rounded-2xl text-left bg-[rgba(0,0,0,0.05)]"
            placeholder="¿Dónde vivís?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          ></input>
          <select
            id="countries"
            className="w-full px-3 py-2 border border-gray-300 text-gray-400 rounded-2xl text-left bg-[rgba(0,0,0,0.05)]"
            value={cause}
            onChange={(e) => setCause(e.target.value)}
          >
            <option selected>¿Causa de tu pérdida?</option>
          </select>
        </div>
      </section>

      <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5">
        <div className="w-full flex flex-col items-center justify-center gap-3 text-center">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full p-5 border border-gray-300 text-gray-700 rounded-2xl cursor-pointer bg-[rgba(0,0,0,0.05)]"
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <Image
                src={
                  profilePhoto
                    ? URL.createObjectURL(profilePhoto)
                    : "/uploadImage.png"
                }
                alt="Upload image"
                className="opacity-60"
                width={42}
                height={42}
              ></Image>
              <p className="text-gray-500 text-[15px] text-center">
                Foto de perfil
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePhotoChange}
            />
          </label>
        </div>
      </section>

      <section className="max-w-[calc(100vw-46px)] mx-auto flex flex-wrap justify-start gap-1.5">
        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="text-center">
            Contanos qué pasó y qué ayuda necesitas 🙏
          </h2>
          <div className="w-full text-gray-700 rounded-2xl">
            <p className="text-[14px]">
              Para que la comunidad pueda ayudarte mejor, describe brevemente la
              causa de tu pérdida (inundación, incendio, robo, etc.) y los
              objetos materiales que necesitas reponer.
              <br />
              <br />
              📌 Ejemplos: Electrodomésticos: Heladera, cocina, lavarropas.
              Muebles y descanso: Camas, colchones, sillas. Ropa y calzado:
              Abrigo, calzado escolar o de trabajo. Elementos de trabajo:
              Herramientas, bicicleta, computadora.
              <br />
              <br />
              👨‍👩‍👧‍👦 ¿Con cuántas personas vives? ¿Hay niños en edad escolar,
              adultos mayores o alguien con necesidades especiales?
              <br />
              <br />
              Cuanta más info aportes, más fácil será ayudarte. ¡No estás solo!
              💙
            </p>
          </div>
          <textarea
            className="w-full min-h-64 px-5 py-4 border border-gray-300 text-gray-500 rounded-2xl text-left bg-[rgba(0,0,0,0.05)]"
            placeholder="Descripción del caso..."
          ></textarea>
        </div>
      </section>

      <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5">
        <div className="w-full flex flex-col items-center justify-center gap-3 text-center">
          <h2>Aporta evidencia en fotos de las pérdidas</h2>
          <label
            htmlFor="loss-photos-upload"
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
                Adjuntar fotos para legitimizar tu pedido e inspirar más
                confianza a los donantes.
              </p>
            </div>
            <input
              id="loss-photos-upload"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                console.log(e.target.files);
                handleLossPhotosChange(e);
              }}
            />
          </label>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {lossPhotos.map((photo, index) => (
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
                  onClick={() => removeLossPhoto(index)}
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
            label="Enviar solicitud de fondos"
            action={handleSubmit}
          ></PillButton>
        </div>
      </section>
    </main>
  );
}
