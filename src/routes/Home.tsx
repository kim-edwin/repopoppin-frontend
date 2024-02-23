import {
    Button,
    Grid,
    Stack,
    VStack,
    useBreakpointValue,
} from "@chakra-ui/react";
import Store from "../components/Store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import StoreSkeleton from "../components/StoreSkeleton";
import { getStores } from "../api";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { FaHome } from "react-icons/fa";

export default function Home() {
    const [page, setPage] = useState(1);
    const { isLoading, data, refetch } = useQuery<IStore[]>(
        ["stores"],
        () => getStores(page), // 페이지 번호 1로 초기 데이터를 가져옴
        {
            refetchOnMount: false, // 컴포넌트가 마운트될 때만 쿼리를 새로고침하지 않음
        },
    );

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
    };

    useEffect(() => {
        const fetchData = async () => {
            await refetch();
            // 페이지가 변경될 때마다 Grid의 시작점으로 자동 스크롤
            if (gridRef.current) {
                gridRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        };

        fetchData();
        console.log("page num: " + page);
    }, [page, gridRef.current]);

    const grid_template_column = useBreakpointValue({
        base: "1fr 1fr",
        md: "repeat(4, 1fr)",
    });
    const grid_px = useBreakpointValue({ base: "20px", md: "40px" });
    const grid_column_gap = useBreakpointValue({ base: "20px", md: "40px" });

    return (
        <VStack>
            <Grid
                ref={gridRef}
                w="100%"
                mt={10}
                mb={20}
                px={grid_px}
                columnGap={grid_column_gap}
                rowGap={20}
                templateColumns={grid_template_column}
                style={{ gridAutoRows: "auto", overflow: "hidden" }}
            >
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
    );
}
