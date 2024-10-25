import { Card, CardBody, CardHeader } from "@nextui-org/card";

import { SignUpForm } from "../../../components/auth/signin/SignUpForm";

import "./index.css";

export const SignUpPage = () => {
  return (
    <div className="register-page flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h3 className="text-3xl text-center min-w-full">
            Registro{" "}
            </h3>
        </CardHeader>
        <CardBody>
          <SignUpForm />
        </CardBody>
      </Card>
    </div>
  );
};
