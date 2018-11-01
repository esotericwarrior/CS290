
document.addEventListener("DOMContentLoaded", loadChampTable);
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
        url: "http://flip3.engr.oregonstate.edu:42054/champWiki",
        success: function (champ) {
            drawRows(champ);
			console.log("loadChampTable2");
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

function drawRow(rowData) {
    var row = $("<tr playerID=" + rowData.playerID + "/>");
    $("#table").append(row);
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
