interface User {
	name: string;
	weight: string;
	height: string;
	age: string;
	weightOptions: { value: string; label: string }[];
	heightOptions: { value: string; label: string }[];
	ageOptions: { value: string; label: string }[];
	goals: string[];
	updatedSettings: any;
}
export default User;
