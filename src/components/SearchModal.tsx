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
    IconButton,
    FormControl,
    FormLabel,
    Switch,
} from "@chakra-ui/react";
import { RepeatIcon, Search2Icon, SmallCloseIcon } from "@chakra-ui/icons";
import { IoCloseCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getSearch } from "../api";

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
    const [upperAddrName, setupperAddrName] = useState("");
    const [middleAddrName, setmiddleAddrName] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [middleAddrNameOptions, setmiddleAddrNameOptions] = useState<
        string[]
    >([]);
    const [isEnd, setIsEnd] = useState(true);
    const navigate = useNavigate();

    const handleKeywordChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setKeyword(event.target.value);
    };

    const handleupperAddrNameChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const selectedupperAddrName = event.target.value;
        setupperAddrName(selectedupperAddrName);

        // Reset middleAddrName when upperAddrName changes
        setmiddleAddrName("");
        // Update middleAddrName options based on selected upperAddrName
        const middleAddrNameOptionsForupperAddrName =
            regions[selectedupperAddrName] || [];
        setmiddleAddrNameOptions(middleAddrNameOptionsForupperAddrName);
    };

    const handlemiddleAddrNameChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setmiddleAddrName(event.target.value);
    };

    const handleSearchDateChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setSearchDate(event.target.value);
    };

    const handleClearInput = () => {
        setKeyword("");
    };

    const handleReset = () => {
        setKeyword("");
        setupperAddrName("");
        setmiddleAddrName("");
        setSearchDate("");
        setIsEnd(true);
    };

    const handleSwitchChange = () => {
        setIsEnd(!isEnd); // Switch 값 반전
    };

    const handleSearch = () => {
        // Call API to perform search
        getSearch(keyword, upperAddrName, middleAddrName, searchDate, 1, isEnd).then(
            (data) => {
                // Navigate to the search results page ("/search") with the search parameters
                onClose();
                navigate("/search", {
                    state: {
                        searchData: data,
                        keyword,
                        upperAddrName,
                        middleAddrName,
                        searchDate,
                        isEnd,
                    },
                });
            },
        );
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
                                <SmallCloseIcon onClick={handleClearInput} />
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
                            mb={"10px"}
                            value={upperAddrName}
                            onChange={handleupperAddrNameChange}
                            placeholder="지역을 선택하세요."
                        >
                            {Object.keys(regions).map((upperAddrName) => (
                                <option
                                    key={upperAddrName}
                                    value={upperAddrName}
                                >
                                    {upperAddrName}
                                </option>
                            ))}
                        </Select>
                        {upperAddrName && ( // Render middleAddrName select only if upperAddrName is selected
                            <Select
                                mb={"20px"}
                                value={middleAddrName}
                                onChange={handlemiddleAddrNameChange}
                                placeholder="세부지역을 선택하세요."
                                disabled={!upperAddrName}
                            >
                                {middleAddrNameOptions.map(
                                    (middleAddrNameOption, index) => (
                                        <option
                                            key={index}
                                            value={middleAddrNameOption}
                                        >
                                            {middleAddrNameOption}
                                        </option>
                                    ),
                                )}
                            </Select>
                        )}
                        <Flex justifyContent="flex-end" mb={"15px"}>
                            <FormControl
                                display="flex"
                                alignItems="center"
                                ml="auto"
                            >
                                <FormLabel fontSize={"sm"} htmlFor="email-alerts" mb="0">
                                    종료된 팝업스토어 숨기기
                                </FormLabel>
                                <Switch
                                    id="is_end"
                                    isChecked={isEnd}
                                    onChange={handleSwitchChange}
                                />
                            </FormControl>
                        </Flex>
                        <Flex justifyContent="flex-end">
                            <IconButton
                                mr={"5px"}
                                colorScheme="gray"
                                aria-label="reset"
                                icon={<RepeatIcon />}
                                onClick={handleReset}
                            ></IconButton>
                            <Button
                                mr={"5px"}
                                colorScheme="gray"
                                onClick={onClose}
                            >
                                닫기
                            </Button>
                            <Button colorScheme="pink" onClick={handleSearch}>
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
