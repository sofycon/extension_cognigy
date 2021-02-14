import { createNodeDescriptor, INodeFunctionBaseParams } from "@cognigy/extension-tools";
import axios from 'axios';

const API_SERVER = 'https://mametis.de:90/apiservice/v1/';
const API_ROUTE_ANLAGEDATEN = 'project/anlage/daten';
// set params
export interface IGetEntityParams extends INodeFunctionBaseParams {
    config: {
        storeLocation: string;
        contextKey: string;
        inputKey: string;
    };
}
// @ts-ignore
export const getAnlage = createNodeDescriptor({
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
    function: async ({ cognigy, config }: IGetEntityParams) => {
        const { api } = cognigy;
        const { storeLocation, contextKey, inputKey } = config;
    try {
            const response = await axios({
                method: 'get',
                url: API_SERVER + API_ROUTE_ANLAGEDATEN ,
                headers: {
                    'Content-Type': 'application/json',
                    'Allow': 'application/json',
                    'x-api-key' : 'YLyvhTlzIC6t4lF_PeKMdCUfFLMUHmPsTjOFtztbXsc'
                },
                params: {
                    projectName: 'Muster_Storm_V11_a',
                    anlage: '100021'
                }
            });

            if (storeLocation === "context") {
                api.addToContext(contextKey, response.data, "simple");
            } else {
                // @ts-ignore
                api.addToInput(inputKey, response.data);
            }
        } catch (error) {
           // @ts-ignore
            api.addToContext(error.message);
        }
    }
});