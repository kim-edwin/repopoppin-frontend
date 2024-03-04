import { useState } from "react";
import {
    Box,
    Flex,
    Input,
    List,
    ListItem,
    Text,
    HStack,
    InputGroup,
    InputLeftElement,
    useBreakpointValue,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";

const options: string[] = ["Apple", "Banana", "Cherry", "Grape", "Orange"];

function Autocomplete() {
    const [inputValue, setInputValue] = useState<string>("");
    const [filteredOptions, setFilteredOptions] = useState<string[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        if (value.trim() === "") {
            setFilteredOptions([]); // 입력이 없을 때 빈 배열로 설정하여 목록 숨김
        } else {
            const filtered = options.filter((option) =>
                option.toLowerCase().includes(value.toLowerCase()),
            );
            setFilteredOptions(filtered.slice(0, 5));
        }
    };

    const handleOptionClick = (option: string) => {
        setInputValue(option);
        setFilteredOptions([]);
    };

    const grid_px = useBreakpointValue({ base: "20px", md: "300px" });

    return (
        <Flex justify="center" px={grid_px}>
            <HStack>
                <InputGroup w={"100%"} mr={0} mb={0} gap={"10px"}>
                    <Input
                        placeholder="Select Date and Time"
                        type="date"
                        w={{ base: "100px", md: "200px" }}
                        h={{ base: "100px", md: "60px" }}
                        borderColor={"gray"}
                        borderRadius={"50px"}
                    />
                    <Input
                        placeholder="키워드 검색"
                        value={inputValue}
                        onChange={handleInputChange}
                        w={{ base: "100px", md: "800px" }}
                        h={{ base: "100px", md: "60px" }}
                        borderColor={"gray"}
                        borderRadius={"50px"}
                        pl={"20px"}
                    />
                    {filteredOptions.length > 0 && (
                        <List
                            mt={2}
                            borderColor="gray.200"
                            borderWidth="1px"
                            borderRadius={"20px"}
                        >
                            {filteredOptions.map((option, index) => (
                                <ListItem
                                    key={index}
                                    px={4}
                                    py={2}
                                    cursor="pointer"
                                    _hover={{ bg: "gray.100" }}
                                    onClick={() => handleOptionClick(option)}
                                >
                                    <Text>{option}</Text>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </InputGroup>
            </HStack>
        </Flex>
    );
}

export default Autocomplete;
