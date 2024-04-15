'use client';
import { ResponsivePie } from "@nivo/pie"

export function PieChartComponent() {
  return (
    <PieChart className="w-full aspect-[1]" />
  )
}

function PieChart(props: any) {
  return (
    <div {...props}>
      <ResponsivePie
        data={[
          { id: "Incomplete", value: 111 },
          { id: "Completed", value: 157 },
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
        arcLabelsRadiusOffset={0.65}
        colors={["#0F172A", '#1C1678']}
        theme={{
          labels: {
            text: {
              fontSize: "18px",
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
