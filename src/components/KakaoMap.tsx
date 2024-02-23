import { Map, MapMarker } from "react-kakao-maps-sdk";
import { Box, useBreakpointValue } from "@chakra-ui/react";

interface KakaoMapProps {
    frontLat: number | null;
    frontLon: number | null;
}

export default function KakaoMap({ frontLat, frontLon }: KakaoMapProps) {
    const defaultLat = 0; // 기본 위도 값
    const defaultLon = 0; // 기본 경도 값

    const map_width = useBreakpointValue({ base: "100%", lg: "550px" });
    const map_height = useBreakpointValue({ base: "200px", lg: "450px" });

    return (
        <Box w={"100%"} h={"100%"}>
            <Map
                center={{
                    lat: frontLat ?? defaultLat,
                    lng: frontLon ?? defaultLon,
                }}
                style={{
                    width: map_width,
                    height: "450px",
                    borderRadius: "20px",
                }}
            >
                <MapMarker
                    position={{
                        lat: frontLat ?? defaultLat,
                        lng: frontLon ?? defaultLon,
                    }}
                ></MapMarker>
            </Map>
        </Box>
    );
}
