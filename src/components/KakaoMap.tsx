import { Map, MapMarker } from "react-kakao-maps-sdk";
import { Box } from "@chakra-ui/react";

interface KakaoMapProps {
    frontLat: number | null;
    frontLon: number | null;
}

export default function KakaoMap({ frontLat, frontLon }: KakaoMapProps) {
    const defaultLat = 0; // 기본 위도 값
    const defaultLon = 0; // 기본 경도 값

    return (
        <Box w="550px" h="450px">
            <Map
                center={{
                    lat: frontLat ?? defaultLat,
                    lng: frontLon ?? defaultLon,
                }}
                style={{
                    width: "550px",
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
