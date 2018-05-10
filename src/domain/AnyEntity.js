const _ = require("lodash");
const _PropertiesToUnsetForNew = ["creator", "created_at", "creator_id", "updated_at"];

class AnyEntity {
    static unsetFromArray(obj, paths) {
        paths.forEach(path => {
            _.unset(obj, path);
        });
    }

    static unsetPropertiesForNew(anyEntity) {
        AnyEntity.unsetFromArray(anyEntity, _PropertiesToUnsetForNew);
    }
}

module.exports = AnyEntity;