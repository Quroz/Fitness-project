import * as d3 from "d3";
import CompWorkouts from "../interfaces/CompWorkouts";
import React, { useEffect, useRef, useState } from "react";
import { select, Selection } from "d3-selection";
interface IProps {
  heightSVG: number;
  widthSVG: number;
  workouts: CompWorkouts[];
  target: number;
}
function CircleBar({ heightSVG, widthSVG, workouts, target }: IProps) {
  const svgRef = useRef<null | SVGSVGElement>(null);
  const [svg, setSelection] = useState<null | Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  >>(null);
  const innerRadius = 60;
  const outerRadius = 100;
  const cornerRadius = 20;
  const percentage = workouts.length / target;
  const transformValue = `translate(${widthSVG / 2}, ${heightSVG / 2})`;
  const foregroundArc = {startAngle: 0, endAngle: 2*Math.PI*percentage}
  const arc: any = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .cornerRadius(cornerRadius)
    .startAngle(0);
  useEffect(() => {
    if (!svg) {
      setSelection(select(svgRef.current));
    } else {
      const selection = svg.append("g").attr("transform", transformValue);

      // Background Arc
      selection
        .append("path")
        .attr("class", "background")
        .attr("d", arc.endAngle(2 * Math.PI))
        .attr("fill", "#ddd");

      // Foreground Arc
	  const foregroundPath = selection
	  .append("path")
	  .attr("class", "foreground")
	  .attr("d", arc.endAngle(0)) // Initialize to start angle of backgroundArc
	
	foregroundPath
	  .transition()
	  .duration(2000)
	  .delay(1000)
  .attrTween('d', function(d,i) {
    // for each chart 
    // create an interpolator between start angle 0
    // and end angle of d.pct
    var interpolate = d3.interpolate(0, foregroundArc.endAngle);

    // attrTween is expecting a function to call for every iteration of t
    // so let's return such a function
    return function(t) {
      // assign end angle to interpolated value for t
      arc.endAngle(interpolate(t));
      // call arc and return intermediate `d` value
      return arc();
    };
  })
	  .attr("fill", `url(#gradient-${percentage}`);

      // Display Text
      selection
        .append("text")
        .attr("text-anchor", "middle")
        .attr("x", 0)
        .attr("y", 0)
        .text(`${workouts.length}/${target}`);

      selection
        .append("text")
        .attr("text-anchor", "middle")
        .attr("x", 0)
        .attr("y", 15)
        .text("workouts");

      // Gradient Definition
      const defs = svg.append("defs");
      const gradient = defs
        .append("linearGradient")
        .attr("id", `gradient-${percentage}`)
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");

      gradient.append("stop").attr("offset", "0%").attr("stop-color", "blue");

      gradient.append("stop").attr("offset", "80%").attr("stop-color", "cyan");
    }
  }, [arc, foregroundArc.endAngle, percentage, svg, target, transformValue, workouts.length]);

  return (
    <svg
      width={widthSVG}
      height={heightSVG}
      className="fill-black font-bold"
      ref={svgRef}
    >
      {/* <g>
				<path transform={transformValue} d={backgroundArc} fill="#ddd" />
				<path
					transform={transformValue}
					d={foregroundArc}
					fill={`url(#gradient-${percentage})`}
				/>
				<text textAnchor="middle" x={widthSVG / 2} y={heightSVG / 2}>
					{workouts.length}/{target}
				</text>
				<text textAnchor="middle" x={widthSVG / 2} y={heightSVG / 2 + 15}>
					workouts
				</text>
				<defs>
					<linearGradient
						id={`gradient-${percentage}`}
						x1="0%"
						y1="0%"
						x2="100%"
						y2="0%"
					>
						<stop offset="0%" stopColor={"blue"} />
						<stop offset="80%" stopColor={"cyan"} />
					</linearGradient>
				</defs>
			</g> */}
    </svg>
  );
}
export default CircleBar;
