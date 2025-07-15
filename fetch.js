const express = require("express")
const mysql = require("mysql")
const cors = require('cors')
const { exec } = require('child_process');
const { console } = require("inspector");
const app = express()

const con=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Thaison@@1',
    database: 'test' //remember to replace with your username and password
})

con.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("connected!")
    }
})

app.use(cors());

var data_lim = 10;

app.get("/fetch", (req,res)=>{
    con.query("select * from test", function(err, result, fields){
        if(err){
            console.log(err)
        }else{
            var r = JSON.parse(JSON.stringify(result))
            var d = []
            for(let i = data_lim; i>0; i--)
            {
                d[data_lim-i] = r[r.length - i]
            }
            res.send(d)
        }
    })
})

app.get("/action_history", (req,res)=>{
    con.query("select * from action_history", function(err, result, fields){
        if(err){
            console.log(err)
        }else{
            var r = JSON.parse(JSON.stringify(result))
            var d = []
            for(let i = data_lim; i>0; i--)
            {
                d[data_lim-i] = r[r.length - i]
            }
            res.send(d)
            console.log(d)
        }
    })
})

app.get('/more_data', (req, res) => {
    data_lim = data_lim + 100;
    console.log("More data!");
    res.send(data_lim.toString());
});
app.get('/reset_data', (req, res) => {
    data_lim = 10;
    console.log("Reset data!");
    res.send(data_lim.toString());
});

app.get('/status', (req, res) => {
    exec(`python ${'code/stat.py'}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script: ${error.message}`);
            res.status(500).send(`Error: ${error.message}`);
            return;
        }
      
        if (stderr) {
            console.warn(`Python script stderr: ${stderr}`);
            res.status(500).send(`Script Error: ${stderr}`);
            return;
        }
        const status = stdout.trim();
        let response = [];
        if(status == "b'1 1'"){
            response = ['11'];
        }
        else if(status == "b'1 0'"){
            response = ['10'];
        }
        else if(status == "b'0 1'"){
            response = ['01'];
        }
        else if(status == "b'0 0'"){
            response = ['00'];
        }
        res.json(response);
    });
});
app.get('/fan_on', (req, res) => {
    exec(`python ${'code/fan_pub.py'}`, (error, stdout, stderr) => {
      console.log(`Script output: ${stdout}`);
      res.send(`Script executed successfully! Output: ${stdout}`);
    });
    var sql = "insert into action_history values(id, \"fan\", \"turn on\", CURRENT_TIMESTAMP())";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
});
app.get('/fan_off', (req, res) => {
    exec(`python ${'code/fan_pub.py'}`, (error, stdout, stderr) => {
      console.log(`Script output: ${stdout}`);
      res.send(`Script executed successfully! Output: ${stdout}`);
    });
    var sql = "insert into action_history values(id, \"fan\",\"turn off\", CURRENT_TIMESTAMP())";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
});
app.get('/auto_fan_on', (req, res) => {
    var sql = "insert into action_history values(id, \"auto_fan\", \"turn on\", CURRENT_TIMESTAMP())";
    con.query(sql, function (err, result) {
        if (err) throw err;
      });
    res.send("Auto fan is on!");
});
app.get('/auto_fan_off', (req, res) => {
    var sql = "insert into action_history values(id, \"auto_fan\",\"turn off\", CURRENT_TIMESTAMP())";
    con.query(sql, function (err, result) {
        if (err) throw err;
      });
    res.send("Auto fan is off!");
});
app.get('/light_on', (req, res) => {
    exec(`python ${'code/light_pub.py'}`, (error, stdout, stderr) => {
      console.log(`Script output: ${stdout}`);
      res.send(`Script executed successfully! Output: ${stdout}`);
    });
    var sql = "insert into action_history values(id, \"light\", \"turn on\", CURRENT_TIMESTAMP())";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
});
app.get('/light_off', (req, res) => {
    exec(`python ${'code/light_pub.py'}`, (error, stdout, stderr) => {
      console.log(`Script output: ${stdout}`);
      res.send(`Script executed successfully! Output: ${stdout}`);
    });
    var sql = "insert into action_history values(id,\"light\",\"turn off\", CURRENT_TIMESTAMP())";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
});
app.get('/auto_light_on', (req, res) => {
    var sql = "insert into action_history values(id, \"auto_light\", \"turn on\", CURRENT_TIMESTAMP())";
    con.query(sql, function (err, result) {
        if (err) throw err;
      });
    res.send("Auto light is on!");
});
app.get('/auto_light_off', (req, res) => {
    var sql = "insert into action_history values(id, \"auto_light\",\"turn off\", CURRENT_TIMESTAMP())";
    con.query(sql, function (err, result) {
        if (err) throw err;
      });
    res.send("Auto light is off!");
});

app.listen(3000,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("on port 3000!")
    }
})