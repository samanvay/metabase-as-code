import auth from "../../../src/auth/authenticate";

var expect = require('chai').expect;

describe('AuthTest', () => {
    it('auth', () => {
        auth("http://localhost:3000", "metabase@example.com", "!abcd1234");
    });
});