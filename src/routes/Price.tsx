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
  margin-bottom: 20px;
  width: 60%;
  div:first-child {
    font-size: 20px;
    font-weight: bold;
  }
  div:last-child {
    color: ${(props) => (props.isMinus ? props.theme.accentColor : "red")};
  }
`;

function Price({ priceData }: IPrice) {
  return (
    <Container>
      <PriceContainer
        isMinus={Boolean((priceData?.USD.percent_change_30m as number) > 0)}
      >
        <div>30m</div>
        <div>{`${priceData?.USD.percent_change_30m}%`}</div>
      </PriceContainer>
      <PriceContainer
        isMinus={Boolean((priceData?.USD.percent_change_1h as number) > 0)}
      >
        <div>1h</div>
        <div>{`${priceData?.USD.percent_change_1h}`}</div>
      </PriceContainer>
      <PriceContainer
        isMinus={Boolean((priceData?.USD.percent_change_12h as number) > 0)}
      >
        <div>12h</div>
        <div>{`${priceData?.USD.percent_change_12h}`}</div>
      </PriceContainer>
      <PriceContainer
        isMinus={Boolean((priceData?.USD.percent_change_24h as number) > 0)}
      >
        <div>1d</div>
        <div>{`${priceData?.USD.percent_change_24h}%`}</div>
      </PriceContainer>
      <PriceContainer
        isMinus={Boolean((priceData?.USD.percent_change_7d as number) > 0)}
      >
        <div>7d</div>
        <div>{`${priceData?.USD.percent_change_7d}%`}</div>
      </PriceContainer>
      <PriceContainer
        isMinus={Boolean((priceData?.USD.percent_change_30d as number) > 0)}
      >
        <div>30d</div>
        <div>{`${priceData?.USD.percent_change_30d}%`}</div>
      </PriceContainer>
    </Container>
  );
}

export default Price;
