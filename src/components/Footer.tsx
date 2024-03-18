import {
    Flex,
    IconButton,
    Image,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import footer_light from "../sources/footer/footer_light.svg";
import footer_dark from "../sources/footer/footer_dark.svg";
import { FaGithub, FaGithubSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
    const imgsrc = useColorModeValue(footer_light, footer_dark);

    return (
        <>
            <Image
                position={"relative"}
                boxSize="100%"
                src={imgsrc}
                zIndex={1}
            ></Image>
            <Flex mx={"20px"} pb={"20px"} justifyContent={"flex-end"}>
                <a
                    href="https://github.com/kim-edwin/RepoPoppin"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaGithub size={"40px"} />
                </a>
            </Flex>
        </>
    );
}
