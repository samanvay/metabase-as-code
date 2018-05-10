const Client = require('../Client');

class AllGroups {
    static add(group) {
        return Client.post("permissions/group", group);
    }
}

module.exports = AllGroups;