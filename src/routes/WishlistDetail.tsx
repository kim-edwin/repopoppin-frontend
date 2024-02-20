import { Box, Heading } from "@chakra-ui/react";
import ProtectedPage from "../components/Protectedpage";

export default function WishlistDetail() {
    return (
        <ProtectedPage>
            <Box>
                <Heading>위시리스트 디테일 ~</Heading>
            </Box>
        </ProtectedPage>
    );
}
