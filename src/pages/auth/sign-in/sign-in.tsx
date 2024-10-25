import { Card, CardBody, CardHeader } from "@nextui-org/card";

import { SignInForm } from "../../../components/auth/sign-in/SignInForm";

import "./index.css";

export const SignInPage = () => {
  return (
    <div className="register-page flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h3 className="text-3xl text-center min-w-full">Login </h3>
        </CardHeader>
        <CardBody>
          <SignInForm />
        </CardBody>
      </Card>
    </div>
  );
};
