import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/",
    withCredentials: true,
});

export const getStores = () =>
    instance.get("stores/").then((response) => response.data);

export const getStore = ({ queryKey }: QueryFunctionContext) => {
    const [_, storePk] = queryKey;
    return instance.get(`stores/${storePk}`).then((response) => response.data);
};

export const getStoreReviews = ({ queryKey }: QueryFunctionContext) => {
    const [_, storePk] = queryKey;
    return instance
        .get(`stores/${storePk}/reviews`)
        .then((response) => response.data);
};

export const getMe = () =>
    instance.get(`users/me`).then((response) => response.data);
