import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface CreateWishlistModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (wishlistName: string) => void;
}

const CreateWishlistModal: React.FC<CreateWishlistModalProps> = ({
    isOpen,
    onClose,
    onSave,
}) => {

    const [wishlistName, setWishlistName] = useState(""); // 위시리스트 이름을 저장하는 상태

    // 저장 버튼 클릭 시 외부로 위시리스트 이름 전송
    const handleSave = () => {
        onSave(wishlistName);
        onClose(); // Modal 닫기
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>위시리스트 만들기</ModalHeader>
                <ModalBody>
                    <FormControl>
                        <FormLabel>위시리스트 이름</FormLabel>
                        <Input
                            placeholder="사용할 위시리스트 이름을 입력하세요"
                            value={wishlistName} // 입력된 값 설정
                            onChange={(e) => setWishlistName(e.target.value)}
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter gap={3}>
                    <Button variant="solid" onClick={onClose}>Close</Button>
                    <Button colorScheme="pink" mr={3} onClick={handleSave}>
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default CreateWishlistModal;
