const express = require("express")

const app = express()

app.use(express.json())

const notes = []

app.post("/notes", (req,res)=>{

    notes.push(req.body)

    res.status(201).json({
        message:"Note created successfully"
    })
    
})

app.get("/notes",(req,res) =>{
    res.status(200).json({
        notes:notes
    })
})

app.delete("/notes/:mama",(req ,res) => {
    delete notes[req.params.mama]

    res.status(200)({
        message:"Notes deleated successfully"
    })
})

app.patch("/notes/:index",(req,res) =>{
    notes[req.params.index].description = req.body.discription
    req.status(200).json({
        message:"Notes created successfully"
    })
})

module.exports = app 