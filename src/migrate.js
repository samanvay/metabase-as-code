const authenticate = require("./authenticate");
const Promise = require("bluebird");
const join = Promise.join;
const database = require("./database");

const authenticateSourceAndDestination = (args) => {

    // return new Promise((resolve) => {
    //     resolve(
    //         {
    //             source: {
    //                 url: 'http://localhost:3000',
    //                 authToken: '182fa799-ca39-48cb-af8e-95b960c8ee52',
    //                 database: 'OpenCHS'
    //             },
    //             target: {
    //                 url: 'http://localhost:3001',
    //                 authToken: '5f46b1ed-87e2-41a2-b46f-de213f0debfc',
    //                 database: 'OpenCHS'
    //             }
    //         }
    //     )
    // });

    let sourceAuth = authenticate(args.sourceUrl, args.sourceLogin, args.sourcePassword);
    let destAuth = authenticate(args.targetUrl, args.targetLogin, args.targetPassword);
    return join(sourceAuth, destAuth, (sourceSession, targetSession) => {
        return {
            source: {url: args.sourceUrl, authToken: sourceSession, database: args.sourceDatabase},
            target: {url: args.targetUrl, authToken: targetSession, database: args.targetDatabase}
        }
    });
};

const migrate = (args) => {
    authenticateSourceAndDestination(args).then((authSession) => {
        // console.log(authSession)
        database.syncDatabase(authSession.source, authSession.target);
    });
};

module.exports = migrate;