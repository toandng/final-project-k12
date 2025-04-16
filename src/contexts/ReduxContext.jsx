
import PropTypes from "prop-types";
import { createContext } from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const ReduxContext = createContext();

function UserProvider({ children, store }) {
   

    return (
        <ReduxContext.Provider value={store}>{children}</ReduxContext.Provider>
    );
}

export default UserProvider;
UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
    store: PropTypes.object,

  };