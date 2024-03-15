import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import {
    Box,
    Heading,
    VStack,
    useBreakpointValue,
    Image,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getStores } from "../api";
import SwipeStore from "../components/SwipeStore";
import png001 from "../sources/carousel/001.png";
import png002 from "../sources/carousel/002.png";
import png003 from "../sources/carousel/003.png";
import png004 from "../sources/carousel/004.png";

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
    const grid_px = useBreakpointValue({ base: "20px", md: "300px" });
    const pngFiles = [png001, png002, png003, png004];
    return (
        <Box pt={15} px={grid_px}>
            <Swiper
                modules={[Autoplay]}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
            >
                {pngFiles.map((image, index) => (
                    <SwiperSlide key={index}>
                        <Image
                            position={"relative"}
                            boxSize="100%"
                            // objectFit="cover"
                            src={image}
                            alt={`Image ${index + 1}`}
                            zIndex={1}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Heading size={"md"} mb={5}>
                지금 가장 🔥핫🔥한 팝업스토어{" "}
            </Heading>
            <Swiper
                pagination={true}
                // modules={[Pagination]}
                className="mySwiper"
            >
                {data?.map((store) => (
                    <SwiperSlide key={store.id}>
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
            </Swiper>
            <Heading size={"md"} mt={20} mb={5}>
                내 주변 가까운 팝업스토어
            </Heading>
            <Swiper
                pagination={true}
                // modules={[Pagination]}
                className="mySwiper"
            >
                {data?.map((store) => (
                    <SwiperSlide key={store.id}>
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
            </Swiper>
            <Heading size={"md"} mt={20} mb={5}>
                커밍 쑨! 조만간 열려요
            </Heading>
            <Swiper
                pagination={true}
                // modules={[Pagination]}
                className="mySwiper"
            >
                {data?.map((store) => (
                    <SwiperSlide key={store.id}>
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
            </Swiper>
        </Box>
    );
}
