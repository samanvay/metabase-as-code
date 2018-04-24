const _ = require("lodash");
const Client = require('../Client');
const Question = require("../domain/Question");

class AllQuestions {
    static find(questionName) {
        return Client.getResources(`card?q=${questionName}`).then((questions) => _.find(questions, (question) => Question.matches(question, questionName)));
    }

    static add(question) {
        return Client.post("card", question);
    }
}

module.exports = AllQuestions;