import React, { useState } from "react";
import {
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Select,
    Text,
    InputGroup,
    InputRightElement,
    Heading,
    Divider,
    Flex,
    Button,
} from "@chakra-ui/react";
import { Search2Icon, SmallCloseIcon } from "@chakra-ui/icons";
import { IoCloseCircle } from "react-icons/io5";

interface SearchModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({
    isOpen,
    onOpen,
    onClose,
}) => {
    const [keyword, setKeyword] = useState("");
    const [region1, setRegion1] = useState("");
    const [region2, setRegion2] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [region2Options, setRegion2Options] = useState<string[]>([]);

    const handleKeywordChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setKeyword(event.target.value);
    };

    const handleRegion1Change = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const selectedRegion1 = event.target.value;
        setRegion1(selectedRegion1);

        // Reset region2 when region1 changes
        setRegion2("");
        // Update region2 options based on selected region1
        const region2OptionsForRegion1 = regions[selectedRegion1] || [];
        setRegion2Options(region2OptionsForRegion1);
    };

    const handleRegion2Change = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setRegion2(event.target.value);
    };

    const handleSearchDateChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setSearchDate(event.target.value);
    };

    return (
        <>
            <Input
                width={{ base: "250px" }}
                onClick={onOpen}
                placeholder="팝업스토어 검색"
            />
            <Modal isOpen={isOpen} size="full" onClose={onClose}>
                <ModalOverlay />
                <ModalContent px={{ base: 0, md: "500px" }}>
                    <ModalBody>
                        <InputGroup>
                            <Input
                                mb={"50px"}
                                variant="flushed"
                                value={keyword}
                                onChange={handleKeywordChange}
                                placeholder="검색어를 입력하세요."
                            />
                            <InputRightElement>
                                <SmallCloseIcon />
                            </InputRightElement>
                        </InputGroup>
                        <Heading size="sm" mb={"10px"}>
                            언제 방문하시나요?
                        </Heading>
                        <Input
                            mb={"20px"}
                            type="date"
                            value={searchDate}
                            onChange={handleSearchDateChange}
                            placeholder="searchDate"
                        />
                        <Heading size="sm" mb={"10px"}>
                            어디로 방문하시나요?
                        </Heading>
                        <Select
                            mb={"5px"}
                            value={region1}
                            onChange={handleRegion1Change}
                            placeholder="지역을 선택하세요."
                        >
                            {Object.keys(regions).map((region1) => (
                                <option key={region1} value={region1}>
                                    {region1}
                                </option>
                            ))}
                        </Select>
                        {region1 && ( // Render region2 select only if region1 is selected
                            <Select
                                mb={"10px"}
                                value={region2}
                                onChange={handleRegion2Change}
                                placeholder="세부지역을 선택하세요."
                                disabled={!region1}
                            >
                                {region2Options.map((region2Option, index) => (
                                    <option key={index} value={region2Option}>
                                        {region2Option}
                                    </option>
                                ))}
                            </Select>
                        )}
                        <Flex justifyContent="flex-end">
                            <Button colorScheme="pink">
                                검색
                            </Button>
                        </Flex>
                        <Divider mt={"100px"} mb={"20px"} />
                        <Heading mb={"5px"} size={"sm"}>
                            실시간 인기 검색어
                        </Heading>
                        <Text color={"gray"}> 2024. 03. 11. 18:00 기준 </Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default SearchModal;

const regions: Record<string, string[]> = {
    서울: [
        "강남구",
        "강북구",
        "강서구",
        "광진구",
        "구로구",
        "금천구",
        "노원구",
        "도봉구",
        "동대문구",
        "마포구",
        "서대문구",
        "서초구",
        "성동구",
        "성북구",
        "송파구",
        "양천구",
        "영등포구",
        "용산구",
        "종로구",
        "중구",
    ],
    강원: ["강릉시", "고성군", "속초시", "원주시", "평창군"],
    경기: [
        "가평군",
        "고양시 덕양구",
        "고양시 일산서구",
        "광명시",
        "광주시",
        "구리시",
        "부천시 소사구",
        "부천시 원미구",
        "성남시 분당구",
        "성남시 수정구",
        "수원시 권선구",
        "수원시 영통구",
        "수원시 장안구",
        "수원시 팔달구",
        "양평군",
        "여주시",
        "용인시 기흥구",
        "용인시 수지구",
        "용인시 처인구",
        "의왕시",
        "파주시",
        "하남시",
        "화성시",
    ],
    경남: ["김해시", "밀양시"],
    경북: [
        "경산시",
        "경주시",
        "구미시",
        "김천시",
        "영주시",
        "예천군",
        "포항시 남구",
        "포항시 북구",
    ],
    광주: ["동구", "북구", "서구"],
    대구: ["달서구", "동구", "북구", "중구"],
    대전: ["대덕구", "서구", "유성구"],
    부산: [
        "금정구",
        "기장군",
        "동구",
        "부산진구",
        "사상구",
        "영도구",
        "중구",
        "해운대구",
    ],
    울산: ["남구"],
    인천: ["연수구", "중구"],
    전남: ["곡성군", "여수시"],
    전북: ["김제시", "임실군", "전주시 덕진구", "전주시 완산구"],
    제주: ["서귀포시", "제주시"],
    충남: ["아산시", "천안시 동남구", "홍성군"],
    충북: ["제천시", "증평군"],
};
