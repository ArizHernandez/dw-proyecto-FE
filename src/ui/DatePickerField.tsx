import { DatePicker } from "@nextui-org/date-picker";
import { useField } from "formik";
import { I18nProvider } from "@react-aria/i18n";

type Props = {
  name: string;
  label: string;
  isRequired?: boolean;
};

export const DatePickerField = (props: Props) => {
  const [field, meta] = useField(props);

  return (
    <I18nProvider locale="es-GT">
      <DatePicker
        hideTimeZone
        showMonthAndYearPickers
        granularity="day"
        value={field.value ? field.value : null}
        onChange={(date) => {
          field.onChange({
            target: {
              name: field.name,
              value: date ? date : null,
            },
          });
        }}
        label={props.label}
        isRequired={props.isRequired}
        isInvalid={meta.touched && meta.error ? true : false}
        errorMessage={meta.touched && meta.error ? meta.error : undefined}
      ></DatePicker>
    </I18nProvider>
  );
};
