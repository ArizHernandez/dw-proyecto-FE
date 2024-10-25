import { Input } from "@nextui-org/input";
import { useField } from "formik";

type Props = {
  name: string;
  type: string;
  label: string;
  isRequired?: boolean;
  variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
};

export const InputField = (props: Props) => {
  const [field, meta] = useField(props);

  return (
    <Input
      {...field}
      label={props.label}
      type={props.type}
      variant={props.variant}
      isRequired={props.isRequired}
      isInvalid={meta.touched && meta.error ? true : false}
      errorMessage={meta.touched && meta.error ? meta.error : undefined}
    ></Input>
  );
};
