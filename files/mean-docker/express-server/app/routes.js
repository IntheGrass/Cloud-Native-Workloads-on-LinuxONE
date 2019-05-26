var Todo = require('./models/todo');

function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        if(req.body.option == 'a'){
            Todo.findOne({ 
                balance: 1000
            }, function (err, todo){
                if (err)
                    res.send(err);
                todo.balance = 5000;
                todo.save();
                getTodos(res);
            });
        }
        else {
            Todo.create({
                username: req.body.username,
                balance: req.body.balance,
                done: false
            }, function (err, todo) {
                if (err)
                    res.send(err);

                // get and return all the todos after you create another
                getTodos(res);
            });
        }
    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    //更新一个todo的存款
    /*app.put('/api/todos:todo_id', function(req,res){
        Todo.update({
            //_id: req.params.todo_id
            username: 'abc'
        },
        {
            //更新的存款数字
            balance: 'def'
        },function(err,todo){
            if (err)
                res.send(err);

            getTodos(res);
        });
    });*/
    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
