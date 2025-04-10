import { useEffect, useRef } from "react";

function UserLocationMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = (lat, lng) => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 15,
      });

      new window.google.maps.Marker({
        position: { lat, lng },
        map,
        title: "Vị trí của bạn",
      });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          initMap(latitude, longitude);
        },
        (error) => {
          console.error("Lỗi lấy vị trí:", error);
          alert("Không thể lấy vị trí của bạn.");
        }
      );
    } else {
      alert("Trình duyệt không hỗ trợ định vị.");
    }
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "300px", borderRadius: "12px" }}
    />
  );
}

export default UserLocationMap;
