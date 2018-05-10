const AnyEntity = require("./AnyEntity");
const Question = require("./Question");
const Dashboard = require("./Dashboard");
const _ = require("lodash");

class DashboardCard {
    static createCopy(dashboardCard) {
        let clone = Object.assign({}, dashboardCard);
        AnyEntity.unsetPropertiesForNew(clone);
        _.unset(clone, "card");
        _.unset(clone, "dashboard_id");
        let parameterMappings = dashboardCard["parameter_mappings"];
        if (!_.isNil(parameterMappings)) {
            clone["parameter_mappings"] = [];
            parameterMappings.forEach((parameterMapping) => {
                let clonedParameterMapping = Object.assign({}, parameterMapping);
                _.unset(clonedParameterMapping, "card_id");
                clone["parameter_mappings"].push(clonedParameterMapping);
            });
        }
        return clone;
    }

    static questionId(dashboardCard) {
        return dashboardCard["card_id"];
    }

    static changeQuestion(dashboardCard, question) {
        let questionId = Question.id(question);
        dashboardCard["card_id"] = questionId;
        dashboardCard["parameter_mappings"].forEach((parameterMapping) => {
            parameterMapping["card_id"] = questionId;
        });
    }

    static _getParameterSlug(parameterMapping) {
        return parameterMapping["target"][1][1];
    }

    static placeOn(dashboardCard, dashboard) {
        dashboardCard["dashboard_id"] = Dashboard.id(dashboard);
    }

    static isQuestionBased(dashboardCard) {
        return !_.isNil(dashboardCard["card_id"]);
    }
}

module.exports = DashboardCard;