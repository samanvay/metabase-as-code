const AnyEntity = require("./AnyEntity");
const _ = require("lodash");

class Question {
    static matches(question, questionName) {
        return question.name === questionName;
    }

    static unsetPropertiesForNew(question) {
        AnyEntity.unsetPropertiesForNew(question);
    }
}

module.exports = Question;