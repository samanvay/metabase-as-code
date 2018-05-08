const _ = require("lodash");
const _PropertiesToUnsetForNew = ["creator", "created_at", "creator_id", "updated_at"];
const _PropertiesToUnsetForSubEntityForNew = ["created_at", "updated_at"];

class AnyEntity {
    static unsetFromArray(obj, paths) {
        paths.forEach(path => {
            _.unset(obj, path);
        });
    }

    static unsetPropertiesForNew(anyEntity) {
        AnyEntity.unsetFromArray(anyEntity, _PropertiesToUnsetForNew);
    }

    static unsetPropertiesForSubEntityForNew(anyEntity) {
        AnyEntity.unsetFromArray(anyEntity, _PropertiesToUnsetForSubEntityForNew);
    }
}

module.exports = AnyEntity;