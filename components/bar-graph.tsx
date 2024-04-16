'use client';
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { ResponsiveBar } from "@nivo/bar"
import axios from "axios"
import { set } from "date-fns";
import { useEffect, useState } from "react"

export function BarGraph() {

  return (
    <Card className="w-full max-w-2xl bg-transparent border-0">
      <CardHeader>
        <CardTitle>Event Stats</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <BarChart className="h-[250px] w-full rounded-lg" />
      </CardContent>
    </Card>
  )
}

function BarChart(props: any) {
  const [data, setData] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get("/api/event/stats");
      // console.log(data);
      for (let i = 0; i < data.length && i < 6; i++) {
        setData((prev) => [...prev, { name: data[i][0], count: data[i][1] }]);
      }
    }
    fetchData();
  }, []);
  
  return (
    <div {...props}>
      <ResponsiveBar
        data={data}
        keys={["count"]}
        indexBy="name"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={['#1C1678']}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A bar chart showing data"
      />
    </div>
  )
}
