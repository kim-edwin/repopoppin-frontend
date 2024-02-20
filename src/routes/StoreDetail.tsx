import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getStore, getStoreReviews } from "../api";
import {
    AspectRatio,
    Box,
    HStack,
    Heading,
    Skeleton,
    Image,
    Link,
    Badge,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Text,
    List,
    ListItem,
    ListIcon,
    VStack,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { MdCheckCircle } from "react-icons/md";
import KakaoMap from "../components/KakaoMap";
import ReviewModal from "../components/ReviewModal";
import { FaHeart } from "react-icons/fa";
import { LuShare2 , LuSiren } from "react-icons/lu";
import Threeicons from "../components/Threeicons";

export default function StoreDetail() {
    const { storePk } = useParams();
    const { isLoading, data } = useQuery<IStoreDetail>(
        [`stores`, storePk],
        getStore,
    );
    const {
        data: reviewsData,
        isLoading: isReviewsLoading,
        refetch,
    } = useQuery<IReview[]>([`stores`, storePk, `reviews`], getStoreReviews);
    const reloadReviewsData = async () => {
        // refetch 메서드를 호출하여 useQuery를 다시 실행합니다.
        await refetch();
    };
    const getBadgeStyle = () => {
        switch (data?.status) {
            case "진행중":
                return { bg: "green", color: "white" };
            case "종료":
                return { bg: "gray", color: "black" };
            default:
                return { bg: "red", color: "white" };
        }
    };
    const { bg, color } = getBadgeStyle();
    function formatDate(date: Date | undefined): string {
        if (!date) return "";
        const options: Intl.DateTimeFormatOptions = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return new Date(date).toLocaleDateString("ko-KR", options);
    }

    console.log(data);

    return (
        <Box mt={10} px={{ base: 10, lg: 40 }}>
            <Box
                display={{ base: "block", lg: "flex" }}
                justifyContent="space-between"
                mt={5}
            >
                <Box
                    mb={{ base: "30", lg: "none" }}
                    flex={{ base: "none", lg: 2 }}
                    mr={{ base: 0, lg: 2 }}
                >
                    <AspectRatio ratio={14 / 9}>
                        <Image
                            src={data?.thumbnail}
                            alt={data?.p_name}
                            objectFit="cover"
                            maxHeight="550px"
                            maxWidth="100%"
                            rounded="3xl"
                        />
                    </AspectRatio>
                </Box>
                <VStack alignItems="flex-end">
                    <Threeicons data = {data}/>
                    <Box
                        flex={{ base: "none", lg: 1 }}
                        ml={{ base: 0, lg: 20 }}
                    >
                        {data && (
                            <KakaoMap
                                frontLat={data?.frontLat}
                                frontLon={data?.frontLon}
                            />
                        )}
                    </Box>
                </VStack>
            </Box>
            <Skeleton height={43} mb={3} width="75%" isLoaded={!isLoading}>
                <Heading>{data?.p_name}</Heading>
            </Skeleton>
            <Text ml={2} mb={3}>
                {data?.p_hashtag}
            </Text>
            <Badge
                px={2}
                ml={2}
                mb={10}
                height={30}
                width="auto"
                fontSize="20"
                {...{ bg, color }}
            >
                {data?.status}
            </Badge>
            <Tabs mb={10}>
                <TabList>
                    <Tab>팝업스토어 정보</Tab>
                    <Tab>이용후기</Tab>
                    <Tab>
                        <Link href={data?.news_url} isExternal>
                            원문 기사 이동 <ExternalLinkIcon mx="2px" />
                        </Link>
                    </Tab>
                </TabList>

                <TabPanels>
                    <TabPanel mt={10}>
                        <List spacing={3}>
                            <ListItem>
                                <HStack>
                                    <ListIcon
                                        as={MdCheckCircle}
                                        color="green.500"
                                    />
                                    <Text fontSize={"lg"}>
                                        {formatDate(data?.p_startdate)} ~{" "}
                                        {formatDate(data?.p_enddate)}
                                    </Text>
                                </HStack>
                            </ListItem>
                            <ListItem>
                                <HStack>
                                    <ListIcon
                                        as={MdCheckCircle}
                                        color="green.500"
                                    />
                                    <Text fontSize={"lg"}>
                                        {data?.p_location}
                                    </Text>
                                </HStack>
                            </ListItem>
                        </List>
                    </TabPanel>
                    <TabPanel>
                        <ReviewModal
                            data={data}
                            reviewsData={reviewsData}
                            reloadReviewsData={reloadReviewsData}
                        />
                    </TabPanel>
                    <TabPanel></TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}
