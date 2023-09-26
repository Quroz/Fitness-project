import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { select, Selection } from "d3-selection";
interface IProps {
  heightSVG: number;
  widthSVG: number;
}
function BarChart({ heightSVG, widthSVG }: IProps) {
  let margin = {top: 10, right: 30, bottom: 90, left: 40},
    width = widthSVG - margin.left - margin.right,
    height = heightSVG - margin.top - margin.bottom;
  const data = [
    {
      week: "Week 1",
      workouts: 4,
    },
    {
      week: "Week 2",
      workouts: 6,
    },
    {
      week: "Week 3",
      workouts: 5,
    },
    {
      week: "Week 4",
      workouts: 2,
    },
  ];
  const svgRef = useRef<null | SVGSVGElement>(null);
  const [svg, setSelection] = useState<null | Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  >>(null);

  const xAxis = d3
    .scaleBand()
    .domain(data.map((d) => d.week))
    .range([0, width])
    .padding(0.6);
  const yAxis = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.workouts + 2)!])
    .range([height, 0]);

  useEffect(() => {
    if (!svg) {
      setSelection(select(svgRef.current));
    } else {
      const selection = svg.append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

      selection
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", xAxis.bandwidth())
        .attr("x", (d) => xAxis(d.week)!)
        .attr("y", (d) => yAxis(d.workouts))
        .attr("fill", "#D8FFF8")
        .attr("height", (d) => height - yAxis(d.workouts))
        .attr("rx", "10")
      
        selection
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text((d) => d.workouts) // Assuming you want to display the workouts data as labels
        .attr("x", (d) => xAxis(d.week)! + xAxis.bandwidth() / 2) // Position text in the middle of the rectangle
        .attr("y", (d) => yAxis(d.workouts) - 5) // Adjust the y position for better placement
        .attr("text-anchor", "middle") // Center the text horizontally
        .attr("fill", "black"); // Set the text color to black (you can change this as needed)

      selection.append("text")
        .attr("x", width/2)
        .attr("y", margin.top)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Workouts in the last 4 weeks");


      selection
        .append("g")
        .attr("fill", "#fafafa")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xAxis))
   
    }
  }, [svg]);

  return <svg className="fill-[#FAFAFA] font-bold" ref={svgRef} height={heightSVG} width={widthSVG} />;
}

export default BarChart;
