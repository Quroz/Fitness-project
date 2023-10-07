import React from "react";

type Props = {
	showLog: boolean;
	renderHandler: (choice: string) => void;
	myWorkouts: boolean;
};


function ChooseView({
  showLog,
  renderHandler,
  myWorkouts,
  
}:Props): JSX.Element  {
	return (
		<div className="h-[200px] w-full">
			<div className="h-full w-[80%] mx-auto relative">
				<h1 className="pt-12 text-4xl">Workout Page</h1>
				<div className="absolute flex items-center w-full gap-12 bottom-8">
					<h1
						className={
							showLog
								? "text-md text-black cursor-pointer border-transparent border-b-2 hover:border-lime-300"
								: "text-md text-gray-500 cursor-pointer border-transparent border-b-2 hover:border-lime-300"
						}
						onClick={() => renderHandler("Workout Logs")}
					>
						Workout Logs
					</h1>
					<h1
						className={
							myWorkouts
								? "text-md text-black cursor-pointer border-transparent border-b-2 hover:border-lime-300"
								: "text-md text-gray-500 cursor-pointer border-transparent border-b-2 hover:border-lime-300"
						}
						onClick={() => renderHandler("myWorkouts")}
					>
						Workout Plan
					</h1>
				</div>
			</div>
		</div>
	);
}

export default ChooseView;
