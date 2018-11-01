/****************************************************************************
 * Author: Tristan Santiago                                                  *
 * Title: script.js                                                          *
 * Date: 6/4/2018                                                            *
 * Description: script.js contains the definitions for the methods used to   *
 * insert, delete, and edit information into the database.
 ****************************************************************************/
/****************************************************************************
 *             function addRow(name, reps, weight, date, lbs)                *
 * This function takes five parameters, the information to be inserted into  *
 * the database, and performs simple name validation to make sure the user   *
 * doesn't enter an empty string.                                            *
 ****************************************************************************/
function addRow(name, reps, weight, date, lbs) {
    // Name field validation. If name == empty string:
    if (name == "") {
        // Send an alert to the user.
        alert("Name cannot be blank. Please enter a name.");
        // Do not store the empty string as the name.
        return false;
    }

    // Reset the form.  
    document.getElementById("insertForm").reset();

    // Boilerplate code from earlier lectures modified and used to send data.
    var req = new XMLHttpRequest();
    // GET request.
    req.open("GET", "/insert?name=" + name + "&reps=" + reps + "&weight=" + weight + "&date=" + date + "&lbs=" + lbs, true);
    // Boilerplate code.
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            var responseValues = JSON.parse(req.responseText);

            // Store the user's input into variables to be used later.
            var id = responseValues.id;
            name = responseValues.name;
            weight = responseValues.weight;
            date = responseValues.date;
            lbs = responseValues.lbs;

            // Assign HTML table to table variable.
            var table = document.getElementById("table");
            // Assign HTML row to row variable.
            var row = document.createElement("tr");
            // Add unique IDs to each row.
            row.setAttribute("id", id);
            // Define table values.
            var values = [name, reps, weight, date, lbs];

            // Create table cells.
            for (var i = 0; i <= 4; i++) {
                var cell = document.createElement("td");
                cell.textContent = values[i];
                row.append(cell);
            }

            // Create Edit button 
            // var dcell = document.createElement("td");
            var ucell = document.createElement("td");
            // var deleteBtn = document.createElement("button");
            var updateBtn = document.createElement("button");
            //deleteBtn.textContent = "Edit";
            updateBtn.textContent = "Edit";
            // deleteBtn.setAttribute("onclick", "updater(" + id + ")");
            updateBtn.setAttribute("onclick", "updateRow(" + id + ")");
            // dcell.append(deleteBtn);
            ucell.append(updateBtn);
            // row.append(dcell);
            row.append(ucell);

            // Create Delete button.
            // var ucell = document.createElement("td");
            var dcell = document.createElement("td");
            // var updateBtn = document.createElement("button");
            var deleteBtn = document.createElement("button");
            // updateBtn.textContent = "Delete";
            deleteBtn.textContent = "Delete";
            // updateBtn.setAttribute("onclick", "deleteRow(" + id + ")");
            deleteBtn.setAttribute("onclick", "deleteRow(" + id + ")");
            // ucell.append(updateBtn);
            dcell.append(deleteBtn);
            // row.append(ucell);
            row.append(dcell);

            table.append(row);

            console.log("Exercise successfully entered into database");
        } else {
            console.log("There was an error inserting the exercise.");
        }
    });

    req.send(null);
    event.preventDefault();
}

/****************************************************************************
 *                            function deleteRow(id)                         *
 * Since we do not need to preserve any information when a user wishes to    *
 * delete a row, we only use one parameter, the unique ID assigned to each   *
 * row when it is created, to delete all of the row's contents and remove    *
 * all of the row's information from the database.                           *
 ****************************************************************************/
function deleteRow(id) {
    // First delete the HTML row from the table. 
    var row = document.getElementById(id);
    row.parentNode.removeChild(row);

    // Start a new request to send the data.
    var req = new XMLHttpRequest();
    // Use a GET request to delete the row's information from the database.
    req.open("GET", "/delete?id=" + id, true);
    // Boilerplate eventListener code.
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            // Console logging for debugging.
            console.log("Exercise successfully removed from database.");
        } else {
            console.log("There was an error deleting the exercise.");
        }
    });

    req.send(null);
    event.preventDefault();
}

/****************************************************************************
 *                            function updateRow(id)                           *
 * This function provides the update form with default empty values and      *
 * unique IDs.                                                               *
 ****************************************************************************/
function updateRow(id) {
    // Enable the update button by default.
    document.getElementById("updateBtn").disabled = false;

    // Set the fields with table values.
    var fields = document.getElementById("updateFields").elements;
    for (var i = 0; i <= 4; i++) {
        fields[i].value = document.getElementById(id).children[i].textContent;
    }

    // Set the checkbox state.
    if (fields[4].value == "1") {
        fields[4].checked = true;
    } else {
        fields[4].checked = false;
    }

    // Set the hidden ID field. 
    fields[5].value = id;
}
/****************************************************************************
 *             function updateGet(id, name, reps, weight, date, lbs)         *
 * When called this function takes five parameters (the data table info) and *
 * updates the database and client.                                           *
 ****************************************************************************/
function updateGet(id, name, reps, weight, date, lbs) {
    // Simple name validation. If name == empty  string:
    if (name == "") {
        // Send an alert to the user:
        alert("Name cannot be blank. Please enter a name.");
        return false;
    }
    document.getElementById("updateForm").reset(); // Reset form.
    document.getElementById("updateBtn").disabled = true; // Reset button.  
    // Send data modified from boilerplate code from earlier lectures.
    var req = new XMLHttpRequest(); // New request.
    // GET request for updating the database.
    req.open("GET", "/update?name=" + name + "&reps=" + reps + "&weight=" + weight + "&date=" + date + "&lbs=" + lbs + "&id=" + id, true);

    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            var responseVals = JSON.parse(req.responseText)[0];
            var row = document.getElementById(id).children;

            // Set the table values from user's input.
            row[0].textContent = responseVals.name;
            row[1].textContent = responseVals.reps;
            row[2].textContent = responseVals.weight;
            row[3].textContent = responseVals.date;
            row[4].textContent = responseVals.lbs;

            console.log("The update was sucessful.");
        } else {
            console.log("There was an error with updating.");
        }
    });

    req.send(null);
    event.preventDefault();

}

// Set the checkbox value.
function clicker(node) {
    if (node.value == "1") {
        node.value = 0;
    } else {
        node.value = 1;
    }
}
