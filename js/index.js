import express from "express"
import { saveBook } from "./lib.js"
import { getLinks } from "./scraper.js"

const app = express()

app.use(express.json())
app.get("/chapter/:number", async (req, res) => {
    // get params
    const { number } = req.params
    const chapters = await getLinks('https://www.uukanshu.com/b/439/')

    // find chapter
    const chapter = chapters.find(chapter => chapter.text.match(`第${number}章`))


    res.json(chapter)
})

app.post("/createBook", (req, res) => {
    saveBook(req.body)
    res.send("OK")
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})