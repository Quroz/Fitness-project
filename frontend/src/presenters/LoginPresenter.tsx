import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAccount } from "../hooks/useAccount";
import LoadingComp from "../components/Loading";
import LoginView from "../pages/Authentication/LoginView"

interface ILoginPresenterProps {
  login: (email: string, password: string) => Promise<void>;
  loginError: string;
  isLoading: boolean;
}

const LoginPresenter: React.FC<ILoginPresenterProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, loginError, isLoading } = useAccount({});

  const handleLogin = async () => {
    await login(email, password);
  };

  return (
    <div>
      <LoginView
        email={email}
        password={password}
        loginError={loginError}
        isLoading={isLoading}
        setEmail={setEmail}
        setPassword={setPassword}
        onLoginClick={handleLogin}
      />
    </div>
  );
};

export default LoginPresenter;
