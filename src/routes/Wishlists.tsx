import { Box, Grid, Heading } from "@chakra-ui/react";
import ProtectedPage from "../components/Protectedpage";
import { useQuery } from "@tanstack/react-query";
import { getWishlists } from "../api";
import WishlistBox from "../components/WishlistBox";

export default function Wishlists() {
    const { isLoading, data } = useQuery<IWishlist[]>(
        ["wishlists"],
        () => getWishlists(),
    );

    return (
        <ProtectedPage>
            <Box px={{ base: 10, lg: 40 }} py={{ base: 10, lg: 20 }}>
                <Heading>Wishlists</Heading>
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
                    }}
                    style={{ gridAutoRows: "auto", overflow: "hidden" }}
                >
                    {data?.map((wishlist) => (
                        <WishlistBox
                            key={wishlist.pk}
                            pk={wishlist.pk}
                            name={wishlist.name}
                            stores={wishlist.stores}
                        />
                    ))}
                </Grid>
            </Box>
        </ProtectedPage>
    );
}
