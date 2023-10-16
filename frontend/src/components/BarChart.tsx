import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { select, Selection } from "d3-selection";
import { text } from "d3";
interface IProps {
  heightSVG: number;
  widthSVG: number;
  barData: { name: string, value: number }[]
}
function BarChart({ heightSVG, widthSVG, barData }: IProps) {
  let margin = { top: 10, right: 30, bottom: 90, left: 40 },
    width = widthSVG - margin.left - margin.right,
    height = heightSVG - margin.top - margin.bottom;
  console.log(barData)
  const svgRef = useRef<null | SVGSVGElement>(null);
  const [svg, setSelection] = useState<null | Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  >>(null);

  const xAxis = d3
    .scaleBand()
    .domain(barData.map((d) => d.name))
    .range([0, width])
    .padding(0.6);
  const yAxis = d3
    .scaleLinear()
    .domain([0, d3.max(barData, (d) => d.value + 2)!])
    .range([height, 0]);

  useEffect(() => {
    if (!svg) {
      setSelection(select(svgRef.current));
    } else {
      const selection = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      selection
        .selectAll("rect")
        .data(barData)
        .enter()
        .append("rect")
        .attr("width", xAxis.bandwidth())
        .attr("x", (d) => xAxis(d.name)!)
        .attr("y", (d) => yAxis(d.value))
        .attr("fill", "darkslateblue")
        .attr("height", (d) => height - yAxis(d.value))
        .attr("rx", "10");

      selection
        .selectAll("text")
        .data(barData)
        .enter()
        .append("text")
        .text((d) => d.value) // Assuming you want to display the workouts data as labels
        .attr("x", (d) => xAxis(d.name)! + xAxis.bandwidth() / 2) // Position text in the middle of the rectangle
        .attr("y", (d) => yAxis(d.value) - 5) // Adjust the y position for better placement
        .attr("text-anchor", "middle"); // Center the text horizontally

      selection
        .append("text")
        .attr("x", width / 2)
        .attr("y", margin.top)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Workouts in the last Week");

      const xLine = selection
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xAxis));

      xLine
        .selectAll("path") // Select the line element within the axis
        .style("stroke", "#fafafa"); // Set the stroke color to white

      xLine.selectAll("line").style("stroke", "#fafafa"); // Set the stroke color to white

      xLine.selectAll("text").style("fill", "#fafafa") // Set text to white
    }
  }, [svg, barData]);

  return (
    <svg
      className="fill-[#FAFAFA] font-bold"
      ref={svgRef}
      height={heightSVG}
      width={widthSVG}
    />
  );
}

export default BarChart;
