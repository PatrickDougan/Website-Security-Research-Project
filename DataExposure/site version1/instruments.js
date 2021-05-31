module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getInstruments(res, mysql, context, complete){
        mysql.pool.query("SELECT i.id, i.type, i.manufacturer, i.serial_num, i.needs_repair, i.last_repair_date, s.fname, s.lname FROM instruments as i LEFT JOIN student_instrument as si ON i.id = si.iid LEFT JOIN students as s ON si.sid = s.id ORDER BY i.id", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.instruments = results;
            complete();
        });
    }

    function getInstrument(res, mysql, context, id, complete){
        var sql = "SELECT i.id, i.type, i.manufacturer, i.serial_num, i.needs_repair, \
                   i.last_repair_date, si.sid, s.fname, s.lname, si.id as siid FROM instruments as i \
                   LEFT JOIN student_instrument as si ON i.id = si.iid \
                   LEFT JOIN students as s ON si.sid = s.id \
                   WHERE i.id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.instrument = results[0];
            complete();
        });
    }

/*
    function getAvailableInstruments(res, mysql, context, complete){
        var sql = "SELECT i.id, i.type, i.manufacturer FROM instruments AS i \
                   LEFT JOIN student_instrument AS si ON i.id = si.iid WHERE si.sid IS NULL";
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.available_instruments = results;
            complete();
        });
    }
*/

    function getUninstrumentedStudents(res, mysql, context, complete){
        var sql = "SELECT s.id, s.fname, s.lname FROM students as s \
                   LEFT JOIN student_instrument AS si ON s.id = si.sid \
                   WHERE si.iid IS NULL ORDER by s.lname";
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.uninstrumented_students = results;
            complete();
        });
    }

    /*Display all instruments. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteinstrument.js"];
        var mysql = req.app.get('mysql');
        getInstruments(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('instruments', context);
            }

        }
    });

    /* Display one instrument for the specific purpose of updating instruments */

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateinstrument.js","deletestudentinstrument.js"];
        var mysql = req.app.get('mysql');
        getInstrument(res, mysql, context, req.params.id, complete);
        getUninstrumentedStudents(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-instrument', context);
            }
        }
    });

    /* Adds a instrument, redirects to the instruments page after adding */

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO instruments (type, manufacturer, serial_num) VALUES (?,?,?)";
        var inserts = [req.body.type, req.body.manufacturer, req.body.serial_num];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/test_site/instruments');
            }
        });
    });


    /* Adds a instrument, redirects to the instruments page after adding */

    router.post('/addstudentinstrument', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO student_instrument (sid,iid) VALUES (?,?)";
        var inserts = [req.body.sid, req.body.iid];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/instruments/' + req.body.iid);
            }
        });
    });

    /* The URI that update data is sent to in order to update a instrument */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE instruments SET type=?, manufacturer=?, serial_num=?, needs_repair=?, last_repair_date=? WHERE id=?";
        var inserts = [req.body.type, req.body.manufacturer, req.body.serial_num, req.body.needs_repair, req.body.last_repair_date, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    /* Route to delete a instrument, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM instruments WHERE id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    /* Route to delete a instrument, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/delete_assignment/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM student_instrument WHERE id = ?";
        var inserts = [req.params.siid];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    return router;
}();
