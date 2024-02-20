import { Box, Button, Grid, Heading, Stack, VStack } from "@chakra-ui/react";
import ProtectedPage from "../components/Protectedpage";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getWishlist } from "../api";
import Store from "../components/Store";
import { FaHome } from "react-icons/fa";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function WishlistDetail() {
    const { wishlistPk } = useParams();
    const { isLoading, data } = useQuery<IWishlist>(
        [`wishlists`, wishlistPk],
        getWishlist,
    );
    const wishstores = data?.stores
    const [page, setPage] = useState(1);
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

    if (!wishstores) {
        return null; // 데이터가 로드되지 않았을 때는 null을 반환하여 렌더링을 하지 않음
    }

    return (
        <ProtectedPage>
            <VStack>
                <Grid
                    w="100%"
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
                    style={{ gridAutoRows: "auto", overflow: "hidden" }}
                >
                    {wishstores
                        .slice()
                        .reverse()
                        .map((store) => (
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
        </ProtectedPage>
    );
}
