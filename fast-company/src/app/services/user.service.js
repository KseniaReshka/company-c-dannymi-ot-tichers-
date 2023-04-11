import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const userEndpoint = "user/";

const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            userEndpoint + payload._id,
            payload
        );
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(
            userEndpoint + localStorageService.getUserId()
        );
        return data;
    },
    apdateUser: async (content) => {
        const { data } = await httpService.get(
            userEndpoint + localStorageService.getUserId()
        );
        const apdateData=await httpService.put(
            userEndpoint + data._id,[...data,content]
            
        )
        return apdateData;
    }
};
export default userService;
