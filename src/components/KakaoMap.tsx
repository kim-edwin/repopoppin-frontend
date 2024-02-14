import { Map, MapMarker } from "react-kakao-maps-sdk";
import { Box, Heading } from "@chakra-ui/react";

interface KakaoMapProps {
    p_name: string;
}

export default function KakaoMap({ p_name }: KakaoMapProps) {
    // console.log({p_name})
    return (
        <Box>
            <Map
                center={{
                    lat: 37.506320759000715,
                    lng: 127.05368251210247,
                }}
                style={{
                    width: "550px",
                    height: "550px",
                    borderRadius: "20px",
                }}
            >
                <MapMarker
                    position={{
                        lat: 37.506320759000715,
                        lng: 127.05368251210247,
                    }}
                ></MapMarker>
            </Map>
            
        </Box>
    );
}
