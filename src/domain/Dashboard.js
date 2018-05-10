const AnyEntity = require("./AnyEntity");
const _ = require("lodash");

class Dashboard {
    static cloneForNew(dashboard, clonedDashboardName, newDashboardDescription) {
        let clone = Object.assign({}, dashboard);
        AnyEntity.unsetPropertiesForNew(clone);
        _.unset(clone, "id");
        _.unset(clone, "ordered_cards");
        clone.name = clonedDashboardName;
        clone.description = newDashboardDescription;
        clone.parameters = [];
        dashboard.parameters.forEach((parameter) => {
            let clonedParameter = Object.assign({}, parameter);
            clone.parameters.push(clonedParameter);
        });
        return clone;
    }

    static getCards(dashboard) {
        return dashboard["ordered_cards"];
    }

    static id(dashboard) {
        return dashboard["id"];
    }

    static getParameterId(dashboard, slug) {
        let parameter = _.find(dashboard.parameters, (parameter) => parameter.type === slug);
        return _.isNil(parameter) ? null : parameter.id;
    }
}

module.exports = Dashboard;