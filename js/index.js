import express from "express"
import { saveBook } from "./lib.js"

const app = express()

app.use(express.json())
app.get("/", (req, res) => {
    res.send("Hello World")
})

app.post("/createBook", (req, res) => {
    saveBook(req.body)
    res.send("OK")
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})