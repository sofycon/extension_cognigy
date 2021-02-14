"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extension_tools_1 = require("@cognigy/extension-tools");
const getAnlage_1 = require("./nodes/getAnlage");
const default_1 = require("./connections/default");
exports.default = extension_tools_1.createExtension({
    nodes: [
        getAnlage_1.getAnlage
    ],
    connections: [
        default_1.defaultConnection
    ]
});
//# sourceMappingURL=module.js.map