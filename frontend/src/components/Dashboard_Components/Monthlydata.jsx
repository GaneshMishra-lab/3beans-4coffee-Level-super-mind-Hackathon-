import React from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  import { ThumbsUp, MessageCircle,Share2 } from 'lucide-react';

  
  export default function Monthlydata({data}) {
    
    const groupByMonthAndYear = (data) => {
        const monthYearMap = {};
        data.forEach((d) => {
          const date = new Date(d.dateOfPost);
          const monthYear = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`; // e.g., "January 2023"
          
          if (!monthYearMap[monthYear]) {
            monthYearMap[monthYear] = { monthYear, likes: 0, comments: 0, shares: 0 , timestamp: date.getTime() };
          }
          monthYearMap[monthYear].likes += d.likes;
          monthYearMap[monthYear].comments += d.comments;
          monthYearMap[monthYear].shares += d.shares;

        });
        return Object.values(monthYearMap);
      };
      
      const monthlyDataWithYear = groupByMonthAndYear(data).sort((a, b) => a.timestamp - b.timestamp);
     
    
    
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
          
            <div className="bg-[rgba(31, 41, 55, 0.8)] border border-[#4B5563] px-4 py-2 backdrop-blur-[0.75px] text-center text-gray-100">
              {/* Customize x-axis label text */}
              <p >{`${label}`}</p>
              {/* Customize y-axis value text */}
              <div className=" flex gap-1 "> <ThumbsUp />{`${payload[0].value}`}</div>
              <div className="flex gap-1 "> <MessageCircle/> {`${payload[1].value}`}</div>
              <div className="flex gap-1 "> <Share2/> {`${payload[2].value}`}</div>
            </div>
          );
        }
        return null;
      };

      const renderLineChart = (
        <LineChart width='50%' height='300' data={monthlyDataWithYear}>
          <Line type="monotone" dataKey="likes" stroke="red" />
          <Line type="monotone" dataKey="comments" stroke="blue" />
          <Line type="monotone" dataKey="shares" stroke="green" />
    
          {/* <CartesianGrid stroke="#ccc"  /> */}
          <XAxis dataKey="monthYear" />
          <YAxis domain={[0, "dataMax"]} />
          <Tooltip content={<CustomTooltip />} 
          contentStyle={{
            backgroundColor: "rgba(31, 41, 55, 0.8)",
            borderColor: "#4B5563",
          }}
          itemStyle={{ color: "#E5E7EB" }}
          cursor={false} />
        </LineChart>
      );

      

      return(
       < ResponsiveContainer width='100%' height="100%">
       {
          renderLineChart
       }
       </ResponsiveContainer>
      )
}