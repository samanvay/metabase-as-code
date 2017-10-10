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
    if (!item) return null;
    return _.find(items, (it) => it.name === item.name);
};

const findById = (list, id) => {
    return _.find(list, (item) => item.id === id);
};

const syncFields = (sourceContext, targetContext) => {
    const findTargetFieldIdBySourceId = (id) => {
        if (!id) return null;
        const sourceTable = _.find(sourceContext.tables, (table) => _.find(table.fields, (field) => field.id === id));
        const sourceField = _.find(sourceTable.fields, (field) => field.id === id);
        const targetTable = _.find(targetContext.tables, (table) => table.name === sourceTable.name);
        let targetField = _.find(targetTable.fields, (field) => field.name === sourceField.name);
        return _.get(targetField, 'id') || null;
    };

    _.map(sourceContext.tables, (table) => {
        return join(getTableFields(sourceContext, table), getTableFields(targetContext, findByName(targetContext.tables, table)),
            (sourceTableFields, targetTableFields) => {
                const targetFieldsToBeUpdated = _.map(sourceTableFields, (sourceTableField) => {
                    const targetTableField = findByName(targetTableFields, sourceTableField);
                    let fieldValueToBeUpdated = {
                        id: targetTableField.id,
                        description: sourceTableField.description,
                        special_type: sourceTableField.special_type,
                        caveats: sourceTableField.caveats,
                        fk_target_field_id: findTargetFieldIdBySourceId(sourceTableField.fk_target_field_id),
                        visibility_type: sourceTableField.visibility_type,
                        preview_display: sourceTableField.preview_display,
                        display_name: sourceTableField.display_name,
                    };
                    return fieldValueToBeUpdated;
                });

                const updateTargetFields = () => {
                    return Promise.all(_.map(targetFieldsToBeUpdated, (field) => {
                        return gateway.put(`${targetContext.url}/api/field/${field.id}`, field, targetContext.authToken)
                    }));
                };

                const targetDimensionsToBeUpdated = _.compact(_.map(sourceTableFields, (sourceTableField) => {
                    const targetTableField = findByName(targetTableFields, sourceTableField);
                    if (sourceTableField.dimensions === []) return [];
                    if (_.has(sourceTableField, 'dimensions.human_readable_field_id')) {
                        const targetFieldId = findTargetFieldIdBySourceId(sourceTableField.dimensions.human_readable_field_id);

                        return {
                            id: targetTableField.id,
                            name: sourceTableField.dimensions.name,
                            type: sourceTableField.dimensions.type,
                            human_readable_field_id: targetFieldId
                        };
                    }
                }));

                const updateTargetDimensions = () => {
                    return Promise.all(_.map(targetDimensionsToBeUpdated, (dimension) => {
                        return gateway.post(`${targetContext.url}/api/field/${dimension.id}/dimension`, dimension, targetContext.authToken)
                    }))
                };

                return updateTargetFields().then(updateTargetDimensions);
            }
        );
    })
};

module.exports.syncFields = syncFields;

