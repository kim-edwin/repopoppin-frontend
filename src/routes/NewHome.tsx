import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import { Box, Heading } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getStores } from "../api";
import Store from "../components/Store";
import SwipeStore from "../components/SwipeStore";

// import "./styles.css";

export default function NewHome() {
    const [page, setPage] = useState(1);
    const { isLoading, data, refetch } = useQuery<IStore[]>(
        ["stores"],
        () => getStores(page), // 페이지 번호 1로 초기 데이터를 가져옴
        {
            refetchOnMount: false, // 컴포넌트가 마운트될 때만 쿼리를 새로고침하지 않음
        },
    );
    return (
        <>
            <Swiper
                pagination={true}
                // modules={[Pagination]}
                className="mySwiper"
            >
                {data?.map((store) => (
                    <SwiperSlide>
                            <SwipeStore
                                key={store.id}
                                pk={store.pk}
                                thumbnail={store.thumbnail}
                                p_name={store.p_name}
                                // rating={store.rating}
                                p_location={store.p_location}
                                p_hashtag={store.p_hashtag}
                                p_startdate={store.p_startdate}
                                p_enddate={store.p_enddate}
                                status={store.status}
                                // is_liked={store.is_liked}
                            />
                    </SwiperSlide>
                ))}
                <SwiperSlide>
                    <Heading> Hello?</Heading>
                </SwiperSlide>
            </Swiper>
        </>
    );
}
