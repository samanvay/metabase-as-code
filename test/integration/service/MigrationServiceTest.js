const expect = require("chai").expect;
const _ = require("lodash");
const MigrationService = require("../../../src/service/MigrationService");
const AllQuestionCollections = require("../../../src/repository/AllQuestionCollections");
const Tester = require("../Tester");

describe('MigrationServiceTest', () => {
    let states = ["Telangana", "Puducherry", "Odisha", "A and N Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttarakhand", "Uttar Pradesh", "West Bengal", "Chandigarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Lakshadweep"];
    states = ["Delhi"];

    it('copyCollection', () => {
        Tester.login().then(() => {
            states.forEach((state) => {
                MigrationService.copyQuestionCollection("State Laqshya Questions", `${state} Laqshya Questions`);
            });
        });
    });

    it('copy all questions from one collection to another collection', function () {
        Tester.login().then(() =>
            states.forEach((state) => {
                MigrationService.copyQuestionsFromOneCollectionToAnotherCollection("State Laqshya Questions", `${state} Laqshya Questions`, (name, query) => {
                    let returnValues = {};
                    returnValues.name = name;
                    returnValues.query = query.replace("'Karnataka'", `'${state}'`);
                    return returnValues
                });
            }));
    });

    it('copy dashboards', function () {
        Tester.login().then(() =>
            _.reduce(states,
                (acc, state) => acc.then(() => MigrationService.createDashboardFromTemplate("State - Laqshya - NQAS", "State Laqshya Questions", `${state} - Laqshya - NQAS`, '', `${state} Laqshya Questions`)), Promise.resolve()));
    });

    it('copyQuestionsWithoutDBChange', function () {
        let copyQuestion = function (aoc) {
            MigrationService.copyQuestionsWithoutDBChange(["Facilities Overview - Area of Concern (A)"], "State Laqshya Questions", (question) => {
                question.name = `Facilities Overview - Area of Concern (${aoc})`;
                let native = question["dataset_query"]["native"];
                native["query"] = native["query"].replace("'A'", `${aoc}`);
            });
        };

        Tester.login().then(() => {
            copyQuestion("C");
            copyQuestion("D");
            copyQuestion("E");
            copyQuestion("F");
            copyQuestion("G");
            copyQuestion("H");
        });
    });
});