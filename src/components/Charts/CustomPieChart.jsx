import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  const COLORS = ["#7C3AED", "#EF4444", "#FF6900"];

  // ✅ Custom Legend Renderer with circles
  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 10,
          listStyle: "none",
          padding: 0,
        }}
      >
        {payload.map((entry, index) => (
          <li
            key={`item-${index}`}
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: 20,
              fontSize: "14px",
              color: "#333",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 12,
                height: 12,
                borderRadius: "50%", // 👈 makes it a circle
                backgroundColor: entry.color,
                marginRight: 6,
              }}
            />
            {entry.value}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={renderLegend} verticalAlign="bottom" />{" "}
          {/* 👈 force legend below */}
          {showTextAnchor && (
            <>
              <text
                x="50%"
                y="50%"
                dy={-25}
                textAnchor="middle"
                fill="#666"
                fontSize="14px"
              >
                {label}
              </text>
              <text
                x="50%"
                y="50%"
                dy={8}
                textAnchor="middle"
                fill="#333"
                fontSize="24px"
                fontWeight="600"
              >
                {totalAmount}
              </text>
            </>
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
