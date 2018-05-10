const AnyEntity = require("./AnyEntity");
const _ = require("lodash");

class Question {
    static matches(question, questionName, collectionName) {
        return question.name === questionName && question["collection"]["name"] === collectionName;
    }

    static unsetPropertiesForNew(question) {
        AnyEntity.unsetPropertiesForNew(question);
    }

    static id(question) {
        return question["id"];
    }

    static hasName(question, name) {
        return Question.getName(question) === name;
    }

    static getName(question) {
        return question["name"];
    }
}

module.exports = Question;