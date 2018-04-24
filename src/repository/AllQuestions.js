import _ from "lodash";
import Client from '../Client';
import Question from "../domain/Question";

class AllQuestions {
    static find(questionName) {
        return Client.getResources(`card?q=${questionName}`).then((questions) => _.find(questions, (question) => Question.matches(question, questionName)));
    }

    static add(question) {
        return Client.post("card", question);
    }
}

export default AllQuestions;