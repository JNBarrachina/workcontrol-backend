const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');

// subir archivos al sevidor
router.post("/", async (req, res) => {
        const archivo = req.files?.firma;
        const user = req.body?.user;

        if (!archivo) {
            return res.status(400).json({ error: "No se envió ningún archivo." });
        }

        const uploadsDir = path.join(__dirname, "../uploads/pictures");
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir);
        }

        const nombreArchivo = `firma_${user}.png`;
        const rutaArchivo = path.join(uploadsDir, nombreArchivo);

        archivo.mv(rutaArchivo, (err) => {
            if (err) {
            console.error("Error al guardar el archivo:", err);
            return res.status(500).json({ error: "No se pudo guardar el archivo." });
            }

            res.json({
            mensaje: "Firma guardada correctamente.",
            ruta: `/uploads/${nombreArchivo}`,
            nombre: nombreArchivo,
            });
        });
    });


module.exports = router;