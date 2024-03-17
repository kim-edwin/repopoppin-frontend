import React, { useEffect, useRef, useState } from "react";
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
    Text,
    Button,
    HStack,
    Flex,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getNearStores, getTopStores } from "../api";
import SwipeStore from "../components/SwipeStore";
import png001 from "../sources/carousel/001.png";
import png002 from "../sources/carousel/002.png";
import png003 from "../sources/carousel/003.png";
import png004 from "../sources/carousel/004.png";
import { MdOutlineLocationSearching } from "react-icons/md";
import SwipeNearStore from "../components/SwipeNearStore";

// import "./styles.css";

export default function NewHome() {
    const { isLoading, data, refetch } = useQuery<IStore[]>(
        ["topstores"],
        () => getTopStores(), // 페이지 번호 1로 초기 데이터를 가져옴
        {
            refetchOnMount: false, // 컴포넌트가 마운트될 때만 쿼리를 새로고침하지 않음
        },
    );
    const grid_px = useBreakpointValue({ base: "20px", md: "300px" });
    const pngFiles = [png001, png002, png003, png004];

    const [userLocation, setUserLocation] = useState<{
        latitude: number;
        longitude: number;
    }>({
        latitude: 37.498095,
        longitude: 127.02761, //강남역 위치가 디폴트!
    });

    const {
        isLoading: isLoadingNear,
        data: nearStores,
        refetch: refetchNear,
    } = useQuery<INearStore[]>(
        ["nearstores", userLocation],
        () => getNearStores(userLocation),
        {
            refetchOnMount: false,
        },
    );

    useEffect(() => {
        console.log("stores:", nearStores);
    }, [nearStores]);

    

    const handleGetUserLocation = () => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };

        const success = (pos: GeolocationPosition) => {
            const crd = pos.coords;
            setUserLocation({
                latitude: crd.latitude,
                longitude: crd.longitude,
            });
        };

        const error = (err: GeolocationPositionError) => {
            console.warn(`ERROR(${err.code}): ${err.message}`);
            // 위치를 가져오는데 실패한 경우 기본값을 유지
        };

        navigator.geolocation.getCurrentPosition(success, error, options);
    };

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
            <Flex justify="space-between" align="center" mt={10} mb={5}>
                <Heading size="md">내 주변 가까운 팝업스토어</Heading>
                <Button
                    size={"sm"}
                    leftIcon={<MdOutlineLocationSearching />}
                    onClick={handleGetUserLocation}
                    colorScheme="pink"
                >
                    내 위치
                </Button>
            </Flex>
            <Swiper
                pagination={true}
                // modules={[Pagination]}
                className="mySwiper"
            >
                {nearStores?.map((store) => (
                    <SwiperSlide key={store.id}>
                        <SwipeNearStore
                            key={store.id}
                            pk={store.pk}
                            thumbnail={store.thumbnail}
                            p_name={store.p_name}
                            p_location={store.p_location}
                            p_hashtag={store.p_hashtag}
                            p_startdate={store.p_startdate}
                            p_enddate={store.p_enddate}
                            status={store.status}
                            distance={store.distance}
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
