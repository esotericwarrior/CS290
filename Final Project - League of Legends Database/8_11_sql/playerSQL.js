var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser')

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 42054);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));

app.get('/',function(req,res,next){
    res.render('home');
});

app.get('/get-players', function(req, res) {
  var content = {};
  mysql.pool.query('SELECT * FROM player', function(err, rows, fields) {
      if (err) {
        next(err);
        return;
      }
      content.results = JSON.stringify(rows);
      res.send(content);
  });
});

app.get('/loadChamps', function(req, res) {
      res.render('champWiki');
	  			console.log("loadChamps render champWiki");

  });
  
 app.get('/champWiki', function(req, res){
  var content = {};
  mysql.pool.query('SELECT * FROM champ', function(err, rows, fields) {
      if (err) {
        next(err);
        return;
      }
	  	  res.render('champWiki')

      content.results = JSON.stringify(rows);
      res.send(content);
  });
});

app.get('/get-champs', function(req, res) {
  var content = {};
  mysql.pool.query('SELECT * FROM champ', function(err, rows, fields) {
      if (err) {
        next(err);
        return;
      }
	  			console.log("get-champs");

	  content.results = JSON.stringify(rows);
      res.send(content);
  });
});



// mysql.pool.query('SELECT p.userID as "Player Name" ' +
	// ',t.teamColor as "Team" ' +
	// ',playerKills as "Player Kills" ' +
	// ',playerDeaths as "Player Deaths" ' +
	// ',teamKills as "Team Kills" ' +
	// ',teamDeaths as "Team Deaths" ' +
	// ',barons as "Baron Kills" ' +
	// ',c1.champName as "Champion Banned" ' +
	// ',c2.champName as "Champion Played" ' +
	// 'from ' +
	// 'playerTeam pt ' +
	// 'INNER JOIN player p ' +
	// 'on p.playerID = pt.playerID  ' +
	// 'INNER JOIN team t ' +
	// 'on t.teamID = pt.teamID ' +
	// 'INNER JOIN champ c1 ' +
	// 'on c1.champID = pt.champBanID ' +
	// 'INNER JOIN champ c2 ' +
	// 'on c2.champID = pt.champPlayID;', function(err, rows, fields) {
		
app.get('/get-stats', function(req, res) {
  var content = {};
  mysql.pool.query('SELECT p.userID as "playerName" ,t.teamColor as "team" ,playerKills ,playerDeaths ,teamKills ,teamDeaths ,barons ,c1.champName as "champBan" ,c2.champName as "champPlay" from playerTeam pt INNER JOIN player p on p.playerID = pt.playerID  INNER JOIN team t on t.teamID = pt.teamID INNER JOIN champ c1 on c1.champID = pt.champBanID INNER JOIN champ c2 on c2.champID = pt.champPlayID;', function(err, rows, fields) {
      if (err) {
        next(err);
        return;
      }
      content.results = JSON.stringify(rows);
      res.send(content);
  });
});

app.get('/get-games', function(req, res) {
  var content = {};
  mysql.pool.query('SELECT * FROM game', function(err, rows, fields) {
      if (err) {
        next(err);
        return;
      }
	  			console.log("Games Got");

	  content.results = JSON.stringify(rows);
      res.send(content);
  });
});

app.get('/get-teams', function(req, res) {
  var content = {};
  mysql.pool.query('SELECT * FROM team', function(err, rows, fields) {
      if (err) {
        next(err);
        return;
      }
	  			console.log("Teams Got");

	  content.results = JSON.stringify(rows);
      res.send(content);
  });
});

app.get('/get-a-player', function(req, res) {
  var content = {};
  mysql.pool.query('SELECT * FROM player WHERE playerID=?', [req.query.playerID], function(err, rows, fields) {
      if (err) {
        next(err);
        return;
      }
      content.results = JSON.stringify(rows);
      res.send(content.results);
  });
});

app.get('/player-search', function(req, res) {
      res.render('playerSearch');
  });

app.get('/submit',function(req,res,next){
  if (req.query.userID != ''){
    var context = {};
    mysql.pool.query("INSERT INTO player (`userID`, `server`, `email`) VALUES (?,?,?)",
    [req.query.userID, req.query.server, req.query.email],
    function(err, result){
      if(err){
        next(err);
        return;
      }
      console.log("Inserted playerID " + result.insertId);
      res.status(200).json(result.insertId);
    });
  }

});

app.get('/submit_champ',function(req,res,next){
  if (req.query.champName != ''){
    var context = {};
    mysql.pool.query("INSERT INTO champ (`champName`, `atk`, `def`) VALUES (?,?,?)",
    [req.query.champName, req.query.atk, req.query.def],
    function(err, result){
      if(err){
        next(err);
        return;
      }
      console.log("Inserted champ " + result.insertId);
      res.status(200).json(result.insertId);
    });
  }

});

app.get('/submit_game',function(req,res,next){
  if (req.query.team1ID != ''){
    var context = {};
    mysql.pool.query("INSERT INTO game (`team1ID`, `team2ID`, `winningTeamID`) VALUES (?,?,?)",
    [req.query.team1ID, req.query.team2ID, req.query.winningTeamID],
    function(err, result){
      if(err){
        next(err);
        return;
      }
      console.log("Inserted game " + result.insertId);
      res.status(200).json(result.insertId);
    });
  }

});

app.get('/submit_team',function(req,res,next){
  if (req.query.teamColor != ''){
    var context = {};
    mysql.pool.query("INSERT INTO team (`teamColor`) VALUES (?)",
    [req.query.teamColor],
    function(err, result){
      if(err){
        next(err);
        return;
      }
      console.log("Inserted team " + result.insertId);
      res.status(200).json(result.insertId);
    });
  }

});

app.get('/submit_pt',function(req,res,next){
  if (req.query.pt_userID != ''){
    var context = {};
    mysql.pool.query("INSERT INTO playerTeam (`playerID`, `teamID`, `playerKills`, `playerDeaths`, `teamKills`, `teamDeaths`, `barons`, `champBanID`, `champPlayID`) VALUES (?,?,?,?,?,?,?,?,?)",
    [req.query.pt_userID, req.query.team, req.query.playerKills, req.query.playerDeaths, req.query.teamKills, req.query.teamDeaths, req.query.barons, req.query.champBan, req.query.champPlay],
    function(err, result){
      if(err){
        next(err);
        return;
      }
      console.log("Inserted player team " + result.insertId);
      //res.status(200).json(result.insertId);
            });
  }

});

app.get('/submit_search',function(req,res){
    var content = {};
    mysql.pool.query('SELECT * FROM player WHERE userID like "%?%";', [req.query.userID],
    function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      content.results = JSON.stringify(rows);
      res.send(content.results);
    });
  }

);

app.get('/delete',function(req,res,next){
  var context = {};
  mysql.pool.query("CALL deletePlayer(?" + ");", [req.query.playerID], function(err, result){
    if(err){
      next(err);
      return;
    }
    res.render('home');
  });
});


app.get('/edit-row', function(req, res) {
      res.render('playerSearch');
  });


app.get('/edit-save',function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT * FROM player WHERE userID like '%?" + "%';", [req.query.playerID], function(err, result){
    if(err){
      next(err);
      return;
    }
	        res.render('playerFound');
			content.results = JSON.stringify(rows);
			res.send(content.results);
  });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.listen(app.get('port'), function(){
  console.log('Express started on http://flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});