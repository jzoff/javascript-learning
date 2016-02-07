var express = require('express');
var router = express.Router();

var _ = require('lodash');

var todos = [];

router.get('/', (req, res, next) => {
    res.send(todos);
});

router.get('/:id', (req, res, next) => {
    var todo = _.find(todos, ['id', parseInt(req.params.id)]);
    res.send(todo);
});

router.post('/', (req, res, next) => {
    var todo = req.body;

    // Create id based on max id in array of todos
    var temp = _.maxBy(todos, x => x.id);
    todo.id = typeof temp === 'undefined' ? 0 : temp.id + 1;

    todos.push(todo);
    res.status(201).send(todo);
});

router.put('/:id', (req, res, next) => {
    var todo = _.find(todos, ['id', parseInt(req.params.id)]);
    todo.title = req.body.title;
    todo.completed = req.body.completed;
    res.send(todo);
});

router.delete('/:id', (req, res, next) => {
    var id = parseInt(req.params.id);
    var todo = _.find(todos, ['id', id]);
    if (typeof todo === 'undefined') {
        res.sendStatus(404);
    }
    else {
        _.remove(todos, x => x.id === id);
        res.sendStatus(204);
    }
});

module.exports = router;
