const express = require('express');
const fs = require('fs');

const app = express();

// Parse request body as JSON
app.use(express.json());

// GET all items 
app.get('/items', (req, res) => {
    fs.readFile('items.json',
        (err, data) => {
            if (err) return console.log(err);
            const items = JSON.parse(data);
            res.json(items);
        }
    );
});

// GET single item
app.get('/items/:id', (req, res) => {
    fs.readFile('items.json', 'utf8', (err, data) => {
        if (err) return console.log(err);

        const items = JSON.parse(data)
        const item = items.find(item => parseInt(item.id) === parseInt(req.params.id));
        if (!item) return res.status(404).send('Item not found');

        res.json(item);
    });
});

// post huselt yvuulna
// fs.writeFile -iig ashiglana
// req.body 
// items.json luu nemne


// POST new item
app.post('/items', (req, res) => {
    fs.readFile('items.json', 'utf8', (err, data) => {
        if (err) throw err;
        const items = JSON.parse(data);
        // const newItem = {
        //     id: (items.length + 1).toString(),
        //     ...req.body
        // }
        items.push(req.body);
        fs.writeFile('items.json', JSON.stringify(items), (err) => {
            if (err) return res.status(500).send('Error writing file');
            res.status(201).json('created new item');
        });
    });
});


// PUT update item
app.put('/items/:id', (req, res) => {
    fs.readFile('items.json', 'utf8', (err, data) => {
        if (err) throw err;

        const items = JSON.parse(data);

        const item = items.find(i => parseInt(i.id) === parseInt(req.params.id));
        if (!item) return res.status(404).send('Item not found');

        Object.assign(item, req.body);

        fs.writeFile('items.json', JSON.stringify(items), err => {
            if (err) return res.status(500).send('Error writing file');
            res.json(item);
        });
    });
});

// DELETE item
app.delete('/items/:id', (req, res) => {
    fs.readFile('items.json', 'utf8', (err, data) => {
        if (err) throw err;

        let items = JSON.parse(data);

        const item = items.find(i => parseInt(i.id) === parseInt(req.params.id));
        if (!item) return res.status(404).send('Item not found');

        items = items.filter(i => parseInt(i.id) !== parseInt(req.params.id));

        fs.writeFile('items.json', JSON.stringify(items), err => {
            if (err) return res.status(500).send('Error writing file');

            res.sendStatus(200);
        });
    });
});

app.listen(3000, () => {
    console.log('API listening on port 3000');
}); 