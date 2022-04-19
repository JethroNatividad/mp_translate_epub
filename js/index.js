import express from "express"

const app = express()

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.post("/createBook", (req, res) => {
    const { text, author, title, imageUrl } = req.body
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})