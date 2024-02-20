import {
    AspectRatio,
    Box,
    Grid,
    HStack,
    Heading,
    Skeleton,
    Image,
    VStack,
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
    Avatar,
    Container,
    FormControl,
    FormLabel,
    Textarea,
    FormHelperText,
    Flex,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Button,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";

interface ReviewModalProps {
    data: IStoreDetail | undefined;
    reviewsData: IReview[] | undefined;
}

interface IForm {
    rating: number;
    payload: string;
}

export default function ReviewModal({data, reviewsData}: ReviewModalProps) {
    const [value, setValue] = React.useState(5);
    const handleNumberInputChange = (
        valueAsString: string,
        valueAsNumber: number,
    ) => {
        setValue(valueAsNumber);
    };
    const handleSliderChange = (newValue: number) => {
        setValue(newValue);
    };

    const { register, handleSubmit } = useForm<IForm>();
    
    return (
        <Box mt={10}>
            <Heading mb={5} fontSize={"2xl"}>
                <HStack>
                    <FaStar /> <Text>{data?.rating} ·</Text>
                    <Text>후기 {reviewsData?.length}개</Text>
                </HStack>
            </Heading>

            <Container mt={10} maxW="full" marginX="auto">
                <Box as="form">
                    <Flex alignItems="flex-start" maxW="container.sm" mb={5}>
                        <Box mt={2.5} mr={2}>
                            <FaStar size={20} />
                        </Box>
                        <NumberInput
                            {...register("rating", {
                                required: true,
                            })}
                            maxW="100px"
                            mr="2rem"
                            value={value}
                            onChange={handleNumberInputChange}
                            min={1}
                            max={5}
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <Slider
                            flex="1"
                            focusThumbOnChange={false}
                            value={value}
                            onChange={handleSliderChange}
                            min={1}
                            max={5}
                        >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb
                                fontSize="sm"
                                boxSize="32px"
                                children={value}
                            />
                        </Slider>
                    </Flex>
                    <FormControl>
                        <FormLabel>방문 후기를 남겨보세요!</FormLabel>
                        <Textarea
                            {...register("payload", {
                                required: true,
                            })}
                        />
                        <FormHelperText>
                            욕설, 타인에 대한 비방, 허위사실 게재 등 나쁜
                            댓글들은 통보없이 삭제되며 이용자도 정지당할 수
                            있습니다. ╚(•⌂•)╝
                        </FormHelperText>
                    </FormControl>
                    <Button
                        type="submit"
                        colorScheme={"red"}
                        size="lg"
                        w="100%"
                    >
                        Upload Room
                    </Button>
                </Box>

                <Grid gap={40} templateColumns={"1fr 1fr"}>
                    {reviewsData?.map((review, index) => (
                        <VStack alignItems={"flex-start"} key={index}>
                            <HStack spacing={3}>
                                <Avatar
                                    name={review.user.name}
                                    src={review.user.avatar}
                                    size="md"
                                />
                                <VStack alignItems={"flex-start"}>
                                    <Heading fontSize={"md"}>
                                        {review.user.name}
                                    </Heading>
                                    <HStack spacing={1}>
                                        <FaStar size="12px" />
                                        <Text>{review.rating}</Text>
                                    </HStack>
                                </VStack>
                            </HStack>
                            <Text>{review.payload}</Text>
                        </VStack>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
