const _ = require("lodash");
const DashboardCard = require('../domain/DashboardCard');
const Question = require('../domain/Question');

class QuestionCollection {
    static hasName(questionCollection, collectionName) {
        return questionCollection.name === collectionName;
    }

    static createNewCopy(collection, newName) {
        let copiedCollection = {};
        copiedCollection.name = newName;
        copiedCollection.color = collection.color;
        copiedCollection.desciption = collection.description;
        return copiedCollection;
    }

    static findQuestionForCard(collection, dashboardCard) {
        return _.find(collection["cards"], (question) => Question.id(question) === DashboardCard.questionId(dashboardCard));
    }

    static findQuestionByName(collection, questionName) {
        return _.find(collection["cards"], (question) => Question.hasName(question, questionName));
    }
}

module.exports = QuestionCollection;