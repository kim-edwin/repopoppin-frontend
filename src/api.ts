import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";

const instance = axios.create({
    // baseURL: "http://127.0.0.1:8000/api/v1",
    baseURL: "https://backend.pop-pin.store/api/v1",
    withCredentials: true,
});

export const getStores = (page: number) =>
    instance.get(`stores/?page=${page}`).then((response) => response.data);

export const getTopStores = () =>
    instance.get(`topstores/`).then((response) => response.data);

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

export const getStoreSim = ({ queryKey }: QueryFunctionContext) => {
    const [_, storePk] = queryKey;
    return instance
        .get(`stores/${storePk}/sim`)
        .then((response) => response.data);
};

export const getNearStores = (userLocation: {
    latitude: number;
    longitude: number;
}) => {
    const params = {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
    };

    return instance
        .get(`stores/near`, { params })
        .then((response) => response.data);
};

export const getCommingStores = () =>
    instance.get(`stores/comming`).then((response) => response.data);

export const getRecommend = () =>
    instance.get(`stores/recommend`).then((response) => response.data);

//로그인 및 로그아웃 시 필요한 api
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

export const kakaoLogin = (code: string) =>
    instance
        .post(
            `/users/kakao`,
            { code },
            {
                headers: {
                    "X-CSRFToken": Cookie.get("csrftoken") || "",
                },
            },
        )
        .then((response) => response.status);

export interface IUsernameLoginVariables {
    username: string;
    password: string;
}

export interface IUsernameLoginSuccess {
    ok: string;
}

export interface IUsernameLoginError {
    error: string;
}

export const usernameLogIn = ({
    username,
    password,
}: IUsernameLoginVariables) =>
    instance.post(
        `users/log-in`,
        { username, password },
        {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        },
    );

export async function signUpUser({
    name,
    username,
    email,
    password,
}: ISignUpVariables) {
    const res = await instance.post(
        `users/create`,
        { name, username, email, password },
        {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        },
    );
    return res.data;
}

export interface IpostReviewVariables {
    pk: number;
    rating: number;
    payload: string;
}

export const postReview = ({ pk, rating, payload }: IpostReviewVariables) =>
    instance.post(
        `stores/${pk}/reviews`,
        { rating, payload },
        {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        },
    );

export const deleteReview = (reviewPk: number) => {
    return instance.delete(`reviews/${reviewPk}`, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
    });
};

export const getWishlist = () =>
    instance.get(`wishlists/`).then((response) => response.data);

interface IpostWishlistVariables {
    name: string;
}

export const postWishlist = ({ name }: IpostWishlistVariables) =>
    instance.post(
        `wishlists/`,
        { name },
        {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        },
    );

export interface IPutWishlistVariables {
    storePk: number;
}

export const putWishlist = ({ storePk }: IPutWishlistVariables) =>
    instance.put(
        `wishlists/stores/${storePk}`,
        {},
        {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        },
    );

export const deleteWishlist = (wishlistPk: number) => {
    return instance.delete(`wishlists/${wishlistPk}`, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
    });
};

interface IpostReportVariables {
    payload: string;
    storePk: number;
}

export const postReport = ({ payload, storePk }: IpostReportVariables) =>
    instance.post(
        `stores/${storePk}/reports`,
        { payload },
        {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        },
    );

export const getRecentViews = (page: number) =>
    instance.get(`recentviews/?page=${page}`).then((response) => response.data);

export const getSearch = (
    keyword: string,
    upperAddrName: string,
    middleAddrName: string,
    searchDate: string,
    page: number,
    isEnd: boolean = true,
) => {
    const params: Record<string, string | number | boolean> = {
        keyword,
        page,
        isEnd,
    };

    if (upperAddrName !== "") {
        params.upperAddrName = upperAddrName;
    }
    if (middleAddrName !== "") {
        params.middleAddrName = middleAddrName;
    }
    if (searchDate !== "") {
        params.searchDate = searchDate;
    }

    return instance
        .get(`stores/search`, { params })
        .then((response) => response.data);
};
