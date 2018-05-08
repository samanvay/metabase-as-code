const AllDashboards = require("../repository/AllDashboards");
const _ = require("lodash");
const AllQuestionCollections = require("../repository/AllQuestionCollections");
const QuestionCollection = require("../domain/QuestionCollection");
const AllQuestions = require("../repository/AllQuestions");
const Question = require("../domain/Question");
const Dashboard = require("../domain/Dashboard");

class MigrationService {
    static copyQuestionCollections(collectionNames, suffix) {
        return AllQuestionCollections.find(collectionNames).then((collections) => {
            let newCollections = _.map(collections, collection => QuestionCollection.createNewCopy(collection, suffix));
            return AllQuestionCollections.addAll(newCollections);
        });
    }

    static copyQuestionsWithoutDBChange(questionNames, modifier) {
        let promises = [];
        questionNames.forEach((questionName) => {
            let promise = AllQuestions.find(questionName).then(question => {
                Question.unsetPropertiesForNew(question);
                modifier(question);
                return question;
            }).then(question => AllQuestions.add(question));
            promises.push(promise);
        });
        return Promise.all(promises);
    }

    static copyDashboard(dashboardName, modifier) {
        return AllDashboards.find(dashboardName).then((sourceDashboard) => {
            let copiedDashboard = {"name": "", "description": null};
            modifier(copiedDashboard);
            let promises = [];
            AllDashboards.add(copiedDashboard).then((newDashboard) => {
                sourceDashboard["ordered_cards"].forEach((sourceOrderedCard) => {
                    promises.push(AllDashboards.addCard(newDashboard, sourceOrderedCard));
                });
            });
            return Promise.all(promises);
        });
    }
}

module.exports = MigrationService;