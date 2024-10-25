import {
  ZonedDateTime,
  CalendarDate,
  CalendarDateTime,
} from "@internationalized/date";

export interface SignInPayload {
  registrationnumber: string;
  dpi: string;
  birthdate: string;
  password: string;
}

export interface SignInFormPayload {
  registrationnumber: string;
  dpi: string;
  birthdate: CalendarDate | CalendarDateTime | ZonedDateTime;
  password: string;
}

export interface SignInFormResponse {
  token: string;
}
