interface IStore {
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
}
