// index.js

/**
 * Required External Modules
 */

const mysql = require('mysql');
const express = require("express");
const path = require("path");
const js2xmlparser = require("js2xmlparser");
const converter = require('json-2-csv');

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "8080";

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'projectedaw'
  });
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
  });

/**
 *  App Configuration
 */



 

/**
 * Routes Definitions
 */

app.get("/", (req, res) => {
    res.status(200).send("Apis en xml, csv y json");
  });

  app.get("/xml", (req, res) => {
    connection.query('SELECT * FROM gasolineras', (err,rows) => {
        if(err) throw err;
      
        console.log('Datos Recibidos de la BDD');
        res.status(200).send(js2xmlparser.parse("gasolineras", rows));
      });
  });

  app.get("/json", (req, res) => {
    connection.query('SELECT * FROM gasolineras', (err,rows) => {
        if(err) throw err;
      
        console.log('Datos Recibidos de la BDD');
        res.status(200).send(rows);
      });
  });

  app.get("/csv", (req, res) => {
    connection.query('SELECT * FROM gasolineras', (err,rows) => {
        if(err) throw err;
      
 
        converter.json2csv(rows, (err, csv) => {
            if (err) {
                throw err;
            }
        
            // print CSV string
            res.status(200).send(csv);
        });
      });
  });

/**
 * Server Activation
 */

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });