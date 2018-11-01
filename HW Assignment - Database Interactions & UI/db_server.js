/****************************************************************************
 * Author: Tristan Santiago                                                  *
 * Title: db_server.js                                                       *
 * Date: 6/4/2018                                                            *
 * Description: db_server sets up the pages and methods used to insert       *
 * information into the database, defines the software required to get the   *
 * server running and contains a lot of modified boilerplate code from the   *
 * lectures.                                                                 *
 ****************************************************************************/
// Boilerplate code from lectures.
var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({
    defaultLayout: 'main'
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 4143);
app.use(express.static('public'));
/****************************************************************
 *           app.get('/',function(req,res,next)                  *
 * This function retrieves the information from the Database     *
 * It is a modified version of the provided code in the lecture. *
 ****************************************************************/
app.get('/', function(req, res, next) {
    var context = {};
    mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields) {
        if (err) {
            next(err);
            return;
        }
        //context.results = JSON.stringify(rows);
        context.results = rows;
        res.render('home', context);
    });
});
/****************************************************************
 *           app.get('/insert',function(req,res,next)            *
 * This function is responsible for inserting the information    *
 * into the database. It is a modified version of the provided   *
 * code in the lecture.                                          *
 ****************************************************************/
app.get('/insert', function(req, res, next) {

    // Insert information into the workout database. 
    mysql.pool.query("INSERT INTO workouts (`name`,`reps`,`weight`,`date`,`lbs`) VALUES (?, ?, ?, ?, ?)", [req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.lbs], function(err, result) {
        if (err) {
            next(err);
            return;
        }
        // Retrieve the item most recently added to the database.
        mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields) {
            if (err) {
                next(err);
                return;
            }
            // Send the information back to client.
            res.send(rows[rows.length - 1]);
        });
    });
});
/****************************************************************
 *           app.get('/delete',function(req,res,next)            *
 * This function deletes IDs from the database. It is a modified *
 * version of the provided code in the lecture.                  *
 ****************************************************************/
app.get('/delete', function(req, res, next) {
    mysql.pool.query("DELETE FROM workouts WHERE id=?", [req.query.id], function(err, result) {
        if (err) {
            next(err);
            return;
        }
        res.render('home');
    });
});
/****************************************************************
 *           app.get('/delete',function(req,res,next)            *
 * This function updates IDs from the database. It is a modified *
 * version of the provided code in the lecture.                  *
 ****************************************************************/
app.get('/update', function(req, res, next) {
    mysql.pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=? ", [req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.lbs, req.query.id],
        function(err, result) {
            if (err) {
                next(err);
                return;
            }

            // Select the most recently added item from the database.
            mysql.pool.query('SELECT * FROM workouts WHERE id=?', [req.query.id], function(err, rows, fields) {
                if (err) {
                    next(err);
                    return;
                }
                res.send(rows);
            });
        });
});
/****************************************************************
*           app.get('/reset-table',function(req,res,next)       *
* This function resets the database. It is a modified version   *
of the provided code in the lecture.                            *
****************************************************************/
app.get('/reset-table', function(req, res, next) {
    var context = {};
    mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err) {
        var createString = "CREATE TABLE workouts(" +
            "id INT PRIMARY KEY AUTO_INCREMENT," +
            "name VARCHAR(255) NOT NULL," +
            "reps INT," +
            "weight INT," +
            "date DATE," +
            "lbs BOOLEAN)";
        mysql.pool.query(createString, function(err) {
            context.results = "Table reset";
            res.render('home', context);
        })
    });
});
// Boilerplate code from lectures.
// 404 error message.
app.use(function(req, res) {
    res.status(404);
    res.render('404');
});
// 500 error message.
app.use(function(err, req, res, next) {
    res.type('plain/text');
    res.status(500);
    res.render('500');
});
// Displays a message to the console when the server is running.
app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});