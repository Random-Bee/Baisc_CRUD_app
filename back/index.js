const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sql = require('mysql2');
const cors = require('cors');
const pass = require('./password');

const pool = sql.createPool({
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12604744',
    password: pass,
    database: 'sql12604744',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/get', (req, res) => {
    const sqlSelect = "SELECT * FROM Users";
    pool.query(sqlSelect, (err, result) => {
        res.send(result);
    });
})

app.get('/get/:id', (req, res) => {
    const {id} = req.params;
    const sqlSelect = "SELECT * FROM Users where id = ?";
    pool.query(sqlSelect, id, (err, result) => {
        res.send(result);
    });
})

app.post('/post', (req, res) => {
    const first_name = req.body.fname;
    const last_name = req.body.lname;
    const email = req.body.email;
    const sqlInsert = "INSERT INTO Users (First_Name, Last_Name, Email) VALUES (?,?,?)";
    pool.query(sqlInsert, [first_name, last_name, email]);
})

app.post('/delete/:id', (req, res) => {
    const {id} = req.params;
    const sqlDelete = "DELETE FROM Users WHERE ID = ?";
    pool.query(sqlDelete, id);
})

app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    const first_name = req.body.fname;
    const last_name = req.body.lname;
    const email = req.body.email;
    const sqlUpdate = "UPDATE Users SET First_Name = ?, Last_Name = ?, Email = ? WHERE ID = ?";
    pool.query(sqlUpdate, [first_name, last_name, email, id]);
})

app.get('/', (req, res) => {
    res.send('CRUD');
});

app.listen(5000, () => {
    console.log('5000');
})

