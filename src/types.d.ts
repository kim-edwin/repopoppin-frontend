interface IStore {
    id: number;
    pk: number;
    // news_id: string;
    // news_keyword: string;
    // news_feature: string;
    p_name: string;
    p_startdate: Date;
    p_enddate: Date;
    // img_url: string;
    // news_url: string;
    p_location: string;
    p_hashtag: string;
    // p_chucheon: string;
    // is_visible: boolean;
    rating: number;
    status: string;
    thumbnail: string;
    is_liked: boolean;
}

interface IStoreDetail {
    id: number;
    pk: number;
    news_id: string;
    news_keyword: string;
    news_feature: string;
    p_name: string;
    p_startdate: Date;
    p_enddate: Date;
    img_url: string;
    news_url: string;
    p_location: string;
    p_hashtag: string;
    p_chucheon: string;
    is_visible: boolean;
    rating: number;
    status: string;
    thumbnail: string;
    frontLat: number;
    frontLon: number;
    is_liked: boolean;
}

interface IUser {
    last_login: string;
    date_joined: string;
    email: string;
    name: string;
    avatar: string;
    username: string;
}

interface IReview {
    pk: number;
    payload: string;
    rating: number;
    user: IUser;
}

interface ISignUpVariables {
    name: string;
    username: string;
    email: string;
    password: string;
}

interface ISignUpSuccess {
    success: string;
}

interface ISignUpError {
    fail: string;
}

interface IWishlist {
    pk: number;
    name: string;
    stores: IStoreDetail[];
    user: IUser;
}

interface IPutWishlist {
    wishlistPk: number;
    storePk: number;
}