module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getBandNames(res, mysql, context, complete){
        mysql.pool.query("SELECT id, name FROM bands", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.bands  = results;
            complete();
        });
    }

    function getStudents(res, mysql, context, complete){
        var sql = "SELECT s.id, s.fname, s.lname, s.studentid, s.grade, bands.name AS my_band, i.type AS my_itype, i.manufacturer as my_imfgr, i.id as my_iid FROM students AS s INNER JOIN bands ON bid = bands.id LEFT JOIN student_instrument AS si ON s.id = si.sid LEFT JOIN instruments as i ON si.iid = i.id WHERE bid ORDER BY s.lname,s.fname";
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.students = results;
            complete();
        });
    }

    function getStudentsFilter(res, mysql, context, filter_id, complete){
        var sql = "SELECT s.id, s.fname, s.lname, s.studentid, s.grade, bands.name AS my_band, i.type AS my_itype, i.manufacturer as my_imfgr, i.id as my_iid FROM students AS s INNER JOIN bands ON bid = bands.id LEFT JOIN student_instrument AS si ON s.id = si.sid LEFT JOIN instruments as i ON si.iid = i.id WHERE bid LIKE ? ORDER BY s.lname,s.fname";
        var inserts = [filter_id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.students = results;
            complete();
        });
    }

    function getStudent(res, mysql, context, id, complete){
        var sql = "SELECT id, fname, lname, studentid, grade, bid FROM students WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.student = results[0];
            complete();
        });
    }

    /*Display all students. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletestudent.js"];
        var mysql = req.app.get('mysql');
        if (req.query.filter_band) {
          getStudentsFilter(res, mysql, context, req.query.filter_band, complete);
        } else {
          getStudents(res, mysql, context, complete);
        }
        getBandNames(res, mysql, context, complete);
/*      getStudents(res, mysql, context, complete);  */
/*      getStudentsFilter(res, mysql, context, req.query.filter_band, complete);    */
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('students', context);
            }

        }
    });

    /* Display one student for the specific purpose of updating students */

    router.get('/:id', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedband.js", "updatestudent.js"];
/*      context.jsscripts = ["updatestudent.js"];     */
        var mysql = req.app.get('mysql');
        getStudent(res, mysql, context, req.params.id, complete);
        getBandNames(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-student', context);
            }
        }
    });

    /* Adds a student, redirects to the students page after adding */

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO students (fname, lname, studentid, grade, bid) VALUES (?,?,?,?,?)";
        var inserts = [req.body.fname, req.body.lname, req.body.studentid, req.body.grade, req.body.my_band];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/test_site/students');
            }
        });
    });

    /* The URI that update data is sent to in order to update a student */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE students SET fname=?, lname=?, studentid=?, grade=?, bid=? WHERE id=?";
        var inserts = [req.body.fname, req.body.lname, req.body.studentid, req.body.grade, req.body.my_band, req.params.id];
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
        var sql = "DELETE FROM students WHERE id = ?";
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
