import React from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Exercise from "../../interfaces/Exercise";
import LoadingComp from "../../components/Loading";
import { AiOutlineQuestionCircle, AiOutlineClose } from "react-icons/ai";

interface SearchbarViewProps {
	// Searching for body part
	selectedPart: string;
	setSelectedPart: (part: string) => void;
	bodyPart: { part: string; apiCall: string }[];

	// Searching for exercise by name
	exercise_results: Exercise[];
	setExercisesShown: (num: number) => void;
	exercisesShown: number;
	// Searching and filtering by equipment
	equipmentList: { equipment: string; apiCall: string }[];
	equipments: string;
	setEquipments: (equipment: string) => void;

	// Searching for exercise by name
	searchExercise: string;
	setSearchExercise: (exercise: string) => void;
	searchByName: number;
	setSearchByName: (search: number) => void;

	// Navigating to instructions page
	goToInstructionsPage: (exercise: Exercise) => void;

	// Loading spinner
	showLoading: boolean;
	setShowLoading: (loading: boolean) => void;

	numberOfEx: number;
	setNumberOfEx: (numberOfEx: number) => void;
	filterResults: (selectedEquipment: string, filter: boolean) => void;

	// Clicking on question mark
	clicked: boolean;
	setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchbarView({
	selectedPart,
	setSelectedPart,
	bodyPart,
	exercise_results,
	setExercisesShown,
	equipments,
	equipmentList,
	setEquipments,
	searchExercise,
	setSearchExercise,
	searchByName,
	setSearchByName,
	goToInstructionsPage,
	showLoading,
	setShowLoading,
	numberOfEx,
	setNumberOfEx,
	filterResults,
	clicked,
	setClicked,
}: SearchbarViewProps) {
	return (
		<div className="flex flex-col w-full h-screen bg-gray-100 first-letter">
			<div>
				<h1 className="text-5xl text-center">Explore Page</h1>
				<div>
					{!clicked ? (
						<AiOutlineQuestionCircle
							className="absolute z-50 transition duration-300 ease-in cursor-pointer right-2 top-2 hover:opacity-70"
							size={24}
							onClick={() => setClicked(!clicked)}
						/>
					) : (
						<AiOutlineClose
							className="absolute z-50 transition duration-300 ease-in cursor-pointer right-2 top-2 hover:opacity-70"
							size={20}
							onClick={() => setClicked(!clicked)}
						/>
					)}
					<div
						className={`${
							clicked
								? "absolute top-2 transform duration-300 ease-in flex items-center justify-center w-full mt-4 z-50 opacity-100"
								: "absolute top-[-100%] opacity-50"
						} transition-all`}
					>
						<div className="flex flex-col items-center w-[400px] bg-gray-200 rounded-md p-2 relative">
							<h1>
								Type <strong>"in the searchbar"</strong> to search for a
								specific workout by name. Press the glass to search.
							</h1>
							<h1>
								Select <strong>"Body part"</strong> to search exercises by body part.
							</h1>
							<h1>
								Select <strong>"Equipment"</strong> to filter exercises by
								equipment.
							</h1>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col items-center h-4/5">
				<div className="flex flex-col items-center gap-2 mt-5 md:gap-0 md:flex-row md:items-start h-fit">
					<div className="flex divide-x">
						<input
							className="px-2 rounded-l-lg"
							type="text"
							placeholder={"Search for an exercise"}
							value={searchExercise}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									setSearchByName(searchByName + 1);
									setExercisesShown(100);
									setShowLoading(true);
									setNumberOfEx(10);
								}
							}}
							onChange={(e) => {
								setSearchExercise(e.target.value);
							}}
						/>

						<button
							className="p-1 bg-white border-gray-200 rounded-r-lg cursor-pointer "
							onClick={() => {
								setSearchByName(searchByName + 1);
								setExercisesShown(100);
								setNumberOfEx(10);
								setShowLoading(true);
							}}
							disabled={searchExercise === ""}
						>
							<MagnifyingGlassIcon
								className="mr-1 text-blue-200 w-7 h-7 hover:text-blue-100"
								aria-hidden="true"
							/>
						</button>
					</div>
					<div className="flex">
						<Menu as="div" className="relative inline-block ml-5 text-left">
							<div>
								<Menu.Button
									className={`inline-flex w-full justify-center rounded-md bg-black  px-4 py-2 text-sm font-medium  hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${
										searchExercise !== ""
											? "bg-gray-300 cursor-not-allowed"
											: "bg-lime-300 hover:bg-lime-200"
									}`}
									disabled={searchExercise !== ""}
								>
									{selectedPart}
									<ChevronDownIcon
										className="w-5 h-5 ml-2 -mr-1 text-blue-200 hover:text-blue-100"
										aria-hidden="true"
									/>
								</Menu.Button>

								<Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
									{bodyPart.map((bodyArea) => (
										<Menu.Item key={bodyArea.part}>
											{({ active }) => (
												<button
													className={`${
														active ? "bg-lime-300 text-white" : "text-gray-900 "
													} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
													onClick={() => {
														setSelectedPart(bodyArea.apiCall);
														// Increment the number of exercises shown by 10
														setExercisesShown(100);
														setNumberOfEx(10);
														setShowLoading(true);
													}}
												>
													{bodyArea.part}
												</button>
											)}
										</Menu.Item>
									))}
								</Menu.Items>
							</div>
						</Menu>
						<Menu as="div" className="relative inline-block ml-5 text-left">
							<div>
								<Menu.Button
									className={`inline-flex w-full justify-center rounded-md  px-4 py-2 text-sm font-medium  hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${
										searchExercise !== ""
											? "bg-gray-300 cursor-not-allowed"
											: "bg-lime-300 hover:bg-lime-200"
									}`}
									disabled={searchExercise !== ""}
								>
									{equipments}
									<ChevronDownIcon
										className="w-5 h-5 ml-2 -mr-1 text-blue-200 hover:text-blue-100"
										aria-hidden="true"
									/>
								</Menu.Button>
								<Menu.Items className="absolute right-0 w-56 mt-2 overflow-y-scroll origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg h-96 ring-1 ring-black ring-opacity-5 focus:outline-none">
									<div className="px-1 py-1 ">
										{equipmentList.map((equipment) => (
											<Menu.Item key={equipment.equipment}>
												{({ active }) => (
													<button
														className={`${
															active
																? "bg-lime-300 text-white"
																: "text-gray-900 "
														} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
														onClick={() => {
															const selectedEquipment =
																equipment.apiCall === "No Filter"
																	? ""
																	: equipment.apiCall;
															setEquipments(selectedEquipment);
															filterResults(
																selectedEquipment,
																selectedEquipment !== ""
															);
														}}
													>
														{equipment.equipment}
													</button>
												)}
											</Menu.Item>
										))}
									</div>
								</Menu.Items>
							</div>
						</Menu>
					</div>
				</div>
				<div className="flex flex-wrap justify-center w-4/5 mt-10 overflow-y-scroll h-4/5">
					{showLoading ? (
						<LoadingComp loading={showLoading} />
					) : exercise_results.length > 0 ? (
						<>
							{exercise_results.map((exercise, idx) => {
								if (idx < numberOfEx)
									return (
										<div
											key={exercise.id}
											className="flex w-[14rem] bg-white rounded-3xl my-3 mx-2 cursor-pointer"
											onClick={() => {
												goToInstructionsPage(exercise);
											}}
										>
											<div className="flex flex-col items-center p-3 mx-2 ">
												<div>
													<img src={exercise.gifUrl} alt={exercise.name} />
												</div>
												<div className="ml-1">{exercise.name}</div>
											</div>
										</div>
									);
								else {
									return null;
								}
							})}
							{numberOfEx < exercise_results.length && (
								<div className="flex items-center justify-center w-4/5">
									<button
										className="flex text-center items-center h-[50px] text-sm px-2 rounded-lg bg-lime-300 w-15 hover:bg-lime-200"
										onClick={() => setNumberOfEx(numberOfEx + 10)}
									>
										Load more exercises
									</button>
								</div>
							)}
						</>
					) : (
						<div className="my-5 text-center">
							<p>No exercises to display.</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
