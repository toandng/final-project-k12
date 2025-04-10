import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import styles from "./Tabs.module.scss"
const defaultFn = () => {};
function  Tabs({
    defaultIndex = 0,
    children,
    onChange = defaultFn,
    className = "",
    tabListClassName = "",
    tabButtonClassName = "",
    activeTabButtonClassName = "",
  }) {
    const [currentIndex, setCurrentIndex] = useState(defaultIndex);
    const tabs = React.Children.toArray(children);
    const prevIndex = useRef(null);
  
    useEffect(() => {
      if (prevIndex.current !== null && prevIndex.current !== currentIndex) {
        onChange(currentIndex);
      }
      prevIndex.current = currentIndex;
    }, [currentIndex, onChange]);
  
    const handleClick = (index) => {
      if (index !== currentIndex) {
        setCurrentIndex(index);
      }
    };
  
    return (
      <div className={`${styles.tabsContainer} ${className}`}>
        <div className={`${styles.tabsList} ${tabListClassName}`}>
          {tabs.map((tab, index) => {
            const active = currentIndex === index;
            return (
              <button
                key={index}
                className={`${styles.tabButton} ${tabButtonClassName} ${
                  active ? `${styles.activeTabButton} ${activeTabButtonClassName}` : ""
                }`}
                onClick={() => handleClick(index)}
              >
                {tab.props.title}
              </button>
            );
          })}
        </div>
        <div className={styles.tabsContent}>{tabs[currentIndex]}</div>
      </div>
    );
}
Tabs.propTypes = {
  defaultIndex : PropTypes.number,
  children : PropTypes.node.isRequired,
  onChange : PropTypes.func,
  className : PropTypes.string,
  tabListClassName : PropTypes.string,
  tabButtonClassName : PropTypes.string,
  activeTabButtonClassName : PropTypes.string,
}
export default Tabs;