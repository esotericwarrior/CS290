/****************************************************************************
** Author: Tristan Santiago                                                 *
** Title: automobile.js                                                     *
** Date: 4/29/2018                                                          *
** Description: Within this program we use high order functions to sort     *
** several vehicles into different categories, including year, make, and    *
** type.                                                                    *
****************************************************************************/
function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
}

var automobiles = [ 
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];

// Create an array that sorts the automobiles by year.
var auto_year = sortArr(yearComparator, automobiles);
// Create an array that sorts the automobiles by make.
var auto_make = sortArr(makeComparator, automobiles);
// Create an array that sorts the automobiles by type.
var auto_type = sortArr(typeComparator, automobiles);
/************************************************************************************
*                                   logMe                                           *
* This is the LogMe function for automobile objects. It prints the properties of    *
* the automobile object after receiving a boolean of true to print type.            *
************************************************************************************/
Automobile.prototype.logMe = function(bool)
{
    if (bool == true)
    {
      console.log(this.year + " " + this.make + " " + this.model + " " + this.type);
        
    }
    else
    {
      console.log(this.year + " " + this.make + " " + this.model + " ");
    }
}
/************************************************************************************
*                                   sortArr                                         *
* This function takes a comparator and an array of objects corresponding to the     *
* comparator. It sorts the arrays using an arbitrary comparator and returns a new   *
* array which is sorted from the largest object to the smallest.                    *
************************************************************************************/
function sortArr(comparator, array)
{
    var newArr = array.slice(0); //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
    for (var i = 0; i < newArr.length - 1; i++)
    {
        for (var j = i + 1; j < newArr.length; j++)
        {
            if (comparator(newArr[j], newArr[i]))
            {
                var temp = newArr[i];
                newArr[i] = newArr[j];
                newArr[j] = temp;
            }
        }
    }
    return newArr;
}
/*A comparator takes two arguments and uses some algorithm to compare them. If the first argument is
larger or greater than the 2nd it returns true, otherwise it returns false.
Here is an example that works on integers*/
function exComparator( int1, int2){
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
}

/*For all comparators if cars are 'tied' according to the comparison rules then the order of those 'tied'
cars is not specified and either can come first*/
/************************************************************************************
*                               yearComparator                                      *
* This function compares two automobiles based on their year. Newer cars are        *
* considered to be "greater" than older cars.                                       *
************************************************************************************/
function yearComparator( auto1, auto2)
{
    if (auto1.year > auto2.year)    // If the year of the first automobile is > than that of the second:
    {
        return true;   
    }
    else                            // The year of the second automobile is > than that of the first:
    {
        return false;
    }
}
/************************************************************************************
*                               makeComparator                                      *
* This function compares two automobiles based on their make. It is case insensitive*
* and automobile are sorted in alphabetical order, with automobiles appearing       *
* earlier in the alphabetet considered to be "greater" than those coming afterwards.*
************************************************************************************/
function makeComparator(auto1, auto2)
{
  if (auto1.make.toLowerCase() < auto2.make.toLowerCase())
  {
      return true;
  }
  else
  {
      return false;
  }
}
/************************************************************************************
*                               typeComparator                                      *
* This function compares two automobiles based on their type, based on the following*
* order: Roadster, Pickup, SUV, Wagon, and types not otherwise listed (including)   *
* Sedan. The function is case insensitive. If two cars are the same type, they are  *
* considered equal, so this function considers the newest automobile (based on year *
* as the "greater" of the two.                                                      *
************************************************************************************/
function typeComparator(auto1, auto2)
{
    /************************************************************************************
    *                                  orderType                                        *
    * This function takes an automobile object as a parameter and then checks the type  *
    * of automobile by matching the name, then returns a number based on the type.      *
    ************************************************************************************/
    var orderType = function(auto)
    {
        // Roadster
        if (auto.type.toLowerCase() == "roadster")
        {
            return 1;
        }
        // Pickup
        if (auto.type.toLowerCase() == "pickup")
        {
            return 2;
        }
        // SUV
        if (auto.type.toLowerCase() == "suv")
        {
            return 3;
        }
        // Wagon
        if (auto.type.toLowerCase() == "wagon")
        {
            return 4;
        }
        else // Car type is a sedan, or something else not listed.
        {
            return 5;
        }
    }

    // Compare the types based on the returned number in order to sort them properly.
    if (orderType(auto1) < orderType(auto2))
    {
        return true;
        
    }
    else if (orderType(auto1) == orderType(auto2))
    {
        return yearComparator(auto1, auto2);
    }
    else
    {
        return false;
    }
}
/************************************************************************************
*                               printList                                           *
* This function takes an array of automobile objects as a parameter and a boolean   *
* value before calling the LogMe function for each automobile object found in an    *
* array.                                                                            *
************************************************************************************/
function printList(autoArr, bool)
{
    autoArr.forEach(function(x)
    {
        x.logMe(bool)
        
    });
}

// Print the following string to the screen:
console.log("*****\nThe cars sorted by year are:");
// Call printList to print the automobile list sorted by year:
printList(auto_year, false);
// Print the following string to the screen:
console.log("\nThe cars sorted by make are:");
// Call printList to print the automobile list sorted by make:
printList(auto_make, false);
// Print the following string to the screen:
console.log("\nThe cars sorted by type are:");
// Call printList to print the automobile list sorted by type:
printList(auto_type, true);
// Print the following string to the screen:
console.log("*****");

/*Your program should output the following to the console.log, including the opening and closing 5 stars. All values in parenthesis should be replaced with appropriate values. Each line is a seperate call to console.log.

Each line representing a car should be produced via a logMe function. This function should be added to the Automobile class and accept a single boolean argument. If the argument is 'true' then it prints "year make model type" with the year, make, model and type being the values appropriate for the automobile. If the argument is 'false' then the type is ommited and just the "year make model" is logged.

*****
The cars sorted by year are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by make are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by type are:
(year make model type of the 'greatest' car)
(...)
(year make model type of the 'least' car)
*****

As an example of the content in the parenthesis:
1990 Ford F-150 */