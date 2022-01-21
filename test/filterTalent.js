//Test Script
const chai = require("chai");
const should = chai.should();

const functions = require("../app/functions");

let data;
beforeEach(function () {
  data = [
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
});

describe("Talent Filter", function () {
  //listValidation tests
  it("returns bad name error", function () {
    data[3].name = "";
    var result = functions.filterTalent(data, "springfield");
    result.should.be.an("object");
    result.should.have.property("listValidation");
    result.listValidation.should.be.an("array");
    result.listValidation[3].should.have.property("status");
    result.listValidation[3].status.should.equal("error");
    result.listValidation[3].message.should.contain("|name is not valid|");
  });
  it("returns bad location(data) error", function () {
    data[3].location = 7;
    var result = functions.filterTalent(data, "springfield");
    result.should.be.an("object");
    result.should.have.property("listValidation");
    result.listValidation.should.be.an("array");
    result.listValidation[3].should.have.property("status");
    result.listValidation[3].status.should.equal("error");
    result.listValidation[3].message.should.contain("|location is not valid|");
  });
  it("returns bad date_of_birth error", function () {
    data[3].date_of_birth = "90s";
    var result = functions.filterTalent(data, "springfield");
    result.should.be.an("object");
    result.should.have.property("listValidation");
    result.listValidation.should.be.an("array");
    result.listValidation[3].should.have.property("status");
    result.listValidation[3].status.should.equal("error");
    result.listValidation[3].message.should.contain(
      "|date_of_birth is not valid|"
    );
  });

  //parameter validation tests
  it("returns bad list(data) error", function () {
    var result = functions.filterTalent(6, "springfield");
    result.should.be.an("object");
    result.should.have.property("parameterValidation");
    result.parameterValidation.should.be.an("object");
    result.parameterValidation.should.have.property("status");
    result.parameterValidation.status.should.equal("error");
    result.parameterValidation.message.should.contain(
      "|talentList parameter is not valid|"
    );
  });
  it("returns bad item in list(data) error", function () {
    var result = functions.filterTalent([6], "springfield");
    result.should.be.an("object");
    result.should.have.property("parameterValidation");
    result.parameterValidation.should.be.an("object");
    result.parameterValidation.should.have.property("status");
    result.parameterValidation.status.should.equal("error");
    result.parameterValidation.message.should.contain(
      "|talentList parameter contains a non object|"
    );
  });
  it("returns bad location(data) error", function () {
    var result = functions.filterTalent(data, 6);
    result.should.be.an("object");
    result.should.have.property("parameterValidation");
    result.parameterValidation.should.be.an("object");
    result.parameterValidation.should.have.property("status");
    result.parameterValidation.status.should.equal("error");
    result.parameterValidation.message.should.contain(
      "|location parameter is not valid|"
    );
  });

  //result validation
  it("returns talent", function () {
    var result = functions.filterTalent(data, "springfield");
    result.should.be.an("object");
    result.should.have.property("parameterValidation");
    result.parameterValidation.should.be.an("object");
    result.parameterValidation.should.have.property("status");
    result.parameterValidation.status.should.equal("ok");
    result.matchingTalent.should.be.an("array");
    result.matchingTalent.should.contain.members([
      "Homer Simpson",
      "Krusty the Clown",
    ]);
  });
});
