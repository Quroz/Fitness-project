import React from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

interface InstructionsProps {
  searchData: string | null;
  dataJSON: any; 
  navigateHandler: () => void;
}

function InstructionsPage(props: InstructionsProps): JSX.Element {


  if (!props.dataJSON) {
    // Handle the case when dataJSON is undefined
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4 relative">
        <p>Data not available.</p>
        <BsFillArrowLeftCircleFill
          className="absolute top-2 left-7 cursor-pointer"
          size={24}
          onClick={() => props.navigateHandler()}
        />
      </div>
    );
  }

  const { exercise } = props.dataJSON;

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 relative">
        <BsFillArrowLeftCircleFill
          className="absolute top-2 left-7 cursor-pointer"
          size={24}
          onClick={() => props.navigateHandler()}
        />
      <div className="mb-4">
        <img
          src={exercise?.gifUrl}
          alt={exercise?.name}
          className="max-w-full max-h-96 mt-12 md:mt-0"
        />
      </div>
      <h1 className="text-3xl font-bold text-center">{exercise?.name}</h1>
      <div className="text-left">
        <h2 className="mb-2 text-xl font-semibold text-center md:text-left ml-8">Exercise Details:</h2>
        <p className="text-center md:text-left ml-8">
          <strong>Body Part:</strong> {exercise?.bodyPart}
        </p>
        <p className="text-center md:text-left ml-8">
          <strong>Equipment:</strong> {exercise?.equipment}
        </p>
        <p className="text-center md:text-left ml-8">
          <strong>Target Muscles:</strong> {exercise?.target}
        </p>
        <p className="text-center md:text-left ml-8">
          <strong>Secondary Muscles:</strong>{" "}
          {exercise?.secondaryMuscles.join(", ")}
        </p>
        <h2 className="mt-4 mb-2 text-xl font-semibold text-center md:text-left ml-8">Instructions:</h2>
        <ul className="md:pb-12">
          {exercise?.instructions.map((instruction: string, index: number) => (
            <li key={index} className="ml-8 list-disc">
              {instruction}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default InstructionsPage;
