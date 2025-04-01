import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import styles from "./Button.module.scss";

function Button ({
    children,
    icon,
    primary = false,
    secondary = false,
    normal = false,
    rounded = false,
    to = "",
    className = "",
    href = "",
    disable = false,
    isLoading = false,
    onClick,
}) {
    let Component = "button";
    const passProps = {};

    if (to) {
        Component = Link;
        passProps.to = to;
    }
    if (href) {
        Component = "a";
        passProps.href = href;
    }

   const hanldeClick = () => {
    if(disable || isLoading) return;

        onClick && onClick()
   };
   
   return(
   
    <Component
        {...passProps}
        className={clsx(styles.wrapper, className, {
            [styles.normal]: normal,
            [styles.primary]: primary,
            [styles.secondary]: secondary,
            [styles.rounded]: rounded,
            [styles.disable]: disable || isLoading,
        })}
        onClick={hanldeClick}
    >
        {isLoading ? (
            <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
            <div>
                {icon && <FontAwesomeIcon icon={icon} />}
                <span>{children}</span>
            </div>
        )}
    </Component>
    
   )
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    icon: PropTypes.object,
    className: PropTypes.string,
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    normal: PropTypes.bool,
    rounded: PropTypes.bool,
    disable: PropTypes.bool,
    isLoading: PropTypes.bool,

    onClick: PropTypes.func,

}
export default Button;