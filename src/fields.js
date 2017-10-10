const urls = require("./urls");
const gateway = require("./gateway");
const Promise = require("bluebird");
const join = Promise.join;
const _ = require("lodash");

const getTableFields = (context, table) => {
    return gateway.get(`${context.url}/api/table/${table.id}/query_metadata`, context.authToken)
        .then((table) => table.fields);
};

const findByName = (items, item) => {
    return _.find(items, (it) => it.name === item.name);
};


const syncFields = (sourceContext, targetContext) => {
    const findTargetField = (sourceField, sourceTable) => {
        return findByName(findByName(targetContext.tables, sourceTable).fields, sourceField);
    };

    _.map(sourceContext.tables, (table) => {
        join(getTableFields(sourceContext, table), getTableFields(targetContext, findByName(targetContext.tables, table)),
            (sourceTableFields, targetTableFields) => {
                const fieldValuesToBeUpdated = _.map(sourceTableFields, (sourceTableField) => {
                    const targetTableField = findByName(targetTableFields, sourceTableField);
                    const fieldValueToBeUpdated = {
                        id: targetTableField.id,
                        description: sourceTableField.description,
                        special_type: sourceTableField.special_type,
                        caveats: sourceTableField.caveats,
                        fk_target_field_id: findTargetField(sourceTableField, table).id,
                        visibility_type: sourceTableField.visibility_type,
                        preview_display: sourceTableField.preview_display,
                        display_name: sourceTableField.display_name
                    };
                    return fieldValueToBeUpdated;
                });

                return Promise.all(_.map(fieldValuesToBeUpdated, (fieldValueToBeUpdated) => {
                    gateway.put(`${targetContext.url}/api/field/${fieldValueToBeUpdated.id}`, fieldValueToBeUpdated, targetContext.authToken)
                }));
            }
        );
    })
};

module.exports.syncFields = syncFields;

