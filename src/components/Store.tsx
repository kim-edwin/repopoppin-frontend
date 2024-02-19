import {
    AspectRatio,
    Box,
    Badge,
    Button,
    Grid,
    HStack,
    Image,
    Text,
    VStack,
    useColorModeValue,
} from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

interface StoreProps {
    pk: number;
    thumbnail: string;
    p_name: string;
    rating: number;
    p_location: string;
    p_hashtag: string;
    p_startdate: Date;
    p_enddate: Date;
    status: string;
}

export default function Store({
    pk,
    thumbnail,
    p_name,
    rating,
    p_location,
    p_hashtag,
    p_startdate,
    p_enddate,
    status,
}: StoreProps) {
    const gray = useColorModeValue("gray.600", "gray.300");
    const getBadgeStyle = () => {
        switch (status) {
            case "진행중":
                return { bg: "green", color: "white" };
            case "종료":
                return { bg: "gray", color: "black" };
            default:
                return { bg: "red", color: "white" };
        }
    };
    const { bg, color } = getBadgeStyle();
    return (
        <Link to={`/stores/${pk}`}>
            <VStack spacing={1} alignItems={"flex-start"}>
                <Box w="100%">
                    <Box
                        position={"relative"}
                        overflow="hidden"
                        mb={2}
                        rounded="3xl"
                    >
                        <AspectRatio ratio={4 / 3}>
                            <Image src={thumbnail} objectFit="cover" />
                        </AspectRatio>
                        <Button
                            variant={"unstyled"}
                            cursor={"pointer"}
                            position={"absolute"}
                            top={2}
                            right={2}
                            color="white"
                        >
                            <FaRegHeart size="20px" />
                        </Button>
                        <Badge
                            position="absolute"
                            top={5}
                            left={5}
                            {...{ bg, color }}
                        >
                            {status}
                        </Badge>
                    </Box>
                </Box>
                <Box w="100%">
                    <Grid gap={2} templateColumns={"1fr auto"}>
                        <Text as="b" noOfLines={1} fontSize={"md"}>
                            {p_name}
                        </Text>
                        <HStack
                            _hover={{
                                color: "red.100",
                            }}
                            spacing={1}
                            justifyContent="flex-end"
                        >
                            <FaStar />
                            <Text>{rating}</Text>
                        </HStack>
                    </Grid>
                    <Text fontSize={"md"} color={gray}>
                        {p_location}
                    </Text>
                </Box>
                <Box>
                    <Text fontSize={"sm"} color={gray}>
                        <Text as="b">
                            {p_startdate.toLocaleString()} ~{" "}
                            {p_enddate.toLocaleString()}
                        </Text>
                    </Text>
                    <Text fontSize={"sm"} color={gray}>
                        <Text as="b">{p_hashtag}</Text>
                    </Text>
                </Box>
            </VStack>
        </Link>
    );
}
