import { useEffect, useState } from "react";
import { Section } from "./Components";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";

function App() {
  const [blackMode, setBlackMode] = useState(
    localStorage.getItem("black") && JSON.parse(localStorage.getItem("black"))
  );
  const [paintings, setPaintings] = useState([]);
  const [search, setSearch] = useState("");
  console.log(paintings);
  useEffect(() => {
    const getPaintings = () => {
      fetch(`https://test-front.framework.team/paintings?q=${search}`)
        .then((res) => res.json())
        .then((data) => setPaintings(data));
    };

    getPaintings();
  }, [search]);
  let theme = {
    color: "#fff",
    borderColor: "#fff",
    backgroundColor: "black",
    activeBtnColor: "black",
    activeBtnBackgroundColor: "#fff",
    hover: "#2b2d42",
  };
  if (!blackMode) {
    theme = {
      color: "black",
      borderColor: "black",
      backgroundColor: "#fff",
      activeBtnColor: "#fff",
      activeBtnBackgroundColor: "black",
      hover: "#EDEDED",
    };
  } else {
    theme = {
      color: "#fff",
      borderColor: "#fff",
      backgroundColor: "black",
      activeBtnColor: "black",
      activeBtnBackgroundColor: "#fff",
      hover: "#2b2d42",
    };
  }
  return (
    <ThemeProvider theme={theme}>
      <Wrapper className="App">
        <div className="container">
          <Section
            blackMode={blackMode}
            setBlackMode={setBlackMode}
            setSearch={setSearch}
            paintings={paintings}
          />
        </div>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
const Wrapper = styled.div`
  min-height: 100vh;
  height: auto;
  width: 100%;
  background-color: ${({ theme }) => theme.backgroundColor};
  .container {
    max-width: 90%;
    margin: 0 auto;
    @media (max-width: 1366px) {
      max-width: 80%;
    }
  }
`;
