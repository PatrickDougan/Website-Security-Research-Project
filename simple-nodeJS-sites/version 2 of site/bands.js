module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getBands(res, mysql, context, complete){
        mysql.pool.query("SELECT id, name, director_fname, director_lname FROM bands", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.bands = results;
            complete();
        });
    }

    function getBand(res, mysql, context, id, complete){
        var sql = "SELECT id, name, director_fname, director_lname FROM bands WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.bands = results[0];
            complete();
        });
    }

    function getBandMusic(res, mysql, context, id, complete){
        var sql = "SELECT m.id, m.title, m.composer, bm.id as bmid, bm.bid as bid FROM band_music AS bm LEFT JOIN bands AS b ON b.id = bm.id LEFT JOIN music as m ON bm.mid = m.id WHERE bid = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
/*
        mysql.pool.query("SELECT m.id, m.title, m.composer, bm.id as bmid, bm.bid as bid FROM band_music AS bm LEFT JOIN bands AS b ON b.id = bm.id LEFT JOIN music as m ON bm.mid = m.id WHERE bid = ?", function(error, results, fields){
*/
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.music = results;
            complete();
        });
    }

    function getAvailableMusic(res, mysql, context, complete){
        var sql = "SELECT m.id, m.title, m.composer, bm.id as bmid FROM music AS m LEFT JOIN band_music AS bm ON m.id = bm.mid WHERE bm.id IS NULL";
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.available_music = results;
            complete();
        });
    }

    /*Display all bands. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteband.js"];
        var mysql = req.app.get('mysql');
        getBands(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('bands', context);
            }

        }
    });

    /* Display one band for the specific purpose of updating bands */

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateband.js","deleteassignment.js"];
        var mysql = req.app.get('mysql');
        getBand(res, mysql, context, req.params.id, complete);
        getBandMusic(res, mysql, context, req.params.id, complete);
        getAvailableMusic(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('update-band', context);
            }
        }
    });

    /* Adds a band, redirects to the bands page after adding */

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO bands (name, director_fname, director_lname) VALUES (?,?,?)";
        var inserts = [req.body.name, req.body.director_fname, req.body.director_lname];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/test_site2/bands');
            }
        });
    });

    /* The URI that update data is sent to in order to update a band */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE bands SET name=?, director_fname=?, director_lname=? WHERE id=?";
        var inserts = [req.body.name, req.body.director_fname, req.body.director_lname, req.params.id];
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

    /* Route to delete a band, simply returns a 202 upon success. Ajax will handle this. */

/* original:    router.delete('/:id', function(req, res){    */
    router.delete('/test_site2/bands/:id', function(req, res){   /* volz - test this */
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM bands WHERE id = ?";
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


    /* Route to delete a band, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/remove_assignment/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM band_music WHERE id = ?";
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
