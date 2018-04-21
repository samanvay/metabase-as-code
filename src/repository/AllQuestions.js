import _ from "lodash";
import Gateway from '../gateway';
import Client from '../Client';

class AllQuestions {
    static findAll() {
        Gateway.get()
    }
}

export default AllQuestions;