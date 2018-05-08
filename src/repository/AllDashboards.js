const _ = require("lodash");
const Client = require('../Client');

class AllDashboards {
    static findAll() {
        return Client.getResources("dashboard");
    }

    static find(dashboardName) {
        return AllDashboards.findAll().then((dashboards) => {
            let dashboard = _.find(dashboards, (dashboard) => dashboard.name === dashboardName);
            return Client.getResource("dashboard", dashboard.id);
        });
    }

    static add(dashboard) {
        return Client.post("dashboard", dashboard);
    }

    static addCard(dashboard, sourceCard) {
        let subResourceName = `dashboard/${dashboard.id}/cards`;
        return Client.post(subResourceName, {cardId: sourceCard["card_id"]}).then((createdCard) => {
            sourceCard.id = createdCard.id;
            _.unset(sourceCard, "updated_at");
            _.unset(sourceCard, "card");
            let putPayload = {
                "cards": [sourceCard]
            };
            return Client.put(subResourceName, putPayload);
        });
    }
}

module.exports = AllDashboards;