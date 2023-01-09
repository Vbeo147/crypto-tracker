import styled from "styled-components";

interface IPrice {
  priceData?: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PriceContainer = styled.div<{ isMinus: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  width: 60%;
  color: white;
  font-weight: bold;
  background-color: ${(props) => props.theme.CoinBgColor};
  padding: 10px;
  border-radius: 10px;
  div:first-child {
    font-size: 20px;
  }
  div:last-child {
    color: ${(props) => (props.isMinus ? props.theme.accentColor : "red")};
  }
`;

function Price({ priceData }: IPrice) {
  const Percent30m = priceData?.USD.percent_change_30m;
  const Percent1h = priceData?.USD.percent_change_1h;
  const Percent12h = priceData?.USD.percent_change_12h;
  const Percent24h = priceData?.USD.percent_change_24h;
  const Percent7d = priceData?.USD.percent_change_7d;
  const Percent30d = priceData?.USD.percent_change_30d;
  const isMinusFunc = (target: number) => Boolean(target >= 0);
  return (
    <Container>
      <PriceContainer isMinus={isMinusFunc(Percent30m as number)}>
        <div>30m</div>
        <div>{`${Percent30m}%`}</div>
      </PriceContainer>
      <PriceContainer isMinus={isMinusFunc(Percent1h as number)}>
        <div>1h</div>
        <div>{`${Percent1h}%`}</div>
      </PriceContainer>
      <PriceContainer isMinus={isMinusFunc(Percent12h as number)}>
        <div>12h</div>
        <div>{`${Percent12h}%`}</div>
      </PriceContainer>
      <PriceContainer isMinus={isMinusFunc(Percent24h as number)}>
        <div>1d</div>
        <div>{`${Percent24h}%`}</div>
      </PriceContainer>
      <PriceContainer isMinus={Boolean((Percent7d as number) > 0)}>
        <div>7d</div>
        <div>{`${Percent7d}%`}</div>
      </PriceContainer>
      <PriceContainer isMinus={isMinusFunc(Percent30d as number)}>
        <div>30d</div>
        <div>{`${Percent30d}%`}</div>
      </PriceContainer>
    </Container>
  );
}

export default Price;
