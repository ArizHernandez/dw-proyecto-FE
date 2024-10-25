import { getLocalTimeZone, now } from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { Form, Formik } from "formik";

import { toast } from "react-toastify";
import { loginUser } from "../../../services/sign-in-service";
import { DatePickerField, InputField } from "../../../ui";
import { SignInFormPayload, SignInPayload } from "./interfaces/sign-in-form";
import { SignInSchema } from "./utilities/form-validation";
import { useAuth } from "../../../hooks/useAuth";

export const SignInForm = () => {
  const { login } = useAuth();

  const handleSubmit = async (values: SignInFormPayload) => {
    const payload: SignInPayload = {
      ...values,
      birthdate: new Date(values.birthdate.toDate("UTC")).toISOString(),
    };

    try {
      const response = await loginUser(payload);
      toast.success("Inicio de sesión exitoso \n Bienvenido!!");

      const { token } = response.data;
      login(token);
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? error.message);
    }
  };

  return (
    <Formik
      initialValues={{
        registrationnumber: "",
        dpi: "",
        birthdate: now(getLocalTimeZone()),
        password: "",
      }}
      validationSchema={SignInSchema}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-4">
        <div className="space-y-2">
          <InputField
            name="registrationnumber"
            label="Número de colegiado"
            type="text"
          ></InputField>
        </div>
        <div className="space-y-2">
          <InputField name="dpi" label="DPI" type="number"></InputField>
        </div>
        <div className="space-y-2">
          <DatePickerField name="birthdate" label="Fecha de nacimiento" />
        </div>
        <div className="space-y-2">
          <InputField
            name="password"
            label="Contraseña"
            type="password"
          ></InputField>
        </div>
        <Button type="submit" color="primary" className="w-full">
          Registrarse
        </Button>
      </Form>
    </Formik>
  );
};
