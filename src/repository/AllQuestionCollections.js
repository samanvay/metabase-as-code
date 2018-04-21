import _ from "lodash";
import Client from '../Client';
import QuestionCollection from "../domain/QuestionCollection";

class AllQuestionCollections {
    static findAll() {
        return Client.getResources("collection");
    }

    static find(collectionNames) {
        return AllQuestionCollections.findAll().then((collections) => {
            return _.filter(collections,
                (collection) => _.some(collectionNames,
                                            (collectionName) => QuestionCollection.hasName(collection, collectionName)));
        });
    }

    static addAll(collections) {
        return collections.map((collection) => Client.post("collection", collection));
    }
}

export default AllQuestionCollections;