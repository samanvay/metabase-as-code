const AnyEntity = require("./AnyEntity");
const _ = require("lodash");

class Question {
    static matches(question, questionName, collectionName) {
        return question.name === questionName && question["collection"]["name"] === collectionName;
    }

    static unsetPropertiesForNew(question) {
        AnyEntity.unsetPropertiesForNew(question);
    }
}

module.exports = Question;