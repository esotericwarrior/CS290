/****************************************************************************
** Author: Tristan Santiago                                                 *
** Title: script.js                                                         *
** Date: 5/6/2018                                                           *
** Description: This program creates a table that allows the user to        *
* navigate through the table with a set of buttons labeled UP, DOWN, LEFT,  *
* RIGHT. Using the MARK button, the user can "mark" the current cell with a *
* yellow background.                                                        *
****************************************************************************/
// Variable Definitions
var table, UP, DOWN, LEFT, RIGHT, MARK;
var currentRow = 1;
var currentColumn = 1;
/************************************************************************************
*                                 printButtons                                      *
* This function calls the createButton function for each global variable (UP, DOWN, *
* LEFT, RIGHT, and MARK) and then prints them to the screen.                        *
************************************************************************************/
function printButtons()
{
// Create the buttons by calling the createButton function and assigning the value to
// the specific variable definitions.
UP = createButton("Up");                                            // Create UP button.
DOWN = createButton("Down");                                        // Create DOWN button.
LEFT = createButton("Left");                                        // Create LEFT button.
RIGHT = createButton("Right");                                      // Create RIGHT button.
MARK = createButton("Mark Cells");                                  // Create MARK button.

// Print the buttons on the page.
document.body.appendChild(UP);                                      // Add UP button.
document.body.appendChild(DOWN);                                    // Add DOWN button.
document.body.appendChild(LEFT);                                    // Add LEFT button.
document.body.appendChild(RIGHT);                                   // Add RIGHT button.
document.body.appendChild(document.createElement('br'));            // Add line break.
document.body.appendChild(document.createElement('br'));            // Add line break.
document.body.appendChild(MARK);                                    // Add MARK button.
}
/************************************************************************************
*                                 createButton                                      *
* This function takes text as an argument and creates a single button, based on the *
* accepted argument.                                                                *
************************************************************************************/
function createButton(text)
{
    var button = document.createElement('button');
    var buttonText = document.createTextNode(text);
    button.appendChild(buttonText);
    return button;
}
/************************************************************************************
*                                 getHeaderCell                                     *
* This function takes text as an argument and creates a new header cell when called *
* then returns the header.                                                          *
************************************************************************************/
function getHeaderCell(text)
{
    var th = document.createElement('th');
    var thText = document.createTextNode(text);
    th.appendChild(thText);
    return th;
}
/************************************************************************************
*                                 getDataCell                                       *
* This function takes text as an argument and creates a new column cell when called *
* then returns the column.                                                          *
************************************************************************************/
function getDataCell(text)
{
    var td = document.createElement('td');
    var tdText = document.createTextNode(text);
    td.appendChild(tdText);
    td.style.width ='90px';
    td.style.height ='50px';
    return td;
}
/************************************************************************************
*                                 findCell                                          *
* This function takes two parameters: a row and a column, and uses those parameters *
* to locate the cell with row and column index.                                     *
************************************************************************************/
function findCell(r, c)
{
  // In edge cases:
  if(r < 1 || r > 3 || c < 1 || c > 3)  // If the row is outside of range:
  {
      return undefined;
  } // Else
  var tableRow = table.childNodes[r];
  var tableCell = tableRow.childNodes[c-1];
  return tableCell;
}
/************************************************************************************
*                                 borderControl                                     *
* This function takes two parameters: a current cell, and the next cell. When this  *
* function is called it removes the border from the current cell and adds it to the *
* next.                                                                             *
************************************************************************************/
function borderControl(current, next)
{
    current.style.border = "none";
    next.style.border = "2px solid black";
}
/************************************************************************************
*                                 generate_table                                    *
* // https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/        *
* Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces                       *
************************************************************************************/
function generate_table()
{
  // Get the reference for the body.
  var body = document.getElementsByTagName("body")[0];

  // Creates a <table> element and a <tbody> element.
  //var tbl = document.createElement("table");
  table = document.createElement('table');
  var tableBody = document.createElement('tbody');
  var tableHeader = document.createElement('th');
  var tableHeaderRow = document.createElement('tr');

  // Create the headers for the table.
  for (var i = 1; i < 4; i++)
  {
      tableHeaderRow.appendChild(getHeaderCell('Header ' + i));
  }
  table.appendChild(tableHeaderRow);
  // Creating all the table cells.
  for (var i = 1; i < 4; i++)
  {
    // Creates a table row.
    var row = document.createElement("tr");
    for (var j = 1; j < 4; j++)
    {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        var cell = document.createElement("td");
        var cellText = document.createTextNode(i + ',' + j);
        cell.appendChild(cellText);
        row.appendChild(cell);
    }

    // Add the row to the end of the table body.
    tableBody.appendChild(row);
  }
  // Put the <tbody> in the <table>.
  table.appendChild(tableBody);
  // Appends the <table> into the <body>.
  body.appendChild(table);
  // Sets the border attribute of table to 1.
  table.setAttribute("border", "1");
}

function createTable()
{
// Create a table.
    table = document.createElement('table');
    // Create the headers.
    var thRow = document.createElement('tr');
    // Nested Loops for the table cells.
    for (var i = 1; i < 4; i++)
    {
        thRow.appendChild(getHeaderCell('Header ' + i));
    }
    table.appendChild(thRow);
    for (var i = 1; i < 4; i++)
    {
        var tr = document.createElement('tr');
        for(var j=1; j<4; j++)
        {
            tr.appendChild(getDataCell(i + ',' + j));
        }
        table.appendChild(tr);
    }
    table.style.border = "1px solid black";
    document.body.appendChild(table);
}

//generate_table();                                                 // Test table that needs work.
createTable();
document.body.appendChild(document.createElement('br'));            // Add line break.
document.body.appendChild(document.createElement('br'));            // Add line break.
printButtons();

// Mark the 1, 1 cell at the start.
borderControl(findCell(currentRow, currentColumn), findCell(currentRow, currentColumn));

//https://www.w3schools.com/jsref/met_document_addeventlistener.asp
UP.addEventListener("click", function()
{
var tCell = findCell(currentRow - 1, currentColumn);
if(tCell != undefined)
    {
        borderControl(findCell(currentRow, currentColumn), tCell);
        currentRow--;
    }
});

DOWN.addEventListener("click", function()
{
var tCell = findCell(currentRow + 1, currentColumn);
if(tCell != undefined)
    {
        borderControl(findCell(currentRow, currentColumn), tCell);
        currentRow++;
    }
});

LEFT.addEventListener("click", function()
{
var tCell = findCell(currentRow, currentColumn - 1);
if(tCell != undefined)
    {
        borderControl(findCell(currentRow, currentColumn), tCell);
        currentColumn--;
    }
});

RIGHT.addEventListener("click", function()
{
var tCell = findCell(currentRow, currentColumn + 1);
if(tCell != undefined)
    {
    borderControl(findCell(currentRow, currentColumn), tCell);
    currentColumn++;
    }
});

MARK.addEventListener("click", function()
{
var tCell = findCell(currentRow, currentColumn);
// If the current cell is not undefined (meaning it's within range):
if(tCell != undefined)
    {
        // Set the background color to yellow.
        tCell.style.backgroundColor = "yellow";
    }
});