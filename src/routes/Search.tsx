import {
    Button,
    Grid,
    Stack,
    Heading,
    VStack,
    useBreakpointValue,
    Box,
    Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import StoreSkeleton from "../components/StoreSkeleton";
import Store from "../components/Store";
import { FaHome } from "react-icons/fa";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { getSearch } from "../api";

const Search: React.FC = () => {
    const location = useLocation();
    const { keyword, upperAddrName, middleAddrName, searchDate, isEnd } =
        location.state || {};
    const [searchData, setSearchData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const grid_template_column = useBreakpointValue({
        base: "1fr",
        md: "repeat(3, 1fr)",
    });
    const grid_px = useBreakpointValue({ base: "20px", md: "300px" });
    const grid_column_gap = useBreakpointValue({ base: "30px", md: "40px" });

    useEffect(() => {
        // 이전 페이지에서 전달한 검색 결과 데이터를 가져옴
        const searchDataFromPreviousPage = location.state?.searchData;
        if (searchDataFromPreviousPage) {
            setSearchData(searchDataFromPreviousPage);
        }
    }, [location.state]);

    useEffect(() => {
        // 최초 렌더링 시에는 검색 데이터를 가져오지 않음
        if (page !== 1) {
            // 검색 결과 데이터를 가져오는 함수
            const fetchSearchData = async () => {
                setIsLoading(true); // 로딩 상태를 true로 변경
                try {
                    const data = await getSearch(
                        keyword,
                        upperAddrName,
                        middleAddrName,
                        searchDate,
                        page,
                        isEnd,
                    );
                    setSearchData(data); // 검색 결과 데이터를 설정
                } catch (error) {
                    console.error("Error fetching search data:", error);
                } finally {
                    setIsLoading(false); // 로딩 상태를 false로 변경
                }
            };

            fetchSearchData(); // 검색 결과 데이터를 가져오는 함수 호출
        }
    }, [keyword, upperAddrName, middleAddrName, searchDate, page]);

    const gridRef = useRef<HTMLDivElement | null>(null); // Grid의 ref 추가

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1); // 페이지 번호를 1 증가시킴
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1); // 페이지 번호를 1 감소시킴
        }
    };

    const handle1stPage = () => {
        setPage(1); // 페이지 번호를 1로 만듦
        // 페이지가 변경될 때마다 Grid의 시작점으로 자동 스크롤
        if (gridRef.current) {
            gridRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    useEffect(() => {
        // 페이지 번호가 변경될 때만 스크롤 동작을 수행

        if (gridRef.current) {
            gridRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [page]);

    return (
        <Box pt={100} px={grid_px} ref={gridRef}>
            <Heading pb={10}>검색 결과</Heading>
            {keyword !== "" ? (
                <Text> 📌 "{keyword}" 키워드로 검색한 결과입니다. </Text>
            ) : (
                <Text> 📌 키워드로 검색해보세요!</Text>
            )}
            {searchDate !== "" ? (
                <Text> 📌 방문 일자는 {searchDate}입니다. </Text>
            ) : (
                <Text> 📌 방문할 일자를 넣어 검색해보세요!</Text>
            )}
            {upperAddrName !== "" ? (
                <Text>
                    📌 방문 지역은 {upperAddrName} {middleAddrName}입니다.
                </Text>
            ) : (
                <Text> 📌 지역으로 검색해보세요!</Text>
            )}
            <Grid
                w="100%"
                mt={10}
                mb={20}
                pt={10}
                columnGap={grid_column_gap}
                rowGap={20}
                templateColumns={grid_template_column}
                style={{ gridAutoRows: "auto", overflow: "hidden" }}
            >
                {isLoading &&
                    Array.from({ length: 9 }).map((_, index) => (
                        <StoreSkeleton key={index} />
                    ))}
                {searchData?.map((store) => (
                    <Store
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
            <Stack
                justifyContent={"center"}
                direction="row"
                spacing={4}
                mb={30}
            >
                <Button
                    onClick={handle1stPage}
                    leftIcon={<FaHome />}
                    colorScheme="pink"
                    variant="outline"
                >
                    Home
                </Button>
                <Button
                    onClick={handlePreviousPage}
                    leftIcon={<ArrowBackIcon />}
                    colorScheme="pink"
                    variant="outline"
                    display={page === 1 ? "none" : "block"} // 페이지가 1일 때는 버튼을 숨김
                >
                    Previous
                </Button>
                <Button
                    onClick={handleNextPage}
                    rightIcon={<ArrowForwardIcon />}
                    colorScheme="pink"
                    variant="solid"
                    display={searchData.length < 9 ? "none" : "block"}
                >
                    Next
                </Button>
            </Stack>
        </Box>
    );
};
export default Search;
