module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getMusic(res, mysql, context, complete){
        var sql = "SELECT m.id, m.title, m.composer, m.temp_bpm, m.difficulty, b.name \
                   as assigned_band, bm.id as bmid, b.id as bid FROM music AS m \
                   LEFT JOIN band_music AS bm ON m.id = bm.mid \
                   LEFT JOIN bands as b ON bm.bid = b.id \
                   WHERE difficulty >= 0 ORDER BY title";
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.music = results;
            complete();
        });
    }

    function getPiece(res, mysql, context, id, complete){
        var sql = "SELECT id, title, composer, temp_bpm, difficulty FROM music WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.piece = results[0];
            complete();
        });
    }

    /*Display all music. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletepiece.js"];
        var mysql = req.app.get('mysql');
        getMusic(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('music', context);
            }

        }
    });

    /* Display one piece for the specific purpose of updating music */

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updatepiece.js"];
        var mysql = req.app.get('mysql');
        getPiece(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-piece', context);
            }
        }
    });

    /* Adds a piece, redirects to the music page after adding */

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO music (title, composer, temp_bpm, difficulty) VALUES (?,?,?,?)";
        var inserts = [req.body.title, req.body.composer, req.body.temp_bpm, req.body.difficulty];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/test_site/music');
            }
        });
    });

    /* update a piece */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE music SET title=?, composer=?, temp_bpm=?, difficulty=? WHERE id=?";
        var inserts = [req.body.title, req.body.composer, req.body.temp_bpm, req.body.difficulty, req.params.id];
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

    /* Route to delete a piece, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM music WHERE id = ?";
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
