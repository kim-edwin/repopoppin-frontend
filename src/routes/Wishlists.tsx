import { Box, Button, Flex, Grid, Heading, Text, useDisclosure } from "@chakra-ui/react";
import ProtectedPage from "../components/Protectedpage";
import { useQuery } from "@tanstack/react-query";
import { getWishlists, postWishlist } from "../api";
import WishlistBox from "../components/WishlistBox";
import CreateWishlistModal from "../components/CreatWishlistModal";
import { useState } from "react";

export default function Wishlists() {
    const { isLoading, data } = useQuery<IWishlist[]>(["wishlists"], () =>
        getWishlists(),
    );

    const { isOpen, onOpen, onClose } = useDisclosure();
    // const [newWishlistName, setNewWishlistName] = useState(""); // 새 위시리스트 이름 상태 추가

    const handleSaveNewWishlist = async (wishlistName: string) => {
        try {
            console.log("새로운 위시리스트 이름:", wishlistName);
            // API로 위시리스트 이름을 전송
            await postWishlist({ name: wishlistName });
            console.log("위시리스트가 성공적으로 생성되었습니다.");
            // 필요한 경우 성공 메시지를 표시하거나 다른 작업을 수행할 수 있습니다.
        } catch (error) {
            console.error("위시리스트 생성 중 오류가 발생했습니다:", error);
            // 에러 처리 로직 추가
        }

    };

    return (
        <ProtectedPage>
            <Box px={{ base: 10, lg: 40 }} py={{ base: 10, lg: 20 }}>
                <Heading>위시리스트</Heading>
                <Flex justify="space-between" alignItems="center" mr={40}>
                    <Text></Text>
                    <Button onClick={onOpen}>위시리스트 생성하기</Button>
                </Flex>
                <Grid
                    mt={10}
                    mb={20}
                    px={{
                        base: 10,
                        lg: 40,
                    }}
                    rowGap={10}
                    templateColumns={"1fr"}
                    style={{ gridAutoRows: "auto", overflow: "hidden" }}
                >
                    {data?.slice().reverse().map((wishlist) => (
                        <WishlistBox
                            key={wishlist.pk}
                            pk={wishlist.pk}
                            name={wishlist.name}
                            stores={wishlist.stores}
                        />
                    ))}
                </Grid>
            </Box>
            <CreateWishlistModal
                isOpen={isOpen}
                onClose={onClose}
                onSave={handleSaveNewWishlist}
            />
        </ProtectedPage>
    );
}
