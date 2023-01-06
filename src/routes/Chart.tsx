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

interface Error {
  error: string;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IChartData[] & Error>(
    ["ohlcv", coinId],
    () => getchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : !data?.error ? (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data:
                data?.map((i) => {
                  const ohlcv = [i.open, i.high, i.low, i.close];
                  return {
                    x: new Date(i.time_close),
                    y: ohlcv.map((c) => Number(c)),
                  };
                }) ?? [],
            },
          ]}
          options={{
            chart: {
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
              style: {
                color: "black",
              },
            },
            tooltip: {
              enabled: true,
            },
            xaxis: {
              type: "datetime",
              axisTicks: { show: true, color: "black" },
              labels: {
                show: true,
                style: {
                  colors: [
                    "black",
                    "black",
                    "black",
                    "black",
                    "black",
                    "black",
                  ],
                },
              },
            },
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
      ) : (
        <div
          style={{
            textAlign: "center",
          }}
        >
          {data.error}
        </div>
      )}
    </div>
  );
}

export default Chart;
