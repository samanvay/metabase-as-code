const AnyEntity = require("./AnyEntity");
const _ = require("lodash");

class Dashboard {
    static unsetPropertiesForNew(dashboard) {
        AnyEntity.unsetPropertiesForNew(dashboard);
        _.unset(dashboard, "id");
    }
}

module.exports = Dashboard;