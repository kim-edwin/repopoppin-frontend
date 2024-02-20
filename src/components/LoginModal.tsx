import {
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
    Text,
    VStack,
    useToast,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usernameLogIn } from "../api";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface IForm {
    username: string;
    password: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IForm>();
    const toast = useToast();
    const queryClient = useQueryClient();
    const mutation = useMutation(usernameLogIn, {
        onSuccess: () => {
            toast({
                title: "welcome back!",
                status: "success",
            });
            onClose();
            queryClient.refetchQueries(["me"]);
            reset();
        },
    });
    const onSubmit = ({ username, password }: IForm) => {
        mutation.mutate({ username, password });
    };
    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Log in</ModalHeader>
                <ModalCloseButton />
                <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                    <VStack>
                        <InputGroup>
                            <InputLeftElement children={<FaUserAlt />} />
                            <Input
                                isInvalid={Boolean(errors.username?.message)}
                                {...register("username", {
                                    required: "사용하실 닉네임을 입력해주세요!",
                                })}
                                variant={"filled"}
                                placeholder="Username"
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement children={<FaLock />} />
                            <Input
                                isInvalid={Boolean(errors.password?.message)}
                                {...register("password", {
                                    required:
                                        "사용하실 비밀번호를 입력해주세요!",
                                })}
                                type="password"
                                variant={"filled"}
                                placeholder="Password"
                            />
                        </InputGroup>
                    </VStack>
                    {mutation.isError ? (
                        <Text
                            color="red.500"
                            textAlign={"center"}
                            fontSize="sm"
                        >
                            입력하신 정보에 오류가 있습니다!
                        </Text>
                    ) : null}
                    <Button
                        isLoading={mutation.isLoading}
                        type="submit"
                        mt={4}
                        colorScheme={"red"}
                        w="100%"
                    >
                        Log in
                    </Button>
                    <SocialLogin />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
