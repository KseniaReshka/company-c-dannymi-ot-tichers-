import httpService from "./http.service";

const userEndpoint = "user/";

const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    create: async (payloat) => {
        const { data } = await httpService.put(userEndpoint + payloat._id, payloat);
        return data;
    }
};
export default userService;
