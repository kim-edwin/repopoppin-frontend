import {
    Box,
    Grid,
    HStack,
    Heading,
    VStack,
    Text,
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
    useToast,
    MenuButton,
    Menu,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { deleteReview, postReview } from "../api";

interface ReviewModalProps {
    data: IStoreDetail | undefined;
    reviewsData: IReview[] | undefined;
    reloadReviewsData: () => void;
    reloadStoreData: () => void;
}

interface IReviewForm {
    pk: number;
    rating: number | undefined;
    payload: string | undefined;
}

export default function ReviewModal({
    data,
    reviewsData,
    reloadReviewsData,
    reloadStoreData,
}: ReviewModalProps) {
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
    const { register, handleSubmit, reset } = useForm<IReviewForm>();
    const toast = useToast();
    const mutation = useMutation(postReview, {
        onSuccess: () => {
            reloadReviewsData();
            reloadStoreData();
            toast({
                title: "댓글 달기 성공!",
                status: "success",
            });
            // queryClient.invalidateQueries(["stores", data!.pk, "reviews"]);
            reset();
        },
    });
    const onSubmit = ({ rating, payload }: IReviewForm) => {
        if (data && rating !== undefined && payload !== undefined) {
            mutation.mutate({ pk: data.pk, rating, payload });
        } else {
            console.error("Data, rating, or payload is undefined");
        }
    };
    const handleDeleteReview = async (reviewPk: number) => {
        try {
            await deleteReview(reviewPk);
            toast({
                title: "후기 삭제 성공!",
                status: "success",
            });
            reloadReviewsData();
            reloadStoreData();
        } catch (error) {
            console.error("Error deleting review:", error);
            toast({
                title: "후기 삭제 실패",
                status: "error",
            });
        }
    };

    return (
        <Box mt={10}>
            <Container mt={10} maxW="full" marginX="auto">
                <Box
                    mb={{ base: 20, lg: 40 }}
                    as="form"
                    onSubmit={handleSubmit(onSubmit)}
                >
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
                        <FormLabel fontSize={{base: "sm", lg: "md"}}>방문 후기를 남겨보세요!</FormLabel>
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
                    <Flex mt={2} justify="flex-end">
                        <Button
                            type="submit"
                            colorScheme={"pink"}
                            size="sm"
                            ml="auto"
                        >
                            후기 등록
                        </Button>
                    </Flex>
                </Box>
                <Heading mb={5} fontSize={{ base: "lg", lg: "2xl" }}>
                    <HStack>
                        <FaStar /> <Text>{data?.rating} ·</Text>
                        <Text>후기 {reviewsData?.length}개</Text>
                    </HStack>
                </Heading>
                <Grid
                    gap={{ base: 20, lg: 40 }}
                    templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
                >
                    {reviewsData?.map((review) => (
                        <VStack alignItems={"flex-start"} key={review.pk}>
                            <HStack spacing={3}>
                                <Menu>
                                    <MenuButton>
                                        <Avatar
                                            name={review.user.name}
                                            src={review.user.avatar}
                                            size={{ base: "sm", lg: "md" }}
                                        />
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem
                                            onClick={() =>
                                                handleDeleteReview(review.pk)
                                            }
                                        >
                                            후기 삭제
                                        </MenuItem>
                                    </MenuList>
                                </Menu>

                                <VStack
                                    gap={{ base: 0, lg: 2 }}
                                    alignItems={"flex-start"}
                                >
                                    <Heading
                                        fontSize={{ base: "sm", lg: "md" }}
                                    >
                                        {review.user.name}
                                    </Heading>
                                    <HStack spacing={1}>
                                        <FaStar size="12px" />
                                        <Text
                                            fontSize={{ base: "sm", lg: "md" }}
                                        >
                                            {review.rating}
                                        </Text>
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
