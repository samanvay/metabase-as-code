import AllQuestionCollections from "../../../src/repository/AllQuestionCollections";
import Tester from '../Tester';

var expect = require('chai').expect;

describe('AllQuestionCollectionsTest', () => {
    it('findAll', () => {
        Tester.login().then(() => {
            AllQuestionCollections.findAll().then((collections) => {
                console.log(JSON.stringify(collections));
            });
        });
    });
});