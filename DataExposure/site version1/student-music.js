module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getStudentsMusic(res, mysql, context, complete){
        var sql = "SELECT sm.id, sm.sid, sm.mid, m.title, m.composer, s.fname, s.lname, b.name as bandname, sm.note \
             FROM student_music as sm \
             LEFT JOIN music AS m ON sm.mid = m.id \
             LEFT JOIN students AS s ON sm.sid = s.id \
             LEFT JOIN bands as b ON s.bid = b.id \
             ORDER BY m.title";
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.student_music = results;
            complete();
        });
    }

    function getStudentMusic(res, mysql, context, id, complete){
        var sql = "SELECT sm.id, sm.sid, sm.mid, m.title, m.composer, s.fname, \
                  s.lname, b.name as bandname, sm.note FROM student_music as sm \
                  LEFT JOIN music AS m ON sm.mid = m.id \
                  LEFT JOIN students AS s ON sm.sid = s.id \
                  LEFT JOIN band_music as bm ON m.id = bm.mid \
                  LEFT JOIN bands as b ON bm.bid = b.id \
                  WHERE sm.id = ? ORDER BY m.title";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.student_music = results[0];
            complete();
        });
    }

    function getAllStudents(res, mysql, context, complete){
        var sql = "SELECT id, fname, lname FROM students ORDER BY lname, fname";
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.all_students = results;
            complete();
        });
    }

    function getAllMusic(res, mysql, context, complete){
        var sql = "SELECT id, title, composer FROM music ORDER BY title";
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.all_music = results;
            complete();
        });
    }

    /*Display all students. Requires web based javascript to delete users with AJAX*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletestudentmusic.js"];
        var mysql = req.app.get('mysql');
        getStudentsMusic(res, mysql, context, complete);
        getAllStudents(res, mysql, context, complete);
        getAllMusic(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('student-music', context);
            }

        }
    });

    /* Display one student for the specific purpose of updating students */

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updatestudentmusic.js"];
        var mysql = req.app.get('mysql');
        getStudentMusic(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-student-music', context);
            }
        }
    });

    /* Adds a student, redirects to the students page after adding */

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO student_music (sid, mid, note) VALUES (?,?,?)";
        var inserts = [req.body.sid, req.body.mid, req.body.note];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/test_site/student-music');
            }
        });
    });

    /* The URI that update data is sent to in order to update a student */
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE student_music SET sid=?, mid=?, note=? WHERE id=?";
        var inserts = [req.body.sid, req.body.mid, req.body.note, req.params.id];
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

    /* Route to delete a student, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM student_music WHERE id = ?";
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

    return router;
}();
