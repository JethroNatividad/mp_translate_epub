import express from "express"

const app = express()

app.use(express.json())
app.get("/", (req, res) => {
    res.send("Hello World")
})

app.post("/createBook", (req, res) => {
    const { text, title, author, imageUrl, publisher } = req.body
    res.send({ text, title, author, imageUrl, publisher })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})