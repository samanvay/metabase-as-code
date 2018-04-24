import _ from "lodash";
import AllQuestionCollections from "../repository/AllQuestionCollections";
import QuestionCollection from "../domain/QuestionCollection";
import AllQuestions from "../repository/AllQuestions";
import Question from "../domain/Question";

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
}

export default MigrationService;