import _ from "lodash";
import AllQuestionCollections from "../repository/AllQuestionCollections";
import QuestionCollection from "../domain/QuestionCollection";

class MigrationService {
    static copyCollections(collectionNames, suffix) {
        return AllQuestionCollections.find(collectionNames).then((collections) => {
            let newCollections = _.map(collections, (collection) => QuestionCollection.createNewCopy(collection, suffix));
            return AllQuestionCollections.addAll(newCollections);
        });
    }
}

export default MigrationService;