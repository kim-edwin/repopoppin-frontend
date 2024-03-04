import {
    Button,
    Flex,
    Grid,
    Heading,
    Stack,
    Text,
    VStack,
    useBreakpointValue,
} from "@chakra-ui/react";
import ProtectedPage from "../components/Protectedpage";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRecentViews, getWishlist } from "../api";
import Store from "../components/Store";
import { FaHome } from "react-icons/fa";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import StoreSkeleton from "../components/StoreSkeleton";

export default function RecentView() {
    const recent_gridRef = useRef<HTMLDivElement | null>(null); // Grid의 ref 추가

    const recent_grid_template_column = useBreakpointValue({
        base: "1fr",
        md: "repeat(3, 1fr)",
    });
    const recent_grid_px = useBreakpointValue({ base: "20px", md: "300px" });
    const recent_grid_column_gap = useBreakpointValue({
        base: "30px",
        md: "40px",
    });

    const [page, setPage] = useState(1);

    const { isLoading, data, refetch } = useQuery<IStore[]>(
        ["stores"],
        () => getRecentViews(page), // 페이지 번호 1로 초기 데이터를 가져옴
    );

    const data_length =
        data?.length === null ? 0 : Number(data?.length);

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
    };

    useEffect(() => {
        const fetchData = async () => {
            await refetch();
            // 페이지가 변경될 때마다 Grid의 시작점으로 자동 스크롤
            if (recent_gridRef.current) {
                recent_gridRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        };

        fetchData();
        console.log("page num: " + page);
    }, [page, recent_gridRef.current]);

    return (
        <ProtectedPage>
            <Flex mt={20} px={recent_grid_px} justifyContent="flex-start">
                <Heading justifyContent="flex-start">
                    최근 조회한 스토어
                </Heading>
            </Flex>
            <Flex mt={5} px={recent_grid_px} justifyContent="flex-start">
                <Text size={"md"}>3일 이내 조회한 스토어만 표시됩니다.</Text>
            </Flex>
            {data_length > 0 ? (
                <VStack>
                    <Grid
                        ref={recent_gridRef}
                        w="100%"
                        mt={10}
                        mb={20}
                        px={recent_grid_px}
                        pt={10}
                        columnGap={recent_grid_column_gap}
                        rowGap={20}
                        templateColumns={recent_grid_template_column}
                        style={{ gridAutoRows: "auto", overflow: "hidden" }}
                    >
                        {isLoading &&
                            Array.from({ length: 9 }).map((_, index) => (
                                <StoreSkeleton key={index} />
                            ))}
                        {data?.map((store) => (
                            <Store
                                key={store.id}
                                pk={store.pk}
                                thumbnail={store.thumbnail}
                                p_name={store.p_name}
                                rating={store.rating}
                                p_location={store.p_location}
                                p_hashtag={store.p_hashtag}
                                p_startdate={store.p_startdate}
                                p_enddate={store.p_enddate}
                                status={store.status}
                                is_liked={store.is_liked}
                            />
                        ))}
                    </Grid>
                    <Stack direction="row" spacing={4} mb={30}>
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
                        >
                            Next
                        </Button>
                    </Stack>
                </VStack>
            ) : (
                <Flex
                    justifyContent="center"
                    alignItems="center"
                    w={"100%"}
                    h={"70vh"}
                >
                    <VStack>
                        <Heading size={"md"}>
                            최근 조회한 스토어가 없습니다!
                        </Heading>
                    </VStack>
                </Flex>
            )}
        </ProtectedPage>
    );
}
