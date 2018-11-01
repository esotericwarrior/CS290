// Global Variables
var MAXSCORE = 100;                                                     // Variable used to represent the maximum number of points a user can score on a test.
var questionCount = 10;                                                 // Variable used for the number of questions on the exam to be graded. Default is 10.
var result = 0;                                                         // Variable used to store the calculated result of the exam grade.
var wrongCount = 0;                                                     // Variable used to represent the number of questions wrong on the exam.
var body = document.getElementsByTagName("body")[0];                    // Get the reference for the body.
var tbl= document.createElement("table");                               // Creates a <table> element.
var tblBody = document.createElement("tbody");                          // Creates a <tbody> element.
document.addEventListener('DOMContentLoaded', onLoad);                  // Add Listenever event once the page has loaded and call the onLoad function.
//*******************************************************************************
//                                  onLoad                                      *
// This function takes no paramaters and is called when the page is loaded. It  *
// is responsible for initializing the wrongCount and questionCount variables   *
// to their respective HTML elements in index.html so that the page will        *
// display default calculations when it is loaded. Once wrongCount and          *
// questionCount are assigned, it calls the calculate() function to properly    *
// display the updated values.                                                  *
//*******************************************************************************
function onLoad()
{
    document.getElementById("wrongCount").value = wrongCount;           // Assign wrongCount variable to wrongCount HTML element.
    document.getElementById("questionCount").value = questionCount;     // Assign questionCount variable to questionCount HTML element..
    calculate();                                                        // Call calculate() function to display default results.
    generate_table();                                                   // Call generate_table() function to create the grade table.
}
//*******************************************************************************
//                              edValueKeyPress                                 *
// This function is responsible for updating the values in the "Number of       *
// "Questions" and "Number of Questions Wrong" textboxes as the user modifies   *
// those fields. It is called each time either value changes and immediately    *
// calls the calculate() function to update the grade results.                  *
//*******************************************************************************
function edValueKeyPress()
{
    questionCount = document.getElementById("questionCount").value;     // Assign the value in the "questionCount" element to the questionCount variable.
    wrongCount = document.getElementById("wrongCount").value;           // Assign the value in the "wrongCount" element to the wrongCount variable.
    calculate();                                                        // Call the calculate() function.
}
//*******************************************************************************
//                              wrongCountKeyPress                              *
// This function is called when the user presses the +1 Wrong button on         *
// index.html. When called, this function increments the number of questions    *
// wrong by 1 per click and immediately calls showDecimal to display the proper *
// results.                                                                     *
//*******************************************************************************
function wrongCountKeyPress()
{
    wrongCount = parseInt(document.getElementById("wrongCount").value); // Assign the value in the "wrongCount" textbox to the wrongCount variable.
    wrongCount += 1;                                                    // Increment wrongCount by 1.
    document.getElementById("wrongCount").value = wrongCount;           // Update the value in the "wrongCount" textbox to reflect the change.
    showDecimal();                                                      // Call showDecimal() function.
}
//*******************************************************************************
//                              rightCountKeyPress                              *
// This function is called when the user presses the +1 Right button on         *
// index.html. When called, this function dencrements the number of questions   *
// wrong by 1 per click and immediately calls showDecimal to display the proper *
// results. This function is effectively incrementing the number of correct     *
// questions by 1.                                                              *
//*******************************************************************************
function rightCountKeyPress()

{
    wrongCount = parseInt(document.getElementById("wrongCount").value); // Assign the value in the "wrongCount" textbox to the wrongCount variable.
    wrongCount -= 1;                                                    // Decrement wrongCount by 1.
    document.getElementById("wrongCount").value = wrongCount;           // Update the value in the "wrongCount" textbox to reflect the change.
    showDecimal();                                                      // Call showDecimal function.
}
//*******************************************************************************
//                              calculate                                       *
// This function is called when the page loads. It performs the necessary       *
// calculations to properly display the correct exam score. By default, it      *
// displays the results rounded to the nearest whole number.                    *
//*******************************************************************************
function calculate()
{
    result = (questionCount - wrongCount) / questionCount * MAXSCORE;   // Assign the calculated score to the result variable.
    // var tenth = Math.round(result * 10) / 10;                        // Round the result to the nearest tenth.
    var whole = Math.round(result);                                     // Round the result to the nearest hundreth.
    var resultsOutput = document.getElementById("resultsOutput");       // Assign "resultsOutput" HTML element to the resultsOutput variable.
    resultsOutput.innerHTML = (questionCount - wrongCount) + "/" + questionCount + " = " + whole + "%"; // Display the results rounded to the nearest whole.
    message();
}
//*******************************************************************************
//                              resetWrong                                      *
// This is the method used to reset the number of Wrong Questions back to 0.    *
//*******************************************************************************
function resetWrong()
{
    document.getElementById("wrongCount").value = 0;                    // Reset the "wrongCount" HTML element back to 0.
    wrongCount = 0;                                                     // Reset the wrongCount variable back to 0 as well.
    calculate();                                                        // Call calculate() to reset the grade.
    message();
}
//*******************************************************************************
//                              showDecimal                                     *
// This function essentially performs the same operation as the calculate()     *
// function with a few key differences. The first being it is only called when  *
// the "Show Decimals" checkbox is checked. The second difference is that it    *
// displays the results rounded to the nearest hundreth. The results will       *
// continue to be displayed rounded to the nearest hundreth until the user      *
// unchecks the "Show Decimals" checkbox. When the user does so, the results are*
// then displayed rounded to the nearest whole number.                          *
//*******************************************************************************
function showDecimal()
{
    var checkBox = document.getElementById("decimalCheck");             // Assign the "decimalCheck" HTML element to the checkBox variable.
    if (checkBox.checked == true) {                                     // If the user checks the "Show Decimal" checkbox, perform the following operation:
    result = (questionCount - wrongCount) / questionCount * MAXSCORE;   // Assign the calculated result to the result variable.
    var nearestHundreth = Math.round(result * 100) / 100;               // Round to the nearest hundreth.
    var resultsOutput = document.getElementById("resultsOutput");       // Assign the resultsOutput HTML element to the resultsOutput variable.
    resultsOutput.innerHTML = (questionCount - wrongCount) + "/" + questionCount + " = " + nearestHundreth + "%"; // Display the results rounded to the nearest hundreth.
    message();                                                          // Call message() to generate encouraging message.
    }
    else {                                                              // If the checkbox isn't checked, calculate using the default method (nearest whole number).
    result = (questionCount - wrongCount) / questionCount * MAXSCORE;   // Assign the calculated result to the result variable.
    var whole = Math.round(result);                                     // Round to the nearest whole number.
    var resultsOutput = document.getElementById("resultsOutput");       // Assign the resultsOutput HTML element to the resultsOutput variable.
    resultsOutput.innerHTML = (questionCount - wrongCount) + "/" + questionCount + " = " + whole + "%"; // Display the results rounded to the nearest whole number.
    message();                                                          // Call message() to generate encouraging message.
    }
}
//*******************************************************************************
//                              showChart                                       *
// When called this function dynamically creates and then displays a quick      *
// grade chart based on the user's input.                                       *
//*******************************************************************************
function showChart() {
    var checkBox = document.getElementById("chartCheck");
    var table = document.getElementById("table");
    if (checkBox.checked == true) {
       table.style.display = "block";
       table.align="center";
    }
    else {
        table.style.display = "none";
    }
}
//*******************************************************************************
//                              generate_table                                  *
// This function generates a table based on the number of questions wrong and   *
// properly displays the calculated results for all possibilities.              *
//*******************************************************************************
function generate_table() {
// // get the reference for the body
// var body = document.getElementsByTagName("body")[0];

// // creates a <table> element and a <tbody> element
// var tbl= document.createElement("table");
// var tblBody = document.createElement("tbody");

// creating all cells
for (var i = 0; i < questionCount; i++) {
// creates a table row
var row = document.createElement("tr");
for (var j = 0; j < 2; j++) {
// Create a <td> element and a text node, make the text
// node the contents of the <td>, and put the <td> at
// the end of the table row
var cell = document.createElement("td");
var cellText = document.createTextNode("cell in row "+i+", column "+j);
cell.appendChild(cellText);
row.appendChild(cell);
}
// add the row to the end of the table body
tblBody.appendChild(row);
}
// put the <tbody> in the <table>
tbl.appendChild(tblBody);
// appends <table> into <body>
body.appendChild(tbl);
// sets the border attribute of tbl to 2;
tbl.setAttribute("border", "1");
}

//*******************************************************************************
//                              message                                         *
// This function displays an encouraging message based on the grade results     *
// which teachers can elect to include with the grades.                         *
//*******************************************************************************
function message() {
    if (result >= 100)                                                      // If the result is greater than or equal to 100.
    {
        document.getElementById("message").innerHTML = "Extra credit!"      // Display "Extra credit!"
    }
    else if (result == 100)                                                 // If the result is 100.
    {
        document.getElementById("message").innerHTML = "Perfect!";          // Display "Perfect!"
    }
    else if (result <= 99 && result >=90)                                   // If the result is 90-99.
    {
        document.getElementById("message").innerHTML = "Excellent job!";    // Display "Excellent job!"
    }
    else if (result < 90 && result >= 80)                                   // If the result is 80-89.
    {
        document.getElementById("message").innerHTML = "Great work!";       // Display "Great work!"
    }
    else if (result < 80 && result >= 70)                                   // If the result is 70-79.
    {
        document.getElementById("message").innerHTML = "Better luck next time!";    // Display "Better luck next time!"
    }
    else if (result < 70 && result >= 60)                                   // If the result is 60-69.
    {
        document.getElementById("message").innerHTML = "You can do better! Keep practicing!";   // Display "You can do better! Keep practicing!"
    }
    else                                                                    // If the result is 59 or below.
    {
        document.getElementById("message").innerHTML = "You're capable of so much more! Keep studying!";    // Display message.
    }
}