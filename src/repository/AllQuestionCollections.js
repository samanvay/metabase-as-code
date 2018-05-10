const _ = require("lodash");
const Client = require('../Client');
const QuestionCollection = require("../domain/QuestionCollection");

class AllQuestionCollections {
    static findAll() {
        return Client.getResources("collection");
    }

    static find(collectionName) {
        return AllQuestionCollections.findAll().then((collections) => {
            return _.find(collections, (collection) => QuestionCollection.hasName(collection, collectionName));
        });
    }

    static findWithQuestions(collectionName) {
        return AllQuestionCollections.find(collectionName).then((collection) => Client.getResource("collection", collection.id));
    }

    static add(collection) {
        return Client.post("collection", collection);
    }
}

module.exports = AllQuestionCollections;