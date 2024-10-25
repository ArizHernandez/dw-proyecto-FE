import { getLocalTimeZone, now } from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { Form, Formik } from "formik";

import { toast } from "react-toastify";
import { useAuth } from "../../../hooks/useAuth";
import { signUpNewUser } from "../../../services/sign-up-service";
import { DatePickerField, InputField } from "../../../ui";
import { SignUpFormPayload, SignUpPayload } from "./interfaces/signup-form";
import { SignUpSchema } from "./utilities/form-validation";

export const SignUpForm = () => {
  const { login } = useAuth();
  
  const handleSubmit = async (values: SignUpFormPayload) => {
    const { confirmPassword, ...rest } = values;

    const payload: SignUpPayload = {
      ...rest,
      birthdate: new Date(values.birthdate.toDate("UTC")).toISOString(),
    };

    try {
      const response = await signUpNewUser(payload);

      const { token } = response.data;
      login(token);
      toast.success("Usuario registrado exitosamente");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? error.message);
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
      validationSchema={SignUpSchema}
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
