const AllQuestionCollections = require("../../../src/repository/AllQuestionCollections");
const Tester = require('../Tester');

var expect = require('chai').expect;

describe('AllQuestionCollectionsTest', () => {
    it('copy collection', () => {
        Tester.login().then(() => {
            AllQuestionCollections.find(["State Questions"]).then((collections) => {
                expect(collections.length).is.equal(1);
            });
        });
    });
});