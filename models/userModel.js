const pool = require("../config/db");

// register model
const getUser = async (email) => {
  const userQuery = `
    SELECT 
        * 
    FROM 
        usertable 
    WHERE 
        email = $1
    AND 
        isdeleted = FALSE`;
  return await pool.query(userQuery, [email]);
};

const insertUser = async (name, email, hashedPassword, gender) => {
  const insertQuery = `
    INSERT INTO 
        usertable(name,email,password,gender)
        VALUES($1,$2,$3,$4)`;
  return await pool.query(insertQuery, [name, email, hashedPassword, gender]);
};

// login user model

module.exports = { getUser, insertUser };
