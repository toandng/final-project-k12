// import { useState } from "react";

// function useFetch() {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const fetchData = async (url, options = {}) => {
//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch(url, options);
//       if (!response.ok) {
//         throw new Error("Lỗi khi lấy dữ liệu");
//       }

//       const result = await response.json();
//       setData(result);
//     } catch (err) {
//       setError(err.message || "Có lỗi xảy ra");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { data, error, loading, fetchData };
// }

// export default useFetch;
