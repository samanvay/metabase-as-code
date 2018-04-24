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
        Tester.login().then(() => {
            MigrationService.copyQuestionsWithoutDBChange(["All Assessments"], (question) => {
                question.name = "All Assessments - Copy";
            });
        });
    });
});