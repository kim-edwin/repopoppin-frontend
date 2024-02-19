import { Button, Grid, Stack, VStack, useEditable } from "@chakra-ui/react";
import Store from "../components/Store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import StoreSkeleton from "../components/StoreSkeleton";
import { getStores } from "../api";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

export default function Home() {
    const [page, setPage] = useState(1);
    const { isLoading, data, refetch } = useQuery<IStore[]>(
        ["stores"],
        () => getStores(page), // 페이지 번호 1로 초기 데이터를 가져옴
        {
            refetchOnMount: false, // 컴포넌트가 마운트될 때만 쿼리를 새로고침하지 않음
        },
    );

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1); // 페이지 번호를 1 증가시킴
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1); // 페이지 번호를 1 감소시킴
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await refetch();
        };

        fetchData();
    }, [page]); // 페이지 번호가 변경될 때마다 데이터를 다시 가져옴

    return (
        <VStack>
            <Grid
                mt={10}
                mb={20}
                px={{
                    base: 10,
                    lg: 40,
                }}
                columnGap={16}
                rowGap={20}
                templateColumns={{
                    sm: "1fr",
                    md: "1fr 1fr",
                    lg: "repeat(3, 1fr)",
                }}
            >
                {isLoading ? (
                    <>
                        <StoreSkeleton />
                        <StoreSkeleton />
                        <StoreSkeleton />
                        <StoreSkeleton />
                        <StoreSkeleton />
                        <StoreSkeleton />
                        <StoreSkeleton />
                        <StoreSkeleton />
                        <StoreSkeleton />
                    </>
                ) : null}
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
                    />
                ))}
            </Grid>
            <Stack direction="row" spacing={4} mb={30}>
                <Button
                    onClick={handlePreviousPage}
                    leftIcon={<ArrowBackIcon />}
                    colorScheme="teal"
                    variant="outline"
                    display={page === 1 ? "none" : "block"} // 페이지가 1일 때는 버튼을 숨김
                >
                    Previous
                </Button>
                <Button
                    onClick={handleNextPage}
                    rightIcon={<ArrowForwardIcon />}
                    colorScheme="teal"
                    variant="solid"
                >
                    Next
                </Button>
            </Stack>
        </VStack>
    );
}
