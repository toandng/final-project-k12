import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Accordion.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

function Accordion({
  children,
  defaultIndex = 0,
  onChange = () => {},
  collapseOthers = false,
  className = "",
  openItemClassName = "",
  accordionHeader = "",
  accordionConten = "",
}) {
  const accordions = React.Children.toArray(children);
  const [openIndices, setOpenIndices] = useState(() =>
    collapseOthers ? [defaultIndex] : []
  );
  const [focusedIndex, setFocusedIndex] = useState(defaultIndex);
  const headerRefs = useRef([]);

  useEffect(() => {
    if (collapseOthers && !openIndices.includes(defaultIndex)) {
      setOpenIndices([defaultIndex]);
      onChange([defaultIndex]);
    }
  }, []); // eslint-disable-line

  const toggleIndex = (index) => {
    const isOpen = openIndices.includes(index);
    const next = collapseOthers
      ? isOpen
        ? []
        : [index]
      : isOpen
      ? openIndices.filter((i) => i !== index)
      : [...openIndices, index];

    const changed = JSON.stringify(openIndices) !== JSON.stringify(next);
    if (changed) {
      setOpenIndices(next);
      onChange(next);
    }
  };

  const handleKeyDown = (e, index) => {
    let nextIndex = index;
    if (["ArrowRight", "ArrowDown"].includes(e.key)) {
      nextIndex = (index + 1) % accordions.length;
      e.preventDefault();
    } else if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
      nextIndex = (index - 1 + accordions.length) % accordions.length;
      e.preventDefault();
    } else if (["Enter", " "].includes(e.key)) {
      toggleIndex(index);
      e.preventDefault();
    }

    setFocusedIndex(nextIndex);
    headerRefs.current[nextIndex]?.focus();
  };

  return (
    <div className={`${styles.accordion} ${className}`}>
      {accordions.map((accordion, index) => {
        const isOpen = openIndices.includes(index);
        const { header, icon } = accordion.props;

        return (
          <div
            key={index}
            className={`${styles.accordionItem} ${
              isOpen ? openItemClassName : ""
            }`}
          >
            <button
              ref={(el) => (headerRefs.current[index] = el)}
              className={`${styles.accordionHeader} ${accordionHeader}`}
              onClick={() => toggleIndex(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              tabIndex={index === focusedIndex ? 0 : -1}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${index}`}
            >
              <FontAwesomeIcon
                icon={isOpen ? faChevronUp : faChevronDown}
                className="mr-2 transition-transform duration-300"
              />
              {header}
            </button>
            {isOpen && (
              <div
                id={`accordion-content-${index}`}
                className={`${styles.accordionContent} ${accordionConten}`}
              >
                {accordion.props.children}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

Accordion.propTypes = {
  children: PropTypes.node.isRequired,
  defaultIndex: PropTypes.number,
  onChange: PropTypes.func,
  collapseOthers: PropTypes.bool,
  className: PropTypes.string,
  openItemClassName: PropTypes.string,
  accordionHeader: PropTypes.string,
  accordionConten: PropTypes.string,
};
export default Accordion;
