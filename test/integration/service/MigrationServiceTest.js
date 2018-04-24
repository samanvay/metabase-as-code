import {expect} from 'chai';
import _ from "lodash";
import MigrationService from "../../../src/service/MigrationService";
import Tester from "../Tester";

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