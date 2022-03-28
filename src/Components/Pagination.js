import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Pagination = ({
  totalPaintings,
  paginate,
  currentPage,
  setCurrentPage,
}) => {
  const [disabledRightBtn, setDisabledRightBtn] = useState(false);
  const [disabledLeftBtn, setDisabledLeftBtn] = useState(true);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPaintings / 10); i++) {
    pageNumbers.push(i);
  }
  console.log(currentPage);
  const handlePageUp = () => {
    if (currentPage === pageNumbers.length) {
      return currentPage;
    } else {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePageDown = () => {
    if (currentPage === 1) {
      return currentPage;
    } else {
      setCurrentPage(currentPage - 1);
    }
  };
  useEffect(() => {
    if (pageNumbers.length === 1) {
      setDisabledLeftBtn(true);
      setDisabledRightBtn(true);
    } else if (currentPage <= 1) {
      setDisabledLeftBtn(true);
      setDisabledRightBtn(false);
    } else if (currentPage > 1 && currentPage < pageNumbers.length) {
      setDisabledLeftBtn(false);
      setDisabledRightBtn(false);
    } else if (currentPage >= pageNumbers.length) {
      setDisabledLeftBtn(false);
      setDisabledRightBtn(true);
    }
  }, [currentPage, pageNumbers.length]);

  return (
    <Wrapper>
      <button
        onClick={() => setCurrentPage(1)}
        className={disabledLeftBtn ? "disabled" : ""}
      >
        &laquo;
      </button>
      <button
        onClick={() => handlePageDown()}
        className={disabledLeftBtn ? "disabled" : ""}
      >
        {" "}
        {"<"}
      </button>
      {pageNumbers.map((i) => (
        <button
          className={currentPage === i ? "activeBtn" : ""}
          onClick={() => paginate(i)}
          key={i}
        >
          {i}
        </button>
      ))}
      <button
        onClick={() => handlePageUp()}
        className={disabledRightBtn ? "disabled" : ""}
      >
        {">"}
      </button>
      <button
        onClick={() => setCurrentPage(pageNumbers.length)}
        className={disabledRightBtn ? "disabled" : ""}
      >
        &raquo;
      </button>
    </Wrapper>
  );
};

export default Pagination;
const Wrapper = styled.div`
  .activeBtn {
    color: ${({ theme }) => theme.activeBtnColor} !important;
    background-color: ${({ theme }) =>
      theme.activeBtnBackgroundColor} !important;
  }
  .disabled {
    border-color: gray !important;
    color: gray !important;
    &:hover {
      background-color: ${({ theme }) => theme.backgroundColor} !important;
    }
  }

  padding: 1rem 0;
  display: inline-block;
  button {
    background-color: transparent;
    font-size: 1.5rem;
    padding: 0 0.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.color};
    transition: background-color 0.3s;
    border-style: solid;

    border-color: ${({ theme }) => theme.color};
    border-width: 2px 1px;
    &:hover {
      background-color: ${({ theme }) => theme.hover};
    }
    @media (max-width: 320px) {
      font-size: 1rem;
      padding: 0 0.2rem;
    }
  }
  button:last-child {
    border-radius: 0 5px 5px 0;
    border-right: solid 2px;
  }
  button:first-child {
    border-left: solid 2px;
    border-radius: 5px 0 0 5px;
  }
`;
