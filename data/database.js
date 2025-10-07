// importiamo mysql2
const mysql = require("mysql2");

// creo la connessione
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

// stabilisco la connessione al db
connection.connect((err) => {
    if (err) {
        console.log(process.env.DB_USER)
        console.log(`Errore nella connessione al db: ${err}`);
    } else {
        console.log("Connessione al db avvenuta correttamente");
    }
});

module.exports = connection;