import * as React from "react";
import ClipLoader from "react-spinners/ClipLoader";

type Props = {
	loading: boolean;
};

function LoadingComp({ loading }: Props): JSX.Element {
	// Destructure the 'loading' prop here
	return (
		<div>
			<ClipLoader
				color="white"
				loading={loading}
				size={150}
				aria-label="Loading Spinner"
			/>
		</div>
	);
}

export default LoadingComp;
