import React, { useState } from "react";
import { useAccount } from "../hooks/useAccount";
import SignupView from "../pages/Authentication/SignupView";

interface IAppProps {
  signup: (email: string, password: string, name: string, weight: string, height: string, age: string) => Promise<void>;
  signupError: string;
  setSignupError: Function;
  isLoading: boolean;
  heightOptions: number[];
  ageOptions: number[];
  weightOptions: number[];
}

const SignupPresenter: React.FC<IAppProps> = (props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [age, setAge] = useState<string>("");

  const { signup, signupError, setSignupError, isLoading } = useAccount(props);

  const heightOptions = Array.from({ length: 121 }, (_, index) => 100 + index);
  const ageOptions = Array.from({ length: 100 }, (_, index) => index + 1);
  const weightOptions = Array.from({ length: 181 }, (_, index) => 20 + index);

  async function clickHandler() {
    if (password !== confirmPassword) {
      setSignupError("Passwords do not match");
      alert("Passwords do not match");
    } else {
      await signup(email, password, name, weight, height, age);
    }
  }

  return (
    <div>
      <SignupView
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        name={name}
        weight={weight}
        height={height}
        age={age}
        signupError={signupError}
        isLoading={isLoading}
        setEmail={setEmail}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        setName={setName}
        setWeight={setWeight}
        setHeight={setHeight}
        setAge={setAge}
        onSignupClick={clickHandler}
        heightOptions={heightOptions}
        ageOptions={ageOptions}
        weightOptions={weightOptions}
      />
    </div>
  );
};

export default SignupPresenter;
