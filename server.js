const express = require("express")
const mysql = require("mysql")

const app = express()
const PORT = 3001
require("dotenv").config()


const db = mysql.createConnection({
  connectionLimit: process.env.connectionLimit,
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
})

//データベースに接続
db.connect((err) => {
  if(err) throw err
  console.log("mysqlに接続中...")
})


//データベースを作成する
app.get("/createdb", (req, res) => {
  let sql = 'CREATE DATABASE nodemysql'
  db.query(sql, (err, result) => {
    if(err) throw err
    console.log(result)
    res.send("databaseを作成しています...")
  })
})

//テーブルを作成する
app.get("/createtable",(req, res) => {
  let sql = "CREATE TABLE posts(id INT auto_increment, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))"
  db.query(sql, (err, result) => {
    if(err) throw err
    console.log(result)
    res.send("tableを作成しています...")
  })
})

app.get("/addpost1",(req, res) => {
  let post = {title: "Post One", body: "This is post number one"}
  let sql = "INSERT INTO posts SET ?"
  let query = db.query(sql, post, (err, result) => {
    if(err) throw err
    console.log(result)
    res.send("Post 1 added...")
    console.log("データベースに追加しました")
  })
})

app.get("/addpost2",(req, res) => {
  let post = {title: "Post two", body: "This is post number two"}
  let sql = "INSERT INTO posts SET ?"
  let query = db.query(sql, post, (err, result) => {
    if(err) throw err
    console.log(result)
    res.send("Post 2 added...")
    console.log("データベースに追加しました")
  })
})


app.listen(PORT, () => {
  console.log(`localhost:${PORT}が起動しました`)
})
