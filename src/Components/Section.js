import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import styled from "styled-components";
import { ImSun } from "react-icons/im";

const Section = ({ paintings, setSearch, blackMode, setBlackMode }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [authors, setAuthors] = useState([]);
  const [locations, setLocations] = useState([]);

  //   Pagintation

  const indexOfLastPost = currentPage * 10;
  const indexOfFirstPost = indexOfLastPost - 10;
  const currentPosts =
    paintings.length > 1 && paintings.slice(indexOfFirstPost, indexOfLastPost);

  const totalPaintings = paintings.length;
  const paginate = (num) => setCurrentPage(num);
  //   Pagination end
  useEffect(() => {
    const getLocations = () => {
      fetch("https://test-front.framework.team/locations")
        .then((res) => res.json())
        .then((data) => setLocations(data));
    };
    getLocations();
    const getAuthors = () => {
      fetch("https://test-front.framework.team/authors")
        .then((res) => res.json())
        .then((data) => setAuthors(data));
    };
    getAuthors();
  }, []);
  const dataAuthor = (idd) => {
    const author = authors && authors.find(({ id }) => id === idd);
    return author.name;
  };
  const dataLocation = (idd) => {
    const loc = locations && locations.find(({ id }) => id === idd);
    return loc.location;
  };
  return (
    <Wrapper>
      <div className="top">
        <img
          onClick={() => window.location.reload()}
          src="Frame 227.svg"
          alt=""
        />

        <input
          placeholder="Search..."
          type="text"
          onChange={(e) =>{ 
            setSearch(e.target.value)
          localStorage.setItem("search", JSON.stringify(e.target.value));
          
          }}
        />
        <ImSun
          onClick={() => {
            setBlackMode(!blackMode);
            localStorage.setItem("black", JSON.stringify(!blackMode));
          }}
          className="sun"
        />
      </div>
      <div className="top-mobile">
        <div className="con-mobile">
          <img
            onClick={() => window.location.reload()}
            src="Frame 227.svg"
            alt=""
          />
          <ImSun
            onClick={() => {
              setBlackMode(!blackMode);
              localStorage.setItem("black", JSON.stringify(!blackMode));
            }}
            className="sun"
          />
        </div>

        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <WrapperGrid>
        {currentPosts.length > 0 ? (
          currentPosts.map((paint) => (
            <div className="card" key={paint.id}>
              <img
                src={`https://test-front.framework.team${paint.imageUrl}`}
                alt=""
              />
              <div className="container-slide">
                <h4>{paint.name}</h4>
                <p>
                  <strong>Author: </strong>
                  {dataAuthor(paint.authorId)}
                </p>
                <p>
                  <strong>Created: </strong>
                  {paint.created}
                </p>
                <p>
                  <strong>Location: </strong>
                  {dataLocation(paint.locationId)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="nothing">"Nothing here"</p>
        )}
      </WrapperGrid>
      <div className="stretch"></div>
      {currentPosts.length > 1 && (
        <Pagination
          paginate={paginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPaintings={totalPaintings}
        />
      )}
    </Wrapper>
  );
};

export default Section;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: auto;
  .top {
    padding: 1rem 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    @media (max-width: 500px) {
      display: none;
    }
  }
  .top-mobile {
    display: none;
    @media (max-width: 500px) {
      input {
        max-width: 500px;
        width: 95%;
      }
    }
    .con-mobile {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    @media (max-width: 500px) {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
  .sun {
    color: ${({ theme }) => theme.color};
    font-size: 2rem;
  }
  input {
    color: ${({ theme }) => theme.color};
    outline: none;
    border-color: ${({ theme }) => theme.color};
    background-color: transparent;
    padding: 0.3rem;
    width: 100%;
    max-width: 240px;
    color: ${({ theme }) => theme.color};

    border: 2px solid ${({ theme }) => theme.color};
    border-radius: 0.3rem;
  }
  .stretch {
    flex: 1;
  }
`;
const WrapperGrid = styled.div`
  padding: 1rem 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;

  .nothing {
    color: ${({ theme }) => theme.color};
  }
  .card {
    aspect-ratio: 1.4 / 1;
    border-radius: 1rem;
    position: relative;
    overflow: hidden;

    .container-slide {
      transition: all 1s linear;
      position: absolute;
      bottom: 0;
      left: 0;
      max-height: 6rem;
      padding: 0.2rem 1.2rem;
      width: 100%;
      background-color: rgba(255, 255, 255, 0.75);
      height: 1.5rem;
      @media (max-width: 1366px) {
        padding: 0 1rem;
      }
      @media (max-width: 768px) {
        height: 1.3rem;
        padding: 0 0.5rem;

        h4 {
          font-size: 0.9rem;
        }
        p {
          font-size: 0.8rem;
        }
      }
      @media (max-width: 320px) {
        height: 1.1rem;
        max-height: 6rem;
        h4 {
          font-size: 0.8rem;
        }
        p {
          font-size: 0.6rem;
        }
      }
      &:hover {
        height: 8rem;
      }
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 320px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;
