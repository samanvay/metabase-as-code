const Promise = require("bluebird");
const join = Promise.join;
const gateway = require("./gateway");
const urls = require("./urls");
const _ = require("lodash");
const fields = require("./fields");

const findDatabaseByName = (context) => {
    return gateway.get(urls.createUrl(context.url, urls.DATABASE), context.authToken)
        .then((results) => {
            return _.find(results, (result) => result.name === context.database)
        });
};

const metadata = (context) => {
    return findDatabaseByName(context)
        .then((dbInstance) => {
            return gateway.get(urls.createUrl(context.url, `${urls.DATABASE}/${dbInstance.id}/metadata`), context.authToken);
        });
};

const tables = (context) => {
    return metadata(context).then((database) => {
        return {
            databaseId: database.id,
            tables: _.map(database.tables, (table) => {
                return {name: table.name, id: table.id, fields: table.fields}
            })
        };
    });
};

const syncDatabase = (sourceContext, targetContext) => {
    join(tables(sourceContext), tables(targetContext), (sourceTables, targetTables) => {
        fields.syncFields(_.merge({}, sourceTables, sourceContext), _.merge({}, targetTables, targetContext));
    });
};

module.exports = {
    findDatabaseByName: findDatabaseByName,
    metadata: metadata,
    tables: tables,
    syncDatabase: syncDatabase
};
