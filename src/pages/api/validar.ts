// pages/api/validar.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { membresia, nombre } = req.body;

  if (!membresia || !nombre) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  try {
    const googleRes = await fetch("https://script.google.com/macros/s/AKfycbx8S30-sTqJG_xOqxBVcHrL0b1J8DPXxMvWsS7NyqND2t8oR2ywu1VlERoWLDky_HuR/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ membresia, nombre }),
    });

    const data = await googleRes.json();

    // Si la respuesta de Google Script no es válida (por ejemplo, HTML), esto lanzará error
    if (!data || typeof data !== "object") {
      return res.status(500).json({ error: "Respuesta no válida desde Google Script." });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Error en llamada a Google Script:", err);
    return res.status(500).json({ error: "Error al validar con Google Script." });
  }
}
