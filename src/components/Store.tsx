import {
    Box,
    Button,
    Grid,
    HStack,
    Heading,
    Image,
    Text,
    VStack,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";

export default function Store() {
    const gray = useColorModeValue("gray.600", "gray.300")
    return (
        <VStack spacing={1} alignItems={"flex-start"}>
            <Box>
                <Box
                    position={"relative"}
                    overflow="hidden"
                    mb={2}
                    rounded="3xl"
                >
                    <Image
                        w="100%"
                        h="auto"
                        src="https://file.sportsseoul.com/news/cms/2024/02/11/news-p.v1.20240211.4df48ccaf3114368bc21fa0757fa07fd_P1.jpg"
                        objectFit="contain"
                    />
                    <Button
                        variant={"unstyled"}
                        cursor={"pointer"}
                        position={"absolute"}
                        top={5}
                        right={5}
                        color="white"
                    >
                        <FaRegHeart size="20px" />
                    </Button>
                </Box>
            </Box>
            <Box w="100%">
                <Grid gap={2} templateColumns={"1fr auto"}>
                    <Text as="b" noOfLines={1} fontSize={"md"}>
                        볼보 팝업스토어
                    </Text>
                    <HStack _hover={{
                        color: "red.100",
                    }} spacing={1} justifyContent="flex-end">
                        <FaStar />
                        <Text>5.0</Text>
                    </HStack>
                </Grid>
                <Text fontSize={"md"} color={gray}>
                    스타필드 수원
                </Text>
            </Box>
            <Text fontSize={"sm"} color={gray}>
                <Text as="b">#볼보 #EX30 #전기 SUV</Text>
            </Text>
        </VStack>
    );
}
