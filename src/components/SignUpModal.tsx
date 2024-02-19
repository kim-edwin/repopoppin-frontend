import {
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    VStack,
    useToast,
    Text,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaEnvelope, FaUserSecret } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUpUser } from "../api";
import { AxiosError } from "axios";

interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ISignUpVariables {
    name: string;
    username: string;
    email: string;
    password: string;
}

export default function SignupModal({ isOpen, onClose }: SignUpModalProps) {
    const {
        register,
        reset,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ISignUpVariables>();

    const toast = useToast();
    const queryClient = useQueryClient();

    const mutation = useMutation(signUpUser, {
        onMutate: () => {
            console.log("start to mutate");
        },

        onError: (error: AxiosError) => {
            console.log("error occurred");
            console.log(error.response?.data);

            const error_message = Object.values(
                error.response?.data as Object,
            )[0];
            console.log(error_message);

            toast({
                status: "error",
                title: "Sign Up Failed",
                description: error_message,
            });
        },

        onSuccess: () => {
            toast({
                status: "success",
                title: "Sign Up Successed!",
                description: "Nice to meet you! 😎",
            });
            queryClient.refetchQueries(["me"]);
            onClose();
        },
    });

    function onSignUpSubmit({
        name,
        username,
        email,
        password,
    }: ISignUpVariables) {
        mutation.mutate({ name, username, email, password });
        reset();
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay></ModalOverlay>
            <ModalContent>
                <ModalHeader>Sign up</ModalHeader>
                <ModalCloseButton></ModalCloseButton>
                <ModalBody as={"form"} onSubmit={handleSubmit(onSignUpSubmit)}>
                    <VStack>
                        <InputGroup>
                            <InputLeftElement
                                children={
                                    <Box color={"gray.500"}>
                                        <FaUserAlt />
                                    </Box>
                                }
                            ></InputLeftElement>
                            <Input
                                variant={"filled"}
                                placeholder="Name"
                                required
                                isInvalid={Boolean(errors.name?.message)}
                                {...register("name", {
                                    required: "name is necessary!",
                                    minLength: {
                                        value: 3,
                                        message:
                                            "name must be at least 4 characters",
                                    },
                                    pattern: {
                                        value: /^[A-za-z0-9가-힣]{3,20}$/,
                                        message:
                                            "only possible to english, korean, number",
                                    },
                                })}
                            ></Input>
                        </InputGroup>

                        <InputGroup>
                            <InputLeftElement
                                children={
                                    <Box color={"gray.500"}>
                                        <FaUserSecret />
                                    </Box>
                                }
                            ></InputLeftElement>
                            <Input
                                variant={"filled"}
                                placeholder="Username"
                                required
                                isInvalid={Boolean(errors.username?.message)}
                                {...register("username", {
                                    required: "username is necesasry!",
                                    minLength: {
                                        value: 3,
                                        message:
                                            "username must be at least 4 characters",
                                    },
                                    pattern: {
                                        value: /^[A-za-z0-9]{3,20}$/,
                                        message:
                                            "only possible to english, korean, number",
                                    },
                                })}
                            ></Input>
                        </InputGroup>

                        <InputGroup>
                            <InputLeftElement
                                children={
                                    <Box color={"gray.500"}>
                                        <FaEnvelope />
                                    </Box>
                                }
                            ></InputLeftElement>
                            <Input
                                variant={"filled"}
                                placeholder="Email"
                                required
                                isInvalid={Boolean(errors.email?.message)}
                                {...register("email", {
                                    required: "email is necesasry!",
                                    minLength: {
                                        value: 5,
                                        message:
                                            "email must be at least 5 characters",
                                    },
                                    pattern: {
                                        value: /\w+@\w+\.\w+(\.\w+)?$/,
                                        message:
                                            "please enter a valid email address",
                                    },
                                })}
                            ></Input>
                        </InputGroup>

                        <InputGroup>
                            <InputLeftElement
                                children={
                                    <Box color={"gray.500"}>
                                        <FaLock />
                                    </Box>
                                }
                            ></InputLeftElement>
                            <Input
                                variant={"filled"}
                                placeholder="Password"
                                type="password"
                                required
                                isInvalid={Boolean(errors.password?.message)}
                                {...register("password", {
                                    required: "password is necessary!",
                                    minLength: {
                                        value: 8,
                                        message:
                                            "password must be at least 8 characters",
                                    },
                                    maxLength: {
                                        value: 15,
                                        message:
                                            "password must be less than 16 characters",
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
                                        message:
                                            "please enter a valid password, min 8 max 8 english+number+characters",
                                    },
                                })}
                            ></Input>
                        </InputGroup>
                    </VStack>
                    <Text fontSize={"sm"} color={"red.500"}>
                        {errors.name?.message}
                        {errors.username?.message}
                        {errors.email?.message}
                        {errors.password?.message}
                    </Text>

                    <Button
                        mt={4}
                        w="100%"
                        colorScheme="pink"
                        type={"submit"}
                        isLoading={mutation.isLoading}
                    >
                        Sign up
                    </Button>

                    <SocialLogin></SocialLogin>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
    // return (
    //     <Modal onClose={onClose} isOpen={isOpen}>
    //         <ModalOverlay />
    //         <ModalContent>
    //             <ModalHeader>회원가입</ModalHeader>
    //             <ModalCloseButton />
    //             <ModalBody>
    //                 <VStack>
    //                     <InputGroup>
    //                         <InputLeftElement children={<FaUserAlt />} />
    //                         <Input variant={"filled"} placeholder="Name" />
    //                     </InputGroup>
    //                     <InputGroup>
    //                         <InputLeftElement children={<FaEnvelope />} />
    //                         <Input variant={"filled"} placeholder="Email" />
    //                     </InputGroup>
    //                     <InputGroup>
    //                         <InputLeftElement children={<FaUserAlt />} />
    //                         <Input variant={"filled"} placeholder="Username" />
    //                     </InputGroup>
    //                     <InputGroup>
    //                         <InputLeftElement children={<FaLock />} />
    //                         <Input variant={"filled"} placeholder="Password" />
    //                     </InputGroup>
    //                 </VStack>
    //                 <Button mt={4} colorScheme="pink" w="100%">
    //                     Log in
    //                 </Button>
    //                 <SocialLogin />
    //             </ModalBody>
    //         </ModalContent>
    //     </Modal>
    // );
}
