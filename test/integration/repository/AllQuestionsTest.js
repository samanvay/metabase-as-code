import AllQuestions from "../../../src/repository/AllQuestions";
import auth from "../../../src/auth/authenticate";

var expect = require('chai').expect;

describe('AllQuestionsTest', () => {
    it('findAll', () => {
        AllQuestions.findAll();
    });
});