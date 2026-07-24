require("dotenv").config();
const app = require("./app");
const pool = require("./config/db");

const databaseServerConnection = async () => {
  try {
    await pool.query("SELECT NOW()");

    app.listen(process.env.PORT, () => {
      console.log(`server running at port ${process.env.PORT}`);
    });
  } catch (e) {
    console.log(`DB error : ${e.message}`);
    process.exit(1);
  }
};

databaseServerConnection();
