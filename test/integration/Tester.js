import _ from "lodash";
import Client from '../../src/Client';

class Tester {
    static login() {
        return Client.authenticate("http://localhost:3000", "metabase@example.com", "JEpeWJPoEpgres");
    }
}

export default Tester;