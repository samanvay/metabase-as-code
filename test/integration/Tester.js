const _ = require("lodash");
const Client = require('../../src/Client');

class Tester {
    static login() {
        return Client.authenticate("http://localhost:3000", "metabase@example.com", process.env.METABASE_MIGRATOR_PASSWORD);
    }
}

module.exports = Tester;