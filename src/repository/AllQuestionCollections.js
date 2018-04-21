import _ from "lodash";
import Client from '../Client';

class AllQuestionCollections {
    static findAll() {
        return Client.getResources("collection");
    }
}

export default AllQuestionCollections;