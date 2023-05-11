import axios from "axios";

const apiUrl: string = "https://api.novaposhta.ua/v2.0/json/";
const apiKey: string = "c82fcfbcaaaa24f5a95db213527a2561";

class NovaPostService {
    static async getSettlementsBySearchValue(searchValue: string): Promise<string[]> {
        const receivedSettlements = await axios({
            url: apiUrl,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                apiKey: apiKey,
                modelName: "Address",
                calledMethod: "searchSettlements",
                methodProperties: {
                    CityName: searchValue,
                    Limit: "10"
                }
            }
        })
            .then(response => response.data.data[0].Addresses)
            .then(addresses => addresses.map((address: { Present: string }) => (address.Present)));

        return receivedSettlements;
    }

    static async getSettlementRefBySearchValue(fullSettlementName: string): Promise<string> {
        const receivedSettlementRef = await axios({
            url: apiUrl,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                apiKey: apiKey,
                modelName: "Address",
                calledMethod: "searchSettlements",
                methodProperties: {
                    CityName: fullSettlementName,
                    Limit: "1"
                }
            }
        })
            .then(response => response.data.data[0].Addresses[0].DeliveryCity);

        console.log(receivedSettlementRef)
        return receivedSettlementRef;
    }

    static async getDepartmentsByCityRef(cityRef: string): Promise<string[]> {
        const receivedDepartments = await axios({
            url: apiUrl,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                apiKey: apiKey,
                modelName: "Address",
                calledMethod: "getWarehouses",
                methodProperties: {
                    CityRef: cityRef,
                    TypeOfWarehouseRef: "841339c7-591a-42e2-8233-7a0a00f0ed6f"
                }
            }
        })
            .then(response => response.data.data)
            .then(departmentsFullInfo => departmentsFullInfo.map((departmentDescription: { Description: string; }) => departmentDescription.Description));

        return receivedDepartments;
    };
}

export default NovaPostService;