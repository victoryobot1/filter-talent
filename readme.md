# filter talent function

Repo containing solution for the contact associate software engineering role

## Installation

1. This solution was made in the nodejs environment so to run it locally you'd should have node installed
2. After node is installed, open up a ternminal and navigate to the project folder, then run `npm install` to install all npm dependencies in the project

## Before you run the solution

### The main sctipt (app/app.js)

In the main script, app/app.js, i've set up a case to run the function. in here there is

1. a variable called 'functions'.
   > it is a reference to the script app/functions.js. it holds main function that filters the list as well as helper functions
2. a variable called 'data'
   > the list of talents. should be an array of objects.
3. a variable called 'location'
   > the location of talent we want to find
4. a variable called 'result'. should be a string
   > it is an object that gets returned from `functions.filterTalent(data, location)`. it has a structure of

```javascript
{
    listValidation: [];
    parameterValidation: {
        status: string;
        message: string;
    };
    matchingTalent: any[];
}

```

### Functions script (app/functions.js)

This script holds all the functions used in the solution

1. a function called validateParameters.

   > this function checks the parameters used in the functions.filterTalent(data, location) at a top level. it takes in two parameters, the list and the location, it checks to confirm that the data supplied is an array and it doesn't contain non objects.
   > if it finds an error it populates result.parameterValidation with a status of "error" and coresponding message, if not it sets status to "ok"

2. a function called validateList.

   > this function ispects the objects in the list supplied on a closer level to make sure the data in fields are correctly input. it only takes in one parameter which is the list, it checks
   >
   > - if any expected fields are empty,
   > - and if the expected fields are of the correct type. ie name, locatiion is string and date is string that can be parsed into a date
   >
   > if it finds an error in an item, it pushes an object with a status of "error" and a coresponding message into result.listValidation, else it pushes an object with status "ok" into the result.listValidation array. This way if the the listValidation array matches up with the objects in the data supplied and you can find out where there are issues

3. a function called filterTalent
   > this is the main function. it takes in two parameters, the list and the location.
   >
   > - it runs these parameters through the validator functions above, if it passes the parameter validation then it sends it to the list validaton.
   > - any list item doesn't pass validation then it isn't considered for the search.
   > - finally, it finds items whose location matches the location parameter sent in and adds their names to result.matchingTalent.
   > - it also logs the names of matching talents to the console.

### Test script (test/filterTalent.js)

This script holds 7 test cases, written in a BDD assertion style using chaijs and mochajs. To run the tests, run `mocha` in the terminal.

## Running the solution

The project has been set up to run app/app.js whenever you run `npm start` in the terminal
