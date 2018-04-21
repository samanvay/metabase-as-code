var expect = require('chai').expect;
import Client from '../../../src/Client';

describe('AuthTest', () => {
    it('auth', () => {
        let authenticate = Client.authenticate("http://localhost:3000", "metabase@example.com", "JEpeWJPoEpgres").then();
    });
});