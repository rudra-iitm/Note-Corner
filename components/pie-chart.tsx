'use client';
import { ResponsivePie } from "@nivo/pie"
import axios from "axios";
import { useEffect, useState } from "react";

export function PieChartComponent() {

  return (
    <PieChart className="w-full aspect-[1]"/>
  )
}

export function PieChart( props: any, ) {
  const [data, setData] = useState({completed: 100, incomplete: 0});

  useEffect(() => {
    async function fetchData() {
      const {data} = await axios.get("/api/todos/stats");
      console.log(data);
      setData(data);
    }

    fetchData();

  }, []);

  return (
    <div {...props}>
      <ResponsivePie
        data={[
          { id: "Incomplete", value: data.incomplete },
          { id: "Completed", value: data.completed },
        ]}
        sortByValue
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        cornerRadius={0}
        padAngle={0}
        borderWidth={1}
        borderColor={"#ffffff"}
        enableArcLinkLabels={false}
        arcLabel={(d) => `${d.id}`}
        arcLabelsTextColor={"#ffffff"}
        arcLabelsRadiusOffset={0.5}
        colors={["#0F172A", '#1C1678']}
        theme={{
          labels: {
            text: {
              fontSize: "15px",
            },
          },
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
        }}
        role="application"
      />
    </div>
  )
}
