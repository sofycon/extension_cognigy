"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnlage = void 0;
const extension_tools_1 = require("@cognigy/extension-tools");
const axios_1 = require("axios");
const API_SERVER = 'https://mametis.de:90/apiservice/v1/';
const API_ROUTE_ANLAGEDATEN = 'project/anlage/daten';
// @ts-ignore
exports.getAnlage = extension_tools_1.createNodeDescriptor({
    type: "getAnlage",
    defaultLabel: "GET Anlage",
    preview: {
        key: "anlagennummer",
        type: "text"
    },
    fields: [
        {
            key: "storeLocation",
            type: "select",
            label: "Where to store the result",
            params: {
                options: [
                    {
                        label: "Input",
                        value: "input"
                    },
                    {
                        label: "Context",
                        value: "context"
                    }
                ],
                required: true
            },
            defaultValue: "input"
        },
        {
            key: "inputKey",
            type: "cognigyText",
            label: "Input Key to store Result",
            defaultValue: "httprequest",
            condition: {
                key: "storeLocation",
                value: "input"
            }
        },
        {
            key: "contextKey",
            type: "cognigyText",
            label: "Context Key to store Result",
            defaultValue: "httprequest",
            condition: {
                key: "storeLocation",
                value: "context"
            }
        }
    ],
    sections: [
        {
            key: "storageOption",
            label: "Storage Option",
            defaultCollapsed: true,
            fields: [
                "storeLocation",
                "inputKey",
                "contextKey"
            ]
        }
    ],
    form: [
        { type: "section", key: "storageOption" },
    ],
    function: ({ cognigy, config }) => __awaiter(void 0, void 0, void 0, function* () {
        const { api } = cognigy;
        const { storeLocation, contextKey, inputKey } = config;
        try {
            const response = yield axios_1.default({
                method: 'get',
                url: API_SERVER + API_ROUTE_ANLAGEDATEN,
                headers: {
                    'Content-Type': 'application/json',
                    'Allow': 'application/json',
                    'x-api-key': 'YLyvhTlzIC6t4lF_PeKMdCUfFLMUHmPsTjOFtztbXsc'
                },
                params: {
                    projectName: 'Muster_Storm_V11_a',
                    anlage: '100021'
                }
            });
            if (storeLocation === "context") {
                api.addToContext(contextKey, response.data, "simple");
            }
            else {
                // @ts-ignore
                api.addToInput(inputKey, response.data);
            }
        }
        catch (error) {
            // @ts-ignore
            api.addToContext(error.message);
        }
    })
});
//# sourceMappingURL=getAnlage.js.map