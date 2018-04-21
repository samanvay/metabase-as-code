import _ from "lodash";

class QuestionCollection {
    static hasName(questionCollection, collectionName) {
        return questionCollection.name === collectionName;
    }

    static createNewCopy(collection, suffix) {
        let copiedCollection = {};
        copiedCollection.name = `${collection.name} ${suffix}`;
        copiedCollection.color = collection.color;
        copiedCollection.desciption = collection.description;
        return copiedCollection;
    }
}

export default QuestionCollection;