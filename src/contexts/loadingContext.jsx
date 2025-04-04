
import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const LoadingContext = createContext();

function LoadingProvider({children}) {
    const [loading, setLoading] = useState(false)

    const values = {
        loading,
        setLoading
    }
    
    return(
        <LoadingContext.Provider value={values}>{children}{loading && <LoadingOverlay />}</LoadingContext.Provider>
    )
    
}
function LoadingOverlay() {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontSize: "2rem",
          zIndex: 9999,
        }}
      >
        <FontAwesomeIcon icon={faSpinner} spin />
      </div>
    );
  }
export default LoadingProvider;

LoadingProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
