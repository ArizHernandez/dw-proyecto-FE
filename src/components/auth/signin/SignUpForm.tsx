import { getLocalTimeZone, now } from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { Form, Formik } from "formik";

import { DatePickerField, InputField } from "../../../ui";
import { SignUpFormPayload, SignUpPayload } from "./interfaces/signup-form";
import { SignInSchema } from "./utilities/form-validation";
import { toast } from "react-toastify";
import { signUpNewUser } from "../../../services/sign-up-service";

export const SignUpForm = () => {
  const handleSubmit = async (values: SignUpFormPayload) => {
    const { confirmPassword, ...rest } = values;

    const payload: SignUpPayload = {
      ...rest,
      birthdate: new Date(values.birthdate.toDate("UTC")).toISOString(),
    };

    try {
      await signUpNewUser(payload);
      toast.success("Usuario registrado exitosamente");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Formik
      initialValues={{
        registrationnumber: "",
        fullname: "",
        email: "",
        dpi: "",
        birthdate: now(getLocalTimeZone()),
        password: "",
        confirmPassword: "",
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
          <InputField
            name="fullname"
            label="Nombre completo"
            type="text"
          ></InputField>
        </div>
        <div className="space-y-2">
          <InputField
            name="email"
            label="Correo electrónico"
            type="email"
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
        <div className="space-y-2">
          <InputField
            name="confirmPassword"
            label="Confirmar contraseña"
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
