const functions = require("../app/functions");

let data = [
  {
    name: "Homer Simpson",
    location: "Springfield",
    date_of_birth: "1956-05-12",
  },
  {
    name: "Frank Reynolds",
    location: "Philidelphia",
    date_of_birth: "1944-11-17",
  },
  {
    name: "Diane Nguyen",
    location: "Los Angeles",
    date_of_birth: "1980-03-19",
  },
  {
    name: "Krusty the Clown",
    location: "SpringField",
    date_of_birth: "1957-10-29",
  },
];

let location = "springfield";

//let result = functions.filterTalent(data, location);

let result = functions.filterTalentByAge(data, 65);
console.log(result);
