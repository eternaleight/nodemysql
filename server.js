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

//データを追加
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

//データを取得
app.get("/getposts", (req, res) => {
  let sql = "SELECT * FROM posts"
  let query = db.query(sql, (err, results) => {
    if(err) throw err
    console.log(results)
    res.send("Posts fetched...")
    console.log("データを取得しました")
  })
})

app.get("/gettitle", (req, res) => {
  let sql = "SELECT title FROM posts"
  let query = db.query(sql, (err, results) => {
    if(err) throw err
    console.log(results)
    res.send("Title fetched...")
    console.log("データを取得しました")
  })
})

//req.params.idからデータを取得
app.get("/getpost/:id", (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`
  let query = db.query(sql, (err, results) => {
    if(err) throw err
    console.log(results)
    res.send("Single post fetched...")
    console.log("データを取得しました")
  })
})

//データを更新
app.get("/updatepost/:id", (req, res) => {
  let newTitle = "Updated Title"
  let sql = `UPDATE posts SET title = "${newTitle}" WHERE id = ${req.params.id}`
  let query = db.query(sql, (err, results) => {
    if(err) throw err
    console.log(results)
    res.send("Updated post...")
    console.log("データを更新しました")
  })
})

//データを削除
app.get("/deletepost/:id", (req, res) => {
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`
  let query = db.query(sql, (err, results) => {
    if(err) throw err
    console.log(results)
    res.send("Delete single post...")
    console.log("データを削除しました")
  })
})

app.listen(PORT, () => {
  console.log(`localhost:${PORT}が起動しました`)
})
