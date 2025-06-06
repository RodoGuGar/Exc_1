//const { Pool } = require("pg");
import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  connectionString:
    "postgresql://root:JNQKxanLFQ6jabXp4JCjD4ejouaRTrFe@dpg-d0vknlemcj7s73eo1da0-a.oregon-postgres.render.com/iot4_kjb",
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;

/*
async function testConection() {
  try {
    const client = await pool.connect();
    console.log("Conexion exitosa");
    client.release();
    await pool.end();
  } catch (err) {
    console.err("Error al conectar", err);
  }
}

testConection();*/
