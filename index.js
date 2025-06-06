import pool from "./db.js"; //Importando la cadena de conexion
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/create-data-table", async (req, res) => {
  try {
    const tableName = "data";

    const checkTable = await pool.query(`SELECT to_regclass($1) AS exists`, [
      tableName,
    ]);

    if (!checkTable.rows[0].exists) {
      await pool.query(`
        CREATE TABLE ${tableName} (
          id SERIAL PRIMARY KEY,
          value TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      return res.status(201).json({ message: "✅ Tabla creada exitosamente" });
    } else {
      return res.status(200).json({ message: "ℹ La tabla ya existe" });
    }
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});

app.get("/temperature", (req, res) => {
  res.json({ valor: "10 °C", timestamp: new Date().toISOString() });
});

app.get("/esteesotroenpoint", (req, res) => {
  res.json({ valor: "Hola mundo", timestamp: new Date().toISOString() });
});

app.get("/velocidad", (req, res) => {
  res.json({ nombre: "Rodolfo ", apellido: "Guerra Garcia" });
});

app.get("/UTLD", (req, res) => {
  res.json({ tipo: "Universidad Tecnologica", locacion: "De La Laguna" });
});

app.listen(PORT, () => {
  console.log(`Server corriendo en puerto ${PORT}`);
});
