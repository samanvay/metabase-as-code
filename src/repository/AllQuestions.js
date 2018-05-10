const _ = require("lodash");
const Client = require('../Client');
const Question = require("../domain/Question");

class AllQuestions {
    static find(questionName, collectionName) {
        return Client.getResources(`card?q=${questionName}`).then((questions) => _.find(questions, (question) => Question.matches(question, questionName, collectionName)));
    }

    static add(question) {
        return Client.post("card", question);
    }

    static findAllInCollection(collection) {
        return Client.getResources(`card?f=all&collection=${collection["slug"]}`);
    }
}

module.exports = AllQuestions;