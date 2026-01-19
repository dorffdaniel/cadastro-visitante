import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2';

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASS,
    database: 'cadastro_visitante'
});


conn.connect((err) => {

    if (err) {
        console.log(err);
    } else {
        console.log("conexao realizada com sucesso");
    }

})


export default conn;

