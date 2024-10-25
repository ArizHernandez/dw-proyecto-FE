import { Textarea } from "@nextui-org/input";
import { useField } from "formik";

type Props = {
  name: string;
  type: string;
  label: string;
  isRequired?: boolean;
  className?: string;
  variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
};

export const TextAreaField = (props: Props) => {
  const [field, meta] = useField(props);

  return (
    <Textarea
      {...field}
      label={props.label}
      type={props.type}
      className={props.className}
      variant={props.variant}
      isRequired={props.isRequired}
      isInvalid={meta.touched && meta.error ? true : false}
      errorMessage={meta.touched && meta.error ? meta.error : undefined}
    />
  );
};
