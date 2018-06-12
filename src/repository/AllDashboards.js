const _ = require("lodash");
const Client = require('../Client');
const DashboardCard = require('../domain/DashboardCard');

class AllDashboards {
    static findAll() {
        return Client.getResources("dashboard");
    }

    static find(dashboardName) {
        return AllDashboards.findAll().then((dashboards) => {
            let dashboard = _.find(dashboards, (dashboard) => dashboard.name === dashboardName);
            if (_.isNil(dashboard)) {
                console.log(`No dashboard found with name: ${dashboardName}`);
            }
            return Client.getResource("dashboard", dashboard.id);
        });
    }

    static add(dashboard) {
        return Client.post("dashboard", dashboard);
    }

    static addCard(dashboard, dashboardCard) {
        let subResourceName = `dashboard/${dashboard.id}/cards`;
        return Client.post(subResourceName, {cardId: dashboardCard["card_id"]}).then((createdCard) => {
            dashboardCard.id = createdCard.id;
            let putPayload = {
                "cards": [dashboardCard]
            };
            return Client.put(subResourceName, putPayload);
        });
    }

    static archive(dashboard) {
        return Client.put(`dashboard/${dashboard.id}`, {"archived": true});
    }
}

module.exports = AllDashboards;