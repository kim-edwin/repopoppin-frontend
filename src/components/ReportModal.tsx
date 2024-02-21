import {
    Box,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Textarea,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { postReport } from "../api";

interface ReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    storePk: number;
    reloadStoreData: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({
    isOpen,
    onClose,
    storePk,
    reloadStoreData,
}) => {
    const [reportContent, setReportContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const toast = useToast();

    const handleReportSubmit = async () => {
        setIsSubmitting(true);
        try {
            await postReport({ payload: reportContent, storePk });
            reloadStoreData();
            toast({
                title: "제보해주셔서 감사합니다 !",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            onClose();
        } catch (error) {
            toast({
                title: "리포트 제출 오류",
                description: "리포트를 제출하는 도중 오류가 발생했습니다.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
        setIsSubmitting(false);
    };

    const handleReportInputChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        setReportContent(event.target.value);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>리포트 작성</ModalHeader>
                <ModalBody>
                    <Textarea
                        placeholder="리포트 내용을 입력하세요."
                        value={reportContent}
                        onChange={handleReportInputChange}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="pink"
                        onClick={handleReportSubmit}
                        isLoading={isSubmitting}
                    >
                        제출
                    </Button>
                    <Button ml={3} onClick={onClose}>
                        취소
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ReportModal;
