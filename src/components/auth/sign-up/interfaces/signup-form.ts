import {
  ZonedDateTime,
  CalendarDate,
  CalendarDateTime,
} from "@internationalized/date";

export interface SignUpPayload {
  registrationnumber: string;
  fullname: string;
  email: string;
  dpi: string;
  birthdate: string;
  password: string;
}

export interface SignUpFormPayload {
  registrationnumber: string;
  fullname: string;
  email: string;
  dpi: string;
  birthdate: CalendarDate | CalendarDateTime | ZonedDateTime;
  password: string;
  confirmPassword: string;
}
