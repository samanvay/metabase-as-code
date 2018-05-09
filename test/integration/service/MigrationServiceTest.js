const expect = require("chai").expect;
const _ = require("lodash");
const MigrationService = require("../../../src/service/MigrationService");
const Tester = require("../Tester");

describe('MigrationServiceTest', () => {
    it('copyCollections', () => {
        Tester.login().then(() => {
            MigrationService.copyQuestionCollections(["State Questions"], "Bihar");
        });
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

    it('copy dashboard', function () {
        Tester.login().then(() => {
            MigrationService.copyDashboard("NQAS - Karnataka - DH", (dashboard) => {
                dashboard.name = "NQAS - Karnataka - Laqshya";
            });
        });
    });
});