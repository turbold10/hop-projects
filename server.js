const e = require('express')
const express = require('express')
const fs = require('fs')

const app = express()

app.use(express.json())

app.get('/users', (req, res) => {
    fs.readFile('./users.json', 'utf-8', (err, data) => {
        if (err) console.log(JSON.parse(err))
        const JSONdata = JSON.parse(data);
        res.json(JSONdata);
    })
})

app.get('/users/:id', (req, res) => {
    fs.readFile('./users.json', 'utf-8', (err, jsonData) => {
        if (err) console.log(err)
        const data = JSON.parse(jsonData)
        for (i = 0; i < data.length; i++) {
            if (data[i].id === req.params.id) {
                user = data[i]
            }
        }
        // const user = JSON.parse(data).find((user) => user.id === req.params.id)
        res.json(user)
    })
})

app.put('/users', (req, res) => {
    fs.readFile('./users.json', 'utf-8', (err, jsonData) => {
        if (err) console.log(err)
        const data = JSON.parse(jsonData)
        data.push(req.body)
        fs.writeFile('./users.json', JSON.stringify(data), (err, data) => {
            if (err) console.log(err)
            res.status(201).json({ message: 'user created' })
        })
    })
})

app.delete('/users/:name', (req, res) => {
    fs.readFile('./users.json', 'utf-8', (err, jsonData) => {
        if (err) console.log(err)
        const data = JSON.parse(jsonData)
        const newData = data.filter((user) => user.name !== req.params.name)
        fs.writeFile('./users.json', JSON.stringify(newData), (err, data) => {
            if (err) console.log(err)
            res.status(201).json({message:"user deleted"})
        })
    })
})

app.listen(3000, () => {
    console.log('API listening on port 3000');
}); 