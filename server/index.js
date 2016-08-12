var express = require('express')
var app = express()
var db = require('./db')
var models = require('./db/models');
var bodyParser = require('body-parser')

app.use(express.static('build'));
app.use(bodyParser.json());

app.listen(3000, function () {});

app.post('/api/locations', function getSpell(req, res) {
    if (!req.body) {
        res.json({error: 'Epic Fail!'})
    } else {
        getAll()
            .then(list => {
                res.json(list)
            })
    }
})

function getAll() {
    return models.locations
        .find({})
}

function findByName(params) {
    return models.locations
        .find({$text: {$search: params.name}})
}
