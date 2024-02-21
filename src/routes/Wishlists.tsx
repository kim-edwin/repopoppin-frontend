import {
    Box,
    Button,
    Flex,
    Grid,
    Heading,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import ProtectedPage from "../components/Protectedpage";
import { useQuery } from "@tanstack/react-query";
import { getWishlists, postWishlist } from "../api";
import CreateWishlistModal from "../components/CreatWishlistModal";
import WishlistBox from "../components/WishlistBox";

export default function Wishlists() {
    const { data, refetch } = useQuery<IWishlist[]>(
        ["wishlists"],
        () => getWishlists(),
    );

    const reloadWishlists = async () => {
        await refetch();
        console.log("다시 불러옴 !");
    };

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleSaveNewWishlist = async (wishlistName: string) => {
        try {
            await postWishlist({ name: wishlistName });
            reloadWishlists();
        } catch (error) {
            console.error("위시리스트 생성 중 오류가 발생했습니다:", error);
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
                    {data
                        ?.slice()
                        .reverse()
                        .map((wishlist) => (
                            <WishlistBox
                                key={wishlist.pk}
                                pk={wishlist.pk}
                                name={wishlist.name}
                                stores={wishlist.stores}
                                reloadWishlists={reloadWishlists}
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
