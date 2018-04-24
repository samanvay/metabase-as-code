const _ = require("lodash");

let _PropertiesToUnsetForNew = ["creator", "created_at", "creator_id", "updated_at"];

class Question {
    static matches(question, questionName) {
        return question.name === questionName;
    }

    static unsetPropertiesForNew(question) {
        _.unset(question, _PropertiesToUnsetForNew);
    }
}

module.exports = Question;