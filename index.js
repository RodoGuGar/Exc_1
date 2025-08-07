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
        CREATE TABLE device_logs (
        id SERIAL PRIMARY KEY,
        action VARCHAR(50) NOT NULL,
        "user" TEXT NOT NULL,
        enroll_id TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
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

app.delete("/deletetable", async (req, res) => {
  try {
    const tableName = "data";

    const checkTable = await pool.query(`SELECT to_regclass($1) AS exists`, [
      tableName,
    ]);

    if (checkTable.rows[0].exists) {
      await pool.query(`
        DROP TABLE ${tableName};
      `);

      return res
        .status(201)
        .json({ message: "✅ Tabla eliminada exitosamente" });
    } else {
      return res.status(200).json({ message: "ℹ La tabla no existe" });
    }
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});

app.post("/turn-on", async (req, res) => {
  const { user, enrollId } = req.body;
  deviceStatus.isOn = true;

  try {
    await pool.query(
      `INSERT INTO device_logs (action, "user", enroll_id) VALUES ($1, $2, $3)`,
      ["turn-on", user, enrollId]
    );

    return res.json({
      message: "Dispositivo encendido",
      status: deviceStatus,
    });
  } catch (err) {
    console.error("Error al guardar log:", err);
    return res.status(500).json({ error: "Error al guardar log" });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});

app.post("/savedata", async (req, res) => {
  const { value, name, matricula } = req.body;
  const tableName = "data";

  try {
    await pool.query(
      `INSERT INTO ${tableName}(value, name, matricula) VALUES ($1, $2, $3)`,
      [value, name, matricula]
    );

    return res.status(201).json({ message: "Datos insertados correctamente" });
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({ error: "Error al guardar los datos" });
  }
});

app.get("/get-data", async (req, res) => {
  const tableName = "data";

  try {
    const result = await pool.query(`SELECT * FROM ${tableName}`);
    return res.json(result.rows);
  } catch {
    return res.status(500).json({ error: "Imposible regresar los datos" });
  }
});
/*
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
});*/
