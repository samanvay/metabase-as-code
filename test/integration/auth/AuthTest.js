var expect = require('chai').expect;
const Client = require('../../../src/Client');

describe('AuthTest', () => {
    it('auth', () => {
        let authenticate = Client.authenticate("http://localhost:3000", "metabase@example.com", process.env.METABASE_MIGRATOR_PASSWORD).then();
    });
});