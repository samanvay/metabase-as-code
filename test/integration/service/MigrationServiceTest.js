const _ = require("lodash");
const MigrationService = require("../../../src/service/MigrationService");
const AllGroups = require("../../../src/repository/AllGroups");
const AllDashboards = require("../../../src/repository/AllDashboards");
const Group = require("../../../src/domain/Group");
const Tester = require("../Tester");

describe('MigrationServiceTest', () => {
    let states = ["Telangana", "Puducherry", "Odisha", "A and N Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttarakhand", "Uttar Pradesh", "West Bengal", "Chandigarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Lakshadweep"];

    it('copyCollection', () => {
        Tester.login().then(() => {
            states.forEach((state) => {
                MigrationService.copyQuestionCollection("State Laqshya Questions", `${state} Laqshya Questions`);
            });
        });
    });

    it('copy questions from one collection to another collection', function () {
        Tester.login().then(() =>
            states.forEach((state) => {
                MigrationService.copyQuestionsFromOneCollectionToAnotherCollection("State Laqshya Questions", `${state} Laqshya Questions`, (question) => question.name === 'Recent Assessments', (name, query) => {
                    let returnValues = {};
                    returnValues.name = name;
                    returnValues.query = query.replace("'Karnataka'", `'${state}'`);
                    return returnValues;
                });
            }));
    });

    it('copy dashboards', function () {
        Tester.login().then(() =>
            _.reduce(states,
                (acc, state) => acc.then(() => MigrationService.createDashboardFromTemplate("State - Laqshya - NQAS", "State Laqshya Questions", `${state} - Laqshya - NQAS`, '', `${state} Laqshya Questions`)), Promise.resolve()));
    });

    it('archive dashboards', function () {
        Tester.login().then(() => {
            _.reduce(states, (acc, state) => acc.then(() => AllDashboards.find(`${state} - Laqshya - NQAS`).then((dashboard) => AllDashboards.archive(dashboard))), Promise.resolve());
        });
    });

    it('create group', function () {
        Tester.login().then(() => {
            _.reduce(states,
                (acc, state) => acc.then(() => AllGroups.add(Group.create(state))), Promise.resolve());
        });
    });
});