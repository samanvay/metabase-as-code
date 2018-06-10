const AllDashboards = require("../repository/AllDashboards");
const _ = require("lodash");
const AllQuestionCollections = require("../repository/AllQuestionCollections");
const QuestionCollection = require("../domain/QuestionCollection");
const AllQuestions = require("../repository/AllQuestions");
const Question = require("../domain/Question");
const Dashboard = require("../domain/Dashboard");
const DashboardCard = require("../domain/DashboardCard");

class MigrationService {
    static copyQuestionCollection(collectionName, newName) {
        return AllQuestionCollections.find(collectionName).then((collection) => {
            return AllQuestionCollections.add(QuestionCollection.createNewCopy(collection, newName));
        });
    }

    static copyQuestionsFromOneCollectionToAnotherCollection(sourceCollectionName, destCollectionName, questionFilter = () => true, modifier) {
        let promises = [];
        AllQuestionCollections.find(sourceCollectionName).then((sourceCollection) => {
            AllQuestionCollections.find(destCollectionName).then((destCollection) => {
                AllQuestions.findAllInCollection(sourceCollection).then((questions) => {
                    _.filter(questions, questionFilter).forEach((question) => {
                        Question.unsetPropertiesForNew(question);
                        question["collection_id"] = destCollection["id"];
                        question["collection"] = destCollection;
                        let questionNativeQueryHolder = question["dataset_query"]["native"];
                        let query = questionNativeQueryHolder["query"];
                        let changedValues = modifier(question.name, query);
                        question.name = changedValues.name;
                        questionNativeQueryHolder.query = changedValues.query;
                        promises.push(AllQuestions.add(question));
                    })
                });
            });
        });
        return Promise.all(promises);
    }

    static copyQuestionsWithoutDBChange(questionNames, collectionName, modifier) {
        let promises = [];
        questionNames.forEach((questionName) => {
            let promise = AllQuestions.find(questionName, collectionName).then(question => {
                Question.unsetPropertiesForNew(question);
                modifier(question);
                return question;
            }).then(question => AllQuestions.add(question));
            promises.push(promise);
        });
        return Promise.all(promises);
    }

    static copyDashboard(dashboardName, copiedDashboardName) {
        return AllDashboards.find(dashboardName).then((sourceDashboard) => {
            let promises = [];
            AllDashboards.add(Dashboard.cloneForNew(sourceDashboard, copiedDashboardName)).then((newDashboard) => {
                Dashboard.getCards(sourceDashboard).forEach((sourceDashboardCard) => {
                    let newDashboardCard = DashboardCard.createCopy(sourceDashboardCard);
                    promises.push(AllDashboards.addCard(newDashboard, newDashboardCard));
                });
            });
            return Promise.all(promises);
        });
    }

    static createDashboardFromTemplate(templateDashboardName, templateQuestionCollectionName, newDashboardName, newDashboardDescription, destinationQuestionCollectionName) {
        return AllDashboards.find(templateDashboardName).then((templateDashboard) =>
            AllQuestionCollections.findWithQuestions(templateQuestionCollectionName).then((templateQuestionCollection) =>
                AllQuestionCollections.findWithQuestions(destinationQuestionCollectionName).then((destinationQuestionCollection) =>
                    AllDashboards.add(Dashboard.cloneForNew(templateDashboard, newDashboardName, newDashboardDescription)).then((newDashboard) => {
                            let promises = [];
                            Dashboard.getCards(templateDashboard).forEach((templateDashboardCard) => {
                                let newDashboardCard = DashboardCard.createCopy(templateDashboardCard);
                                if (DashboardCard.isQuestionBased(templateDashboardCard)) {
                                    let templateQuestion = QuestionCollection.findQuestionForCard(templateQuestionCollection, templateDashboardCard);
                                    let question = QuestionCollection.findQuestionByName(destinationQuestionCollection, Question.getName(templateQuestion));
                                    DashboardCard.changeQuestion(newDashboardCard, question);
                                }
                                DashboardCard.placeOn(newDashboardCard, newDashboard);
                                promises.push(AllDashboards.addCard(newDashboard, newDashboardCard));
                            });
                            return Promise.all(promises);
                        }
                    )
                )
            )
        );
    }
}

module.exports = MigrationService;