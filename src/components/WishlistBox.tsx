import { Box, Heading, VStack } from "@chakra-ui/react";

interface IWishlistProps {
    pk: number;
    name: string;
    stores: IStore;
}

export default function WishlistBox({ pk, name, stores }: IWishlistProps) {
    return (
        <VStack spacing={1} alignItems={"flex-start"}>
            <Box w="100%" height="100%">
                <Box
                    position={"relative"}
                    overflow="hidden"
                    mb={2}
                    rounded="3xl"
                >
                    <Heading>name</Heading>
                </Box>
            </Box>
        </VStack>
    );
}
