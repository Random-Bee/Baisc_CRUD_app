const sql = require('mysql2');
const getData = require('./getData');
const pass = require('./password');

const pool = sql.createPool({
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12604744',
    password: pass,
    database: 'sql12604744',
});

let x = 0;

f = async () => {
    const data = await getData();
    for(let i = 0; i < data.length; i++) {

        let fn = data[i].first_name;
        let ln = data[i].last_name;
        let em = data[i].email;

        let sqlIn = `INSERT INTO Users (First_Name, Last_Name, Email) VALUES ('${fn}', '${ln}', '${em}')`;

        pool.query(sqlIn, (err, result) => {
            if(err) { 
                console.log(err);
                return;
            }
          else {
            x += 1;
            console.log(x);
            if(x==data.length) pool.end();
          }
        });
    }
}

f();