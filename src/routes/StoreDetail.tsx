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
    useBreakpointValue,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { MdCheckCircle } from "react-icons/md";
import KakaoMap from "../components/KakaoMap";
import ReviewModal from "../components/ReviewModal";
import Threeicons from "../components/Threeicons";

export default function StoreDetail() {
    const { storePk } = useParams();
    const {
        isLoading,
        data,
        refetch: refetchStore,
    } = useQuery<IStoreDetail>([`stores`, storePk], getStore);
    const { data: reviewsData, refetch: refetchReview } = useQuery<IReview[]>(
        [`stores`, storePk, `reviews`],
        getStoreReviews,
    );

    const reloadStoreData = async () => {
        await refetchStore();
        console.log("다시 불러옴 !");
    };
    const reloadReviewsData = async () => {
        //  useQuery를 다시 실행
        await refetchReview();
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

    const renderMapInsideTab = useBreakpointValue({ base: false, lg: true });
    const map_width = useBreakpointValue({ base: 80, lg: 500 }) || 80;
    const map_height = useBreakpointValue({ base: 80, lg: 380 }) || 80;

    console.log({data})

    return (
        <Box mt={10} px={{ base: "20px", lg: "300px" }}>
            <Box
                display={{ base: "block", lg: "flex" }}
                justifyContent="space-between"
                mt={5}
                mb={10}
            >
                <Box flex={{ base: "none", lg: 2 }} mr={{ base: 0, lg: 2 }}>
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
                    <Threeicons data={data} reloadStoreData={reloadStoreData} />
                    <Box
                        flex={{ base: "none", lg: 1 }}
                        ml={{ base: 0, lg: 10 }}
                    >
                        {data && renderMapInsideTab && (
                            <KakaoMap
                                frontLat={data?.frontLat}
                                frontLon={data?.frontLon}
                                map_width={map_width}
                                map_height={map_height}
                            />
                        )}
                    </Box>
                </VStack>
            </Box>
            <Skeleton
                height={{ base: 10, lg: 43 }}
                mb={{ base: "None", lg: "3" }}
                width="75%"
                isLoaded={!isLoading}
            >
                <Heading fontSize={{ base: "2xl", lg: "4xl" }}>
                    {data?.p_name}
                </Heading>
            </Skeleton>
            <Text
                fontSize={{ base: "sm", lg: "lg" }}
                mb={{ base: "1", lg: "3" }}
            >
                {data?.p_hashtag}
            </Text>
            <Badge
                px={{ base: "4px", lg: 2 }}
                ml={{ base: 1, lg: 2 }}
                mb={{ base: 10, lg: 10 }}
                height={{ base: "None", lg: 30 }}
                width="auto"
                fontSize={{ base: "sm", lg: 20 }}
                {...{ bg, color }}
            >
                {data?.status}
            </Badge>
            <Tabs mb={{ base: "None", lg: 10 }}>
                <TabList>
                    <Tab fontSize={{ base: "sm", lg: "lg" }}>
                        팝업스토어 정보
                    </Tab>
                    <Tab fontSize={{ base: "sm", lg: "lg" }}>이용후기</Tab>
                    <Tab fontSize={{ base: "sm", lg: "lg" }}>
                        <Link href={data?.news_url} isExternal>
                            원문 기사 이동 <ExternalLinkIcon mx="2px" />
                        </Link>
                    </Tab>
                </TabList>

                <TabPanels>
                    <TabPanel mt={{ base: 2, lg: 10 }}>
                        <VStack alignItems="flex-start">
                            <List spacing={3} mb={2}>
                                <ListItem>
                                    <HStack>
                                        <ListIcon
                                            as={MdCheckCircle}
                                            color="green.500"
                                        />
                                        <Text
                                            fontSize={{ base: "sm", lg: "lg" }}
                                        >
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
                                        <Text
                                            fontSize={{ base: "sm", lg: "lg" }}
                                        >
                                            {data?.p_location}
                                        </Text>
                                    </HStack>
                                </ListItem>
                            </List>
                            {data && !renderMapInsideTab && (
                                <KakaoMap
                                    frontLat={data?.frontLat}
                                    frontLon={data?.frontLon}
                                    map_width={map_width}
                                    map_height={map_height}
                                />
                            )}
                        </VStack>
                    </TabPanel>
                    <TabPanel>
                        <ReviewModal
                            data={data}
                            reviewsData={reviewsData}
                            reloadStoreData={reloadStoreData}
                            reloadReviewsData={reloadReviewsData}
                        />
                    </TabPanel>
                    <TabPanel></TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}
