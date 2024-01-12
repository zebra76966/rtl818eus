import React from "react";
import { useState, useEffect } from "react";
import "./master.css";
const Paginate = (props) => {
  const [totalNumbers, setTotalNumber] = useState(10);

  useEffect(() => {
    const updateTotalNumbers = () => {
      // You can adjust the logic based on your requirements
      const screenWidth = window.innerWidth;
      let updatedTotalNumbers;

      // Add your own logic to determine the totalNumbers based on screenWidth
      // For example, you can set different totalNumbers for different screen sizes
      if (screenWidth >= 1200) {
        updatedTotalNumbers = 8;
      } else if (screenWidth >= 768) {
        updatedTotalNumbers = 3;
      } else {
        updatedTotalNumbers = 2;
      }

      setTotalNumber(updatedTotalNumbers);
    };

    // Initial update
    updateTotalNumbers();

    // Event listener for window resize
    window.addEventListener("resize", updateTotalNumbers);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateTotalNumbers);
    };
  }, []); // Empty dependency array means this effect will run once on mount

  return (
    <nav aria-label="Page navigation example">
      <ul className={`pagination ${totalNumbers > 2 ? " pagination-lg" : "pagination-sm"} justify-content-center`}>
        <li className={`page-item ${props.cactive === 1 ? "disabled " : ""}`}>
          <span
            className={`page-link ${props.cactive === 1 ? "text-secondary bg-muted " : "text-danger"}`}
            onClick={() => props.pagecount(props.cactive - 1)}
            aria-disabled={`${props.cactive === 1 ? "true" : ""}`}
          >
            Vorige
          </span>
        </li>
        {props.cactive > 2 && (
          <li key={1} className={`page-item ${props.cactive === 1 ? "active" : ""}`}>
            <span className="page-link text-danger" onClick={() => props.pagecount(1)}>
              {1}
            </span>
          </li>
        )}
        {props.cactive > 2 && (
          <li className={`page-item`}>
            <span className="page-link text-danger">...</span>
          </li>
        )}

        {[...Array(Math.ceil(props.total / 9))].slice(Math.max(0, props.cactive - 2), Math.min(Math.ceil(props.total / 9), props.cactive + totalNumbers)).map((_, i) => {
          const pageNumber =
            i === totalNumbers + 1 && props.cactive !== 1
              ? Math.ceil(props.total / 9)
              : Math.max(1, Math.min(Math.ceil(props.total / 9), props.cactive !== 1 ? props.cactive - 2 + i + 1 : props.cactive - 1 + i + 1));
          let isEllipsis = false;
          if (props.cactive == 1) {
            isEllipsis = i === totalNumbers;
          } else {
            isEllipsis = i === totalNumbers + 1;
          }
          return (
            <>
              <li key={i} className={`page-item ${props.cactive === pageNumber ? "active" : ""}`}>
                <span className="page-link text-danger" onClick={() => props.pagecount(pageNumber)}>
                  {isEllipsis ? "..." : pageNumber}
                </span>
              </li>
              {isEllipsis && props.cactive !== 1 && (
                <li key={i} className={`page-item ${props.cactive === pageNumber ? "active" : ""}`}>
                  <span className="page-link text-danger" onClick={() => props.pagecount(pageNumber)}>
                    {pageNumber}
                  </span>
                </li>
              )}
              {isEllipsis && props.cactive == 1 && (
                <li key={i} className={`page-item ${props.cactive === Math.ceil(props.total / 9) ? "active" : ""}`}>
                  <span className="page-link text-danger" onClick={() => props.pagecount(Math.ceil(props.total / 9))}>
                    {Math.ceil(props.total / 9)}
                  </span>
                </li>
              )}
            </>
          );
        })}
        <li className={`page-item ${props.cactive === Math.ceil(props.total / 9) ? "disabled" : ""}`}>
          <span
            className={`page-link ${props.cactive === Math.ceil(props.total / 9) ? "text-secondary bg-muted " : "text-danger"}`}
            onClick={() => props.pagecount(props.cactive + 1)}
            aria-disabled={`${props.cactive === Math.ceil(props.total / 9) ? "true" : ""}`}
          >
            Volgende
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Paginate;
