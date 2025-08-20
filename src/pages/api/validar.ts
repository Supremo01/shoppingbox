import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { membresia, nombre } = req.body;

  if (!membresia || !nombre) {
    return res.status(400).json({ error: "Faltan campos: membresía y nombre" });
  }

  try {
    const queryParams = new URLSearchParams({
      membresia,
      nombre,
    });

    const url = `https://script.google.com/macros/s/AKfycbx8S30-sTqJG_xOqxBVcHrL0b1J8DPXxMvWsS7NyqND2t8oR2ywu1VlERoWLDky_HuR/exec?membresia=${encodeURIComponent(membresia)}&nombre=${encodeURIComponent(nombre)}`;
    const googleRes = await fetch(url);
    const data = await googleRes.json();

    return res.status(200).json(data);
  } catch (err) {
    console.error("Error en llamada a Google Script:", err);
    return res.status(500).json({ error: "Error al validar con Google Script." });
  }
}
