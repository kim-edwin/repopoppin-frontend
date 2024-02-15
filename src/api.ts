import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/",
    // baseURL: "http://13.209.106.73:8000/api/v1/",
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

export const logOut = () =>
    instance
        .post(`users/log-out`, null, {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        })
        .then((response) => response.data);

export const githubLogIn = (code: string) =>
    instance
        .post(
            `/users/github`,
            { code },
            {
                headers: {
                    "X-CSRFToken": Cookie.get("csrftoken") || "",
                },
            },
        )
        .then((response) => response.status);