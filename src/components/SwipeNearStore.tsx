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
    useBreakpointValue,
} from "@chakra-ui/react";
import { distance } from "framer-motion";
import { FaHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

interface StoreProps {
    pk: number;
    thumbnail: string;
    p_name: string;
    p_location: string;
    p_hashtag: string;
    p_startdate: Date;
    p_enddate: Date;
    status: string;
    distance: number;
}

export default function SwipeNearStore({
    pk,
    thumbnail,
    p_name,
    // rating,
    p_location,
    p_hashtag,
    p_startdate,
    p_enddate,
    status,
    distance,
}: // is_liked,
StoreProps) {
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
    const button_top = useBreakpointValue({ base: 4, md: 6 });
    const button_right = useBreakpointValue({ base: 4, md: 6 });
    const heart_size = useBreakpointValue({ base: "25px", md: "30px" });
    const badge_top = useBreakpointValue({ base: 6, md: 8 });
    const badge_left = useBreakpointValue({ base: 7, md: 8 });
    const badge_fontsize = useBreakpointValue({ base: "sm", md: "md" });

    return (
        <Link to={`/stores/${pk}`}>
            <VStack spacing={1} alignItems={"flex-start"}>
                <Box w="100%" height="100%">
                    <Box
                        // position={"relative"}
                        overflow="hidden"
                        mb={2}
                        rounded="3xl"
                    >
                        <AspectRatio ratio={4 / 3}>
                            <Image src={thumbnail} objectFit="cover" />
                        </AspectRatio>
                        {/* <Button
                            variant={"unstyled"}
                            cursor={"pointer"}
                            position={"absolute"}
                            top={button_top}
                            right={button_right}
                            color={is_liked ? "red" : "gray"}
                        >
                            <FaHeart size={heart_size} />
                        </Button> */}
                        <Badge
                            position="absolute"
                            top={badge_top}
                            left={badge_left}
                            fontSize={badge_fontsize}
                            {...{ bg, color }}
                        >
                            {status}
                        </Badge>
                    </Box>
                </Box>
                <Box w="100%">
                    <Grid gap={2} templateColumns={"1fr auto"}>
                        <Text as="b" noOfLines={1} fontSize={"2xl"}>
                            {p_name}
                        </Text>
                        <HStack
                            _hover={{
                                color: "red.100",
                            }}
                            spacing={1}
                            justifyContent="flex-end"
                        >
                            {/* <FaStar />
                            <Text>{rating}</Text> */}
                        </HStack>
                    </Grid>
                    <Text fontSize={"md"} color={gray}>
                        {p_location} / 여기서 {distance.toFixed(2)}km
                    </Text>
                </Box>
                <Box>
                    <Text fontSize={"sm"} color={gray}>
                        <Text as="b">
                            {p_startdate && p_enddate
                                ? `${p_startdate.toLocaleString()} ~ ${p_enddate.toLocaleString()}`
                                : "Invalid Date"}
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
