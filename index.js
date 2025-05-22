const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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
