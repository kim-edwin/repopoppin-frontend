import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./NewHome.css";
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
    Grid,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
    getCommingStores,
    getNearStores,
    getRecommend,
    getTopStores,
} from "../api";
import SwipeStore from "../components/SwipeStore";
import svg001 from "../sources/carousel/001.svg";
import svg002 from "../sources/carousel/002.svg";
import svg003 from "../sources/carousel/003.svg";
import { MdOutlineLocationSearching } from "react-icons/md";
import SwipeNearStore from "../components/SwipeNearStore";
import { Link } from "react-router-dom";
import useUser from "../lib/useUser";
import StoreSkeleton from "../components/StoreSkeleton";
import NewStore from "../components/NewStore";
import NewSkeleton from "../components/NewSkeleton";

// import "./styles.css";

export default function NewHome() {
    const { userLoading, isLoggedIn, user } = useUser();

    const { isLoading, data, refetch } = useQuery<IStore[]>(
        ["topstores"],
        () => getTopStores(), // 페이지 번호 1로 초기 데이터를 가져옴
        {
            refetchOnMount: false, // 컴포넌트가 마운트될 때만 쿼리를 새로고침하지 않음
        },
    );

    const {
        isLoading: isLoadingComm,
        data: Commingdata,
        refetch: refetchComm,
    } = useQuery<IStore[]>(
        ["comming"],
        () => getCommingStores(), // 페이지 번호 1로 초기 데이터를 가져옴
        {
            refetchOnMount: false, // 컴포넌트가 마운트될 때만 쿼리를 새로고침하지 않음
        },
    );

    const {
        isLoading: isLoadingRecommend,
        data: Recommenddata,
        refetch: refetchRecommend,
    } = useQuery<IStore[]>(
        ["recommend"],
        () => getRecommend(), // 페이지 번호 1로 초기 데이터를 가져옴
        {
            refetchOnMount: false, // 컴포넌트가 마운트될 때만 쿼리를 새로고침하지 않음
        },
    );

    const grid_px = useBreakpointValue({ base: "20px", md: "300px" });
    const pngFiles = [
        { image: svg001, storeid: 6316 },
        { image: svg002, storeid: 6315 },
        { image: svg003, storeid: 6086 },
    ];

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

    const grid_column_gap = useBreakpointValue({
        base: "30px",
        md: "40px",
    });
    
    const grid_template_column = useBreakpointValue({
        base: "1fr",
        md: "repeat(3, 1fr)",
    });

    return (
        <Box pt={100} pb={15} px={grid_px}>
            <Swiper
                modules={[Autoplay]}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
            >
                {pngFiles.map(({ image, storeid }, index) => (
                    <SwiperSlide key={index}>
                        <Link to={`/stores/${storeid}`}>
                            <Image
                                position={"relative"}
                                boxSize="100%"
                                // objectFit="cover"
                                src={image}
                                alt={`Image ${index + 1}`}
                                zIndex={1}
                            />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
            <Heading size={"md"} mt={10} mb={5}>
                가장 많이 보고 있어요 👀
            </Heading>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                rewind={true}
                navigation={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                spaceBetween={10}
                slidesPerView={1}
                className={`
                            w-[20rem] h-[10rem] md:w-[30rem] md:h-[15rem] lg:w-[61rem] my-6 max-w-[500px] md:max-w-[976px] max-h-[15rem] 
                            `}
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

            {isLoggedIn ? (
                <>
                    <Heading size={"md"} mt={10} mb={5}>
                        {user?.name}님을 위한 맞춤📌 팝업스토어
                    </Heading>
                    <Grid
                        w="100%"
                        mb={20}
                        columnGap={grid_column_gap}
                        rowGap={5}
                        templateColumns={grid_template_column}
                        style={{ gridAutoRows: "auto", overflow: "hidden" }}
                    >
                        {isLoading &&
                            Array.from({ length: 5 }).map((_, index) => (
                                <NewSkeleton key={index} />
                            ))}
                        {Recommenddata?.map((store) => (
                            <NewStore
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
                        ))}
                    </Grid>
                </>
            ) : null}
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
            <Grid
                w="100%"
                mb={20}
                columnGap={grid_column_gap}
                rowGap={5}
                templateColumns={grid_template_column}
                style={{ gridAutoRows: "auto", overflow: "hidden" }}
            >
                {isLoading &&
                    Array.from({ length: 5 }).map((_, index) => (
                        <NewSkeleton key={index} />
                    ))}
                {nearStores?.map((store) => (
                    <NewStore
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
                ))}
            </Grid>

            <Heading size={"md"} mt={10} mb={5}>
                커밍 쑨! 조만간 열려요 🏃‍♀️🏃‍♂️
            </Heading>
            <Grid
                w="100%"
                mb={10}
                columnGap={grid_column_gap}
                rowGap={5}
                templateColumns={grid_template_column}
                style={{ gridAutoRows: "auto", overflow: "hidden" }}
            >
                {isLoading &&
                    Array.from({ length: 5 }).map((_, index) => (
                        <NewSkeleton key={index} />
                    ))}
                {Commingdata?.map((store) => (
                    <NewStore
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
                ))}
            </Grid>
            
            <Link to="/all">
                <Button
                    colorScheme="pink"
                    variant="outline"
                    width={"100%"}
                >
                    모든 팝업스토어 보기
                </Button>
            </Link>
        </Box>
    );
}
