import React from "react";
import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

interface InstructionsProps {
  searchData: string | null;
  dataJSON: any; 
}

function InstructionsPage(props: InstructionsProps): JSX.Element {
  const navigate = useNavigate();

  if (!props.dataJSON) {
    // Handle the case when dataJSON is undefined
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4 relative">
        <p>Data not available.</p>
        <BsFillArrowLeftCircleFill
          className="absolute top-2 left-7 cursor-pointer"
          size={24}
          onClick={() => navigate("/explore")}
        />
      </div>
    );
  }

  const { exercise } = props.dataJSON;

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 relative">
      <div className="mb-4 text-center">
        <BsFillArrowLeftCircleFill
          className="absolute top-2 left-7 cursor-pointer"
          size={24}
          onClick={() => navigate("/explore")}
        />
        <h1 className="text-3xl font-bold">{exercise?.name}</h1>
      </div>
      <div className="mb-4">
        <img
          src={exercise?.gifUrl}
          alt={exercise?.name}
          className="max-w-full max-h-96"
        />
      </div>
      <div className="text-left">
        <h2 className="mb-2 text-xl font-semibold">Exercise Details:</h2>
        <p>
          <strong>Body Part:</strong> {exercise?.bodyPart}
        </p>
        <p>
          <strong>Equipment:</strong> {exercise?.equipment}
        </p>
        <p>
          <strong>Target Muscles:</strong> {exercise?.target}
        </p>
        <p>
          <strong>Secondary Muscles:</strong>{" "}
          {exercise?.secondaryMuscles.join(", ")}
        </p>
        <h2 className="mt-4 mb-2 text-xl font-semibold">Instructions:</h2>
        <ul>
          {exercise?.instructions.map((instruction: string, index: number) => (
            <li key={index} className="ml-4 list-disc">
              {instruction}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default InstructionsPage;
