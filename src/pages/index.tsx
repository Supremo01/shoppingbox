"use client";

import { useState } from "react";
import { Fredoka } from 'next/font/google';
import Image from "next/image";
import { motion } from "framer-motion";

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function ShoppingboxSorteo() {
  const [membresia, setMembresia] = useState("");
const [nombre, setNombre] = useState("");
const [mensaje, setMensaje] = useState("");

const handleParticipar = async () => {
  if (!membresia || !nombre) {
    setMensaje("Por favor completa ambos campos.");
    return;
  }

  try {
    const res = await fetch("/api/validar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ membresia, nombre }),
    });

    const data = await res.json();

    if (res.ok) {
      if (data.error) {
        setMensaje(data.error);
      } else if (data.nombre?.trim().toUpperCase() !== nombre.trim().toUpperCase()) {
        setMensaje("El nombre no coincide con la membresía.");
      } else {
        const fechaFormateada = new Date(data.fecha).toLocaleDateString("es-MX", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        setMensaje(`¡Gracias ${nombre.trim().toUpperCase()}! Última compra el ${fechaFormateada}`);
      }
    } else {
      setMensaje(data.error || "Error en la validación.");
    }
  } catch (err) {
    console.error(err);
    setMensaje("Error al conectar con el servidor.");
  }
};


  return (
    <div className={`${fredoka.className} flex flex-col items-center justify-center min-h-screen bg-white`}>
      {/* FONDO AZUL - LOGO + PREMIOS */}
      <div className="w-full bg-[#228BFF] text-white pb-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-6"
        >
          <Image
            src="/img/logo.png"
            alt="ShoppingBox Logo"
            width={900}
            height={80}
            className="mx-auto"
          />
        </motion.div>

        {/* Bienvenida */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white text-4xl md:text-6xl font-bold text-center leading-tight drop-shadow-md"
        >
          ¡Gracias por ser parte de Shopping Box!
        </motion.h1>

        <p className="text-center text-white text-base md:text-lg mt-4">
          Nos emociona contarte que ya formas parte del sorteo de nuestro Cliente del Mes
        </p>

        {/* Título premios */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 text-center"
        >
        <span className="inline-block bg-yellow-400 text-white font-extrabold py-2 px-10 rounded-full text-5xl">
          Premios del mes de Agosto
        </span>

        </motion.div>

        {/* PREMIOS */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-6">
          {[
            {
              lugar: "Segundo",
              color: "border-blue-500",
              imagen: "/img/premios/Segundo.png",
              medalla: "🥈 2do Lugar",
              delay: 1,
            },
            {
              lugar: "Primero",
              color: "border-yellow-500",
              imagen: "/img/premios/Primero.png",
              medalla: "🥇 1er Lugar",
              delay: 0.6,
            },
            {
              lugar: "Tercero",
              color: "border-red-500",
              imagen: "/img/premios/Tercero.png",
              medalla: "🥉 3er Lugar",
              delay: 0.8,
            },
          ].map((premio) => (
            <motion.div
              key={premio.lugar}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1, delay: premio.delay }}
              whileHover={{ scale: 1.05 }}
              className={`bg-white p-4 rounded-xl border-[3px] ${premio.color} shadow-xl`}
            >
              <Image
                src={premio.imagen}
                alt={`${premio.lugar} lugar`}
                width={150}
                height={150}
              />
              <p className="text-center mt-2 font-bold text-blue-600">
                {premio.medalla}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FONDO BLANCO - PARTICIPACIÓN */}
      <div className="w-full bg-white py-10 px-4">
        <motion.h2
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="text-blue-600 text-5xl font-extrabold text-center mb-4"
>
  ¿Cómo participar?
</motion.h2>


        <div className="flex flex-col md:flex-row justify-center items-center gap-10 mt-30">
          <div className="text-center">
            <p className="font-bold text-blue-600 text-2xl">1. RECIBE TUS PAQUETES</p>
            <Image
              src="/img/gifs/gif1.gif"
              alt="Recibe"
              width={300}
              height={60}
              className="mx-auto mt-2"
            />
          </div>
          <div className="text-center">
            <p className="font-bold text-blue-600 text-2xl">2. GRABA EL UNBOXING</p>
            <Image
              src="/img/gifs/gif2.gif"
              alt="Unboxing"
              width={300}
              height={60}
              className="mx-auto mt-2"
            />
          </div>
          <div className="text-center">
            <p className="font-bold text-blue-600 text-2xl">3. ETIQUETA A @GOSHOPPINGBOX</p>
            <Image
              src="/img/gifs/gif3.gif"
              alt="Instagram"
              width={300}
              height={60}
              className="mx-auto mt-2"
            />
          </div>
        </div>

        <p className="text-center font-bold text-blue-600 mt-15 text-5xl">
          El ganador se anunciará en vivo por Instagram el:
        </p>

        <div className="flex justify-center mt-12">
  <div className="relative inline-block">
    {/* Capa de sombra estilo tricolor */}
    <div className="absolute top-1 left-1 w-full h-full rounded-[12px] bg-gradient-to-br from-green-400 via-yellow-400 to-orange-500 z-0" />
    
    {/* Contenedor principal */}
    <div className="relative z-10 bg-[#00A2FF] text-white text-6xl font-extrabold py-4 px-8 rounded-[12px] text-center leading-tight shadow-xl">
      28 Agosto<br />9PM
    </div>
  </div>
</div>


        <p className="text-center text-blue-600 mt-20 font-medium text-2xl">
          ¡Entre más uses Shopping Box, más oportunidades tienes de ganar!
        </p>

        {/* FORMULARIO */}
        <div className="mt-10 max-w-md mx-auto bg-white rounded-lg p-4">
          <label className="block text-blue-600 text-3xl font-semibold mb-1">
            Número de membresía:
          </label>
        <input
  type="text"
  value={membresia}
  onChange={(e) => setMembresia(e.target.value)}
  placeholder="SB001"
  className="w-full border border-blue-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring focus:border-blue-400 text-blue-600 placeholder:text-blue-400"
/>



          <label className="block text-blue-600 text-3xl font-semibold mb-1">
            Nombre completo:
          </label>
         <input
  type="text"
  value={nombre}
  onChange={(e) => setNombre(e.target.value)}
  placeholder="Juan Pérez"
  className="w-full border border-blue-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring focus:border-blue-400 text-blue-600 placeholder:text-blue-400"
/>


         <button
  onClick={handleParticipar}
  className="w-full bg-yellow-400 text-blue-800 font-bold py-2 px-4 rounded-md shadow-md hover:bg-yellow-300"
>
  Participar
</button>


          {mensaje && (
            <p className="mt-4 text-center text-blue-600 font-semibold">{mensaje}</p>
          )}

        </div>
      </div>
    </div>
  );
  }

