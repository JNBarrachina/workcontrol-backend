const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');


//get
router.get('/firma/:email/:name', (req, res) => {
  const email = req.params.email;
  const name = req.params.name;
  
  if (!email || !name) {
    return res.status(400).json({ error: 'Email o Usuario no proporcionado.' });
  }

  const userFolder = path.join(__dirname, `../uploads/employees/${email}`);
  const firmaPath = path.join(userFolder, 'signature', `signature_${name}.png`);

  if (!fs.existsSync(firmaPath)) {
    return res.status(404).json({ error: 'Firma no encontrada.' });
  }

  // Envía directamente el archivo de imagen
  res.sendFile(firmaPath);
});

router.post("/", async (req, res) => {
  const archivo = req?.files?.firma;
  const { user, role, email, dni, create } = req.body;

  if (!archivo) {
    return res.status(400).json({ error: "No se envió ningún archivo." });
  }

  const uploadsDir = path.join(__dirname, `../uploads/employees/${email}`);
  const nombreArchivo = `signature_${user}.png`;

  const json_file = {
    user,
    role,
    email,
    dni,
    signature_create: create,
  }

  // Crear directorios si no existen
  try {
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    ['/image', '/timesheets', '/signature'].forEach(dir => {
      const fullDir = path.join(uploadsDir, dir);
      if (!fs.existsSync(fullDir)) {
        fs.mkdirSync(fullDir);
      }
    });

    // Guardar metadata
    fs.writeFileSync(
      path.join(uploadsDir, 'data.json'),
      JSON.stringify(json_file)
    );

    // Guardar firma
    const rutaArchivo = path.join(uploadsDir, 'signature', nombreArchivo);
    await archivo.mv(rutaArchivo);

    res.json({
      mensaje: "Firma guardada correctamente.",
      ruta: `/uploads/signature/${nombreArchivo}`,
      nombre: nombreArchivo,
    });
  } catch (err) {
    console.error("Error al guardar el archivo:", err);
    res.status(500).json({ error: "No se pudo guardar el archivo." });
  }
});


module.exports = router;