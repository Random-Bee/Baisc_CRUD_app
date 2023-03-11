const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sql = require('mysql2');
const cors = require('cors');
const pass = require('./password');

// const pool = sql.createPool({
//     host: 'sql12.freemysqlhosting.net',
//     user: 'sql12604744',
//     password: pass,
//     database: 'sql12604744',
// });
const pool = sql.createPool({
    host: 'localhost',
    user: 'root',
    password: "My_4rec1ou5",
    database: 'crud_contact',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM contact_db";
    pool.query(sqlSelect, (err, result) => {
        res.send(result);
    });

})

app.get('/api/get/:id', (req, res) => {
    const {id} = req.params;
    const sqlSelect = "SELECT * FROM contact_db where id = ?";
    pool.query(sqlSelect, id, (err, result) => {
        console.log(err);
        res.send(result);
    });

})

app.post('/api/post', (req, res) => {
    const first_name = req.body.fname;
    const last_name = req.body.lname;
    const email = req.body.email;
    const sqlInsert = "INSERT INTO contact_db (First_Name, Last_Name, Email) VALUES (?,?,?)";
    pool.query(sqlInsert, [first_name, last_name, email], (err, result) => {
        console.log("error",err);
        console.log("result",result);
    });
})

app.post('/api/delete/:id', (req, res) => {
    const {id} = req.params;
    console.log(req.params);
    const sqlDelete = "DELETE FROM contact_db WHERE ID = ?";
    pool.query(sqlDelete, id, (err, result) => {
        console.log("error",err);
        console.log("result",result);
    });
})

app.put('/api/update/:id', (req, res) => {
    console.log(req.params, req.body);
    const {id} = req.params;
    const first_name = req.body.fname;
    const last_name = req.body.lname;
    const email = req.body.email;
    const sqlUpdate = "UPDATE contact_db SET First_Name = ?, Last_Name = ?, Email = ? WHERE ID = ?";
    pool.query(sqlUpdate, [first_name, last_name, email, id], (err, result) => {
        console.log("error",err);
        console.log("result",result);
    });
})

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(5000, () => {
    console.log('5000 lol');
})

