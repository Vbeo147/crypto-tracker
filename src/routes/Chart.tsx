import { useQuery } from "react-query";
import { getchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IChartData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface CharProps {
  coinId: string;
}

function Chart({ coinId }: CharProps) {
  const { isLoading, data } = useQuery<IChartData[]>(["ohlcv", coinId], () =>
    getchCoinHistory(coinId)
  );
  console.log(
    data?.map((i) => {
      const ItemArr = [i.open, i.high, i.low, i.close];
      return {
        x: new Intl.DateTimeFormat("ko-KR").format(i.time_close),
        y: ItemArr.map((c) => Number(c)),
      };
    }) ?? []
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data:
                data?.map((i) => {
                  const ItemArr = [i.open, i.high, i.low, i.close];
                  return {
                    x: new Date(i.time_close),
                    y: ItemArr.map((c) => Number(c)),
                  };
                }) ?? [],
            },
          ]}
          options={{
            chart: {
              type: "candlestick",
              width: 500,
              height: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            theme: { mode: "dark" },
            grid: { show: false },
            stroke: { curve: "smooth", width: 4 },
            title: {
              text: "CandleStick Chart",
              align: "left",
            },
            tooltip: {
              enabled: true,
            },
            xaxis: { type: "datetime" },
            yaxis: { show: false },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#3C90EB",
                  downward: "#DF7D46",
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
