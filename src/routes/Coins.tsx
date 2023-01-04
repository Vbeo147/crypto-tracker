import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div``;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
`;

const CoinsList = styled.ul`
  padding: 0 10%;
`;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 20px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  user-select: none;
`;

function Coins() {
  const arr = new Array(5);
  return (
    <Container>
      <Header>
        <Title>Coin</Title>
      </Header>
      <CoinsList>
        {arr.fill("").map((item, index) => (
          <Coin key={index}>
            <Link to={`/${index}`}>{index} &rarr;</Link>
          </Coin>
        ))}
      </CoinsList>
    </Container>
  );
}

export default Coins;
