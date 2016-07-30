var express = require('express')
var app = express()
var db = require('./db')
var models = require('./db/models');
var bodyParser = require('body-parser')

app.use(express.static('build'));
app.use(bodyParser.json());

app.listen(3000, function () {});

app.post('/api/spells', function getSpell(req, res) {
    console.log(req.body);
    if (!req.body.name) {
        res.json({error: 'Epic Fail!', req: req.body})
    } else {
        findSpellByName(req.body)
            .then(spells => {
                res.json(spells)
            })
    }
})



function findSpellByName(params) {
    return models.spells
        .find({$text: {$search: params.name}})
}
