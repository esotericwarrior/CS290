document.addEventListener("DOMContentLoaded", loadTable);
// document.addEventListener("champWiki", loadChampTable);

function loadTable() {
	//https://www.w3schools.com/jquery/ajax_ajax.asp
    $.ajax({
        type: 'GET',
        url: "http://flip3.engr.oregonstate.edu:42054/get-players",
        success: function (player) {
            drawRows(player);
        }
    })

}

 $(document).ready(function() {
      if (window.location.pathuserID == '/edit-row') {
        var playerID = Number(window.location.search.substring(10, window.location.search.length));
        $.ajax({
            type: 'GET',
            url: "http://flip3.engr.oregonstate.edu:42054/get-a-player?playerID=" + playerID,
            success: function (data) {
                var rowData = JSON.parse(data)[0];
                document.getElementById("userID").value = rowData.userID;
                document.getElementById("email").value = rowData.email;
                document.getElementById("server").value = rowData.server;
                document.getElementsByTagName("div").playerID = playerID;
            }
        })
    }
 })


function drawRows(player) {
    var obj = JSON.parse(player.results);
    if (player != 0)
    {
        for (var i = 0; i < obj.length; i++){
        var row = $("<tr playerID=" + obj[i].playerID + "/>");
        $("#table").append(row);
        row.append($("<td>" + obj[i].userID + "</td>"));
        row.append($("<td>" + obj[i].server + "</td>"));
        row.append($("<td>" + obj[i].email + "</td>"));
        // row.append($('<td><input type="submit" value="Edit" onclick="edit(' + obj[i].playerID + ')"/>' +
        // '<input type="submit" value="Delete" onclick="deleteRow(' + obj[i].playerID + ')"/></td>'));

        row.append($('<td><input type="button" class="edit_button" id="edit_button<?php echo $row['+ obj[i].playerID +'];?>" value="Edit" onclick="edit-row('+ obj[i].playerID +')"/>' +
        '<input type="button" class="save_button" id="save_button<?php echo $row['+ obj[i].playerID +'];?>" value="Save" onclick="save_row("<?php echo $row['+ obj[i].playerID +'];?>' +
        '<input type="button" class="delete_button" id="delete_button<?php echo $row['+ obj[i].playerID +'];?>" value="Delete" onclick="deleteRow('+ obj[i].playerID +')"/></td>'));
        }
    }

}





function edit(id) {
    $.ajax({
        type: 'GET',
        url: "http://flip3.engr.oregonstate.edu:46968/get-a-workout?id=" + id,
        success: function (data) {
            var rowData = JSON.parse(data)[0];            
            window.location = "http://flip3.engr.oregonstate.edu:46968/edit-row?id=" + rowData.id;
            
        }
    })
}

function loadChampTable() {
	//https://www.w3schools.com/jquery/ajax_ajax.asp3
				console.log("loadChampTable1");
    $.ajax({
        url: "http://flip3.engr.oregonstate.edu:42054/get-champs",
        success: function (champ) {
            drawChampRows(champ);
            console.log("loadChampTable2");
            // Made a change here:
            // form.myButton.disabled = true;
            // return true;
        }
    })
}


function drawChampRows(champ) {
    var obj = JSON.parse(champ.results);
    if (champ != 0)
    {
        for (var i = 0; i < obj.length; i++){
        var row = $("<tr champID=" + obj[i].champID + "/>");
        $("#champTable").append(row);
        row.append($("<td>" + obj[i].champName + "</td>"));
        row.append($("<td>" + obj[i].atk + "</td>"));
        row.append($("<td>" + obj[i].def + "</td>"));

        // row.append($('<td><input type="button" class="edit_button" id="edit_button<?php echo $row['+ obj[i].champID +'];?>" value="Edit" onclick="edit_row("<?php echo $row['+ obj[i].champID +'];?>' +
        // '<input type="button" class="save_button" id="save_button<?php echo $row['+ obj[i].champID +'];?>" value="Save" onclick="save_row("<?php echo $row['+ obj[i].champID +'];?>' +
        // '<input type="button" class="delete_button" id="delete_button<?php echo $row['+ obj[i].champID +'];?>" value="Delete" onclick="deleteChampRow('+ obj[i].champID +')"/></td>'));
        }
    }

}


function loadStatTable() {
	//https://www.w3schools.com/jquery/ajax_ajax.asp
    $.ajax({
        type: 'GET',
        url: "http://flip3.engr.oregonstate.edu:42054/get-stats",
        success: function (playerTeam) {
            drawStatRows(playerTeam);
        }
    })
}

function drawStatRows(playerTeam) {
    var obj = JSON.parse(playerTeam.results);
    if (playerTeam != 0)
    {
        for (var i = 0; i < obj.length; i++){
        var row = $("<tr playerTeamID=" + obj[i].playerTeamID + "/>");
        $("#statTable").append(row);
        row.append($("<td>" + obj[i].playerName + "</td>"));
        row.append($("<td>" + obj[i].team + "</td>"));
        row.append($("<td>" + obj[i].playerKills + "</td>"));
        row.append($("<td>" + obj[i].playerDeaths + "</td>"));
        row.append($("<td>" + obj[i].teamKills + "</td>"));
        row.append($("<td>" + obj[i].teamDeaths + "</td>"));
        row.append($("<td>" + obj[i].barons + "</td>"));
        row.append($("<td>" + obj[i].champBan + "</td>"));
        row.append($("<td>" + obj[i].champPlay + "</td>"));

        // row.append($('<td><input type="button" class="edit_button" id="edit_button<?php echo $row['+ obj[i].champID +'];?>" value="Edit" onclick="edit_row("<?php echo $row['+ obj[i].champID +'];?>' +
        // '<input type="button" class="save_button" id="save_button<?php echo $row['+ obj[i].champID +'];?>" value="Save" onclick="save_row("<?php echo $row['+ obj[i].champID +'];?>' +
        // '<input type="button" class="delete_button" id="delete_button<?php echo $row['+ obj[i].champID +'];?>" value="Delete" onclick="deleteChampRow('+ obj[i].champID +')"/></td>'));
        }
    }

}

// document.getElementById('call_stats').onclick = function() {
    // this.disabled = true;
// }


function loadGameTable() {
	//https://www.w3schools.com/jquery/ajax_ajax.asp3
    $.ajax({
        url: "http://flip3.engr.oregonstate.edu:42054/get-games",
        success: function (game) {
            drawGameRows(game);
        }
    })
}


function drawGameRows(game) {
    var obj = JSON.parse(game.results);
    if (game != 0)
    {
        for (var i = 0; i < obj.length; i++){
        var row = $("<tr gameID=" + obj[i].gameID + "/>");
        $("#gameTable").append(row);
        row.append($("<td>" + obj[i].team1ID + "</td>"));
        row.append($("<td>" + obj[i].team2ID + "</td>"));
        row.append($("<td>" + obj[i].winningTeamID + "</td>"));
        }
    }

}

function loadTeamTable() {
	//https://www.w3schools.com/jquery/ajax_ajax.asp3
    $.ajax({
        url: "http://flip3.engr.oregonstate.edu:42054/get-teams",
        success: function (team) {
            drawTeamRows(team);
        }
    })
}


function drawTeamRows(team) {
    var obj = JSON.parse(team.results);
    if (team != 0)
    {
        for (var i = 0; i < obj.length; i++){
        var row = $("<tr teamID=" + obj[i].teamID + "/>");
        $("#teamTable").append(row);
        row.append($("<td>" + obj[i].teamID + "</td>"));
        row.append($("<td>" + obj[i].teamColor + "</td>"));
        }
    }

}

function submit () {
    var userID = $('#userID').val();
    var server = $('#server').val();
    var email = $('#email').val();
    var data = { playerID: null, userID: userID, server: server, email: email };
    $.ajax({
        type: 'GET',
        url: "http://flip3.engr.oregonstate.edu:42054/submit?userID=" + userID + "&server=" + server + "&email=" + email,
        success: function (playerID) {
            data.playerID = playerID;
            drawRow(data);
        }
    })
}


function submit_champ () {
    var champName = $('#champName').val();
    var atk = $('#atk').val();
    var def = $('#def').val();
    var data = { champID: null, champName: champName, atk: atk, def: def };
    $.ajax({
        type: 'GET',
        url: "http://flip3.engr.oregonstate.edu:42054/submit_champ?champName=" + champName + "&atk=" + atk + "&def=" + def,
        success: function (champID) {
            data.champID = champID;
            drawChampRow(data);
        }
    })
}

function submit_game () {
    var team1ID = $('#team1ID').val();
    var team2ID = $('#team2ID').val();
    var winningTeamID = $('#winningTeamID').val();
    var data = { gameID: null, team1ID: team1ID, team2ID: team2ID, winningTeamID: winningTeamID };
    $.ajax({
        type: 'GET',
        url: "http://flip3.engr.oregonstate.edu:42054/submit_game?team1ID=" + team1ID + "&team2ID=" + team2ID + "&winningTeamID=" + winningTeamID,
        success: function (gameID) {
            data.gameID = gameID;
            drawGameRow(data);
        }
    })
}

function submit_team () {
    var teamColor = $('#teamColor').val();
    var data = { teamID: null, teamColor: teamColor };
    $.ajax({
        type: 'GET',
        url: "http://flip3.engr.oregonstate.edu:42054/submit_team?teamColor=" + teamColor,
        success: function (teamID) {
            data.teamID = teamID;
            drawTeamRow(data);
        }
    })
}

function submit_pt() {
    var pt_userID = $('#pt_userID').val();
    var team = $('#team').val();
    var playerKills = $('#playerKills').val();
    var playerDeaths = $('#playerDeaths').val();
    var teamKills = $('#teamKills').val();
    var teamDeaths = $('#teamDeaths').val();
    var barons = $('#barons').val();
    var champBan = $('#champBan').val();
    var champPlay = $('#champPlay').val();
    var data = { playerTeamID: null, pt_userID: pt_userID, team: team, playerKills: playerKills, playerDeaths: playerDeaths, teamKills: teamKills, teamDeaths: teamDeaths, barons: barons, champBan: champBan, champPlay: champPlay };
    $.ajax({
        type: 'GET',
        url: "http://flip3.engr.oregonstate.edu:42054/submit_pt?pt_userID=" + pt_userID + "&team=" + team + "&playerKills=" + playerKills + "&playerDeaths=" + playerDeaths + "&teamKills=" + teamKills + "&teamDeaths=" + teamDeaths + "&barons=" + barons + "&champBan=" + champBan + "&champPlay=" + champPlay,
        success: function (playerTeamID) {
            data.playerTeamID = playerTeamID;
            //drawPTRow(data);
        }
    })
}

function submit_search() {
    var userID = $('#userID').val();
    // var search_server = $('#search_server').val();
    // var search_email = $('#search_email').val();
    var data = { playerID: null, userID: userID };
    // var data = { search_playerID: null, search_userID: search_userID, search_server: search_server, search_email: search_email };

    $.ajax({
        type: 'GET',
        url: "http://flip3.engr.oregonstate.edu:42054/submit_search?userID" + userID,
        // url: "http://flip3.engr.oregonstate.edu:42054/submit_search?userID=" + search_userID + "&server=" + search_server + "&email=" + search_email,

        success: function (playerID) {
            data.playerID = playerID;
            drawSearchRow(data);
        }
    })
}

function drawRow(rowData) {
    var row = $("<tr playerID=" + rowData.playerID + "/>");
    $("#table").append(row);
    row.append($("<td>" + rowData.userID + "</td>"));
    row.append($("<td>" + rowData.server + "</td>"));
    row.append($("<td>" + rowData.email + "</td>"));
    row.append($('<td><input type="submit" value="Edit" onclick="edit(' + rowData.playerID + ')"/>' +
        '<input type="submit" value="Delete" onclick="deleteRow(' + rowData.playerID + ')"/></td>'));
}

function drawChampRow(rowData) {
    var row = $("<tr champID=" + rowData.champID + "/>");
    $("#champTable").append(row);
    row.append($("<td>" + rowData.champName + "</td>"));
    row.append($("<td>" + rowData.atk + "</td>"));
    row.append($("<td>" + rowData.def + "</td>"));
}

function drawGameRow(rowData) {
    var row = $("<tr gameID=" + rowData.gameID + "/>");
    $("#gameTable").append(row);
    row.append($("<td>" + rowData.team1ID + "</td>"));
    row.append($("<td>" + rowData.team2ID + "</td>"));
    row.append($("<td>" + rowData.winningTeamID + "</td>"));
}

function drawTeamRow(rowData) {
    var row = $("<tr teamID=" + rowData.teamID + "/>");
    $("#teamTable").append(row);
    row.append($("<td>" + rowData.teamID + "</td>"));
    row.append($("<td>" + rowData.teamColor + "</td>"));
}

function drawPTRow(rowData) {
    var row = $("<tr playerTeamID=" + rowData.playerTeamID + "/>");
    $("#statTable").append(row);
    row.append($("<td>" + rowData.userID + "</td>"));
    row.append($("<td>" + rowData.team + "</td>"));
    row.append($("<td>" + rowData.playerKills + "</td>"));
    row.append($("<td>" + rowData.playerDeaths + "</td>"));
    row.append($("<td>" + rowData.teamKills + "</td>"));
    row.append($("<td>" + rowData.teamDeaths + "</td>"));
    row.append($("<td>" + rowData.barons + "</td>"));
    row.append($("<td>" + rowData.champBan + "</td>"));
    row.append($("<td>" + rowData.champPlay + "</td>"));
}

function drawSearchRow(rowData) {
    var row = $("<tr playerID=" + rowData.playerID + "/>");
    $("#searchTable").append(row);
    row.append($("<td>" + rowData.userID + "</td>"));
    row.append($("<td>" + rowData.server + "</td>"));
    row.append($("<td>" + rowData.email + "</td>"));
    row.append($('<td><input type="submit" value="Edit" onclick="edit(' + rowData.playerID + ')"/>' +
        '<input type="submit" value="Delete" onclick="deleteRow(' + rowData.playerID + ')"/></td>'));
}

function save() {
    var userID = $('#userID').val();
    var playerID = document.getElementsByTagName('div').playerID;
    $.ajax({
        type: 'GET',
        url: "http://flip3.engr.oregonstate.edu:42054/edit-save?userID=" + userID,
        success: function () {
            window.location = "http://flip3.engr.oregonstate.edu:42054/player-found";
        }
    });
}



function edit(playerID) {
    $.ajax({
        type: 'GET',
        url: "http://flip3.engr.oregonstate.edu:42054/get-a-player?playerID=" + playerID,
        success: function (data) {
            var rowData = JSON.parse(data)[0];            
            window.location = "http://flip3.engr.oregonstate.edu:42054/edit-row?playerID=" + rowData.playerID;
        }
    })
}

function deleteRow(playerID) {
    $.ajax({
        type: 'GET',
        url: "http://flip3.engr.oregonstate.edu:42054/delete?playerID=" + playerID,
        success: function () {
            $("#" + playerID).remove();
            window.location = "http://flip3.engr.oregonstate.edu:42054/";
        }
    });
}
