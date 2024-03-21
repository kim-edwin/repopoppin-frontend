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
    Divider,
} from "@chakra-ui/react";
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
}

export default function NewStore({
    pk,
    thumbnail,
    p_name,
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
    const badge_top = useBreakpointValue({ base: 6, md: 8 });
    const badge_left = useBreakpointValue({ base: 7, md: 8 });
    const badge_fontsize = useBreakpointValue({ base: "sm", md: "md" });

    return (
        <Link to={`/stores/${pk}`}>
            <Grid gap={2} templateColumns={"3fr 4fr"}>
                <Box w="100%" height="100%">
                    <Box
                        position={"relative"}
                        overflow="hidden"
                        mb={2}
                        rounded="3xl"
                    >
                        <AspectRatio ratio={3 / 3}>
                            <Image src={thumbnail} objectFit="cover" />
                        </AspectRatio>
                    </Box>
                </Box>
                <VStack ml={1}>
                    <Box w="100%">
                        <Text as="b" noOfLines={2} fontSize={"lg"}>
                            {p_name}
                        </Text>
                        <Text fontSize={"sm"} color={gray}>
                            {p_location}
                        </Text>
                        <Badge
                            position="relative"
                            // top={badge_top}
                            // left={badge_left}
                            fontSize={badge_fontsize}
                            {...{ bg, color }}
                        >
                            {status}
                        </Badge>
                    </Box>
                    <Box>
                        <Text fontSize={"sm"} color={gray}>
                            <Text as="b">
                                {p_startdate && p_enddate
                                    ? `${p_startdate.toLocaleString()} ~ ${p_enddate.toLocaleString()}`
                                    : "Invalid Date"}
                            </Text>
                        </Text>
                        <Text fontSize={"xs"} color={gray}>
                            <Text as="b" noOfLines={2}>
                                {p_hashtag}
                            </Text>
                        </Text>
                    </Box>
                </VStack>
            </Grid>
            <Divider mt={3} />
        </Link>
    );
}
