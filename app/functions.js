/**
 *
 * @param {Array.<Object>} talentList
 * @param {string} location
 */
function validateParameters(talentList, location) {
  let parameterValidation = {};
  parameterValidation.message = "";
  if (!location || typeof location !== "string") {
    parameterValidation.status = "error";
    parameterValidation.message += "|location parameter is not valid|";
  }
  if (!Array.isArray(talentList)) {
    parameterValidation.status = "error";
    parameterValidation.message += "|talentList parameter is not valid|";
  } else {
    let nonObject = false;
    for (let i = 0; i < talentList.length; i++) {
      const talent = talentList[i];

      if (typeof talent !== "object") {
        nonObject = true;
        break;
      }
    }
    if (nonObject) {
      parameterValidation.status = "error";
      parameterValidation.message +=
        "|talentList parameter contains a non object|";
    }
  }

  if (!parameterValidation.status) {
    parameterValidation.status = "ok";
  }
  return parameterValidation;
}

/**
 *
 * @param {Array.<Object>} talentList
 * @returns
 */
function validateList(talentList) {
  let validationArray = [];
  for (let i = 0; i < talentList.length; i++) {
    const talent = talentList[i];
    validationArray[i] = {};
    validationArray[i].message = "";
    if (!talent.name || typeof talent.name !== "string") {
      validationArray[i].status = "error";
      validationArray[i].message += "|name is not valid|";
    }
    if (!talent.location || typeof talent.location !== "string") {
      validationArray[i].status = "error";
      validationArray[i].message += "|location is not valid|";
    }
    if (
      typeof talent.date_of_birth !== "string" ||
      !Date.parse(talent.date_of_birth)
    ) {
      validationArray[i].status = "error";
      validationArray[i].message += "|date_of_birth is not valid|";
    }
    if (!validationArray[i].status) {
      validationArray[i].status = "ok";
    }
  }

  return validationArray;
}

/**
 *
 * @param {Array.<Object>} talentList
 * @param {string} location
 */
exports.filterTalent = function (talentList, location) {
  let result = {
    listValidation: [],
    parameterValidation: { status: "", message: "" },
    matchingTalent: [],
  };
  result.parameterValidation = validateParameters(talentList, location);
  if (result.parameterValidation.status == "ok") {
    result.listValidation = validateList(talentList);

    for (let i = 0; i < talentList.length; i++) {
      if (result.listValidation[i].status == "ok") {
        const talent = talentList[i];
        if (talent.location.toLowerCase() == location.toLowerCase()) {
          result.matchingTalent.push(talent.name);
          console.log(talent.name);
        }
      }
    }
  }
  return result;
};

exports.filterTalentByAge = function (talentList, age) {
  let result = [];

  for (let i = 0; i < talentList.length; i++) {
    const talent = talentList[i];
    let today = new Date();
    let talentDOB = new Date(talent.date_of_birth);
    let dateCheck = false;
    if (today.getMonth() < talentDOB.getMonth()) {
      if (today.getDate() < talentDOB.getDate()) {
        dateCheck = true;
      }
    }

    let talentAge = today.getUTCFullYear() - talentDOB.getUTCFullYear();
    if (dateCheck) talentAge -= 1;
    console.log("talentAge:", talentAge, "inputAge:", age);
    if (talentAge == age) result.push(talent);
  }

  return result;
};
