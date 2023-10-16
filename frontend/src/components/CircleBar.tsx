import * as d3 from "d3";
import CompWorkouts from "../interfaces/CompWorkouts"

interface IProps {
	heightSVG: number;
	widthSVG: number;
	workouts: CompWorkouts[];
	target: number;
}
function CircleBar({ heightSVG, widthSVG, workouts, target }: IProps) {
	const innerRadius = 60;
	const outerRadius = 100;
	const cornerRadius = 20;
	const percentage = workouts.length / target;
	const transformValue = `translate(${widthSVG / 2}, ${heightSVG / 2})`;
	const arc: any = d3
		.arc()
		.innerRadius(innerRadius)
		.outerRadius(outerRadius)
		.cornerRadius(cornerRadius)
		.startAngle(0);

	const backgroundArc: string = arc({ endAngle: 2 * Math.PI });
	const foregroundArc: string = arc({
		endAngle: 2 * Math.PI * percentage,
		x: 100,
		y: 300,
	});

	return (
		<svg
			width={widthSVG}
			height={heightSVG}
			className="fill-black font-bold"
		>
			<g>
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
			</g>
		</svg>
	);
}
export default CircleBar;
