import { Status, STATUS_TEXT } from "httpStatus";
import { Context } from "types";

interface httpStatus {
  status: number;
  message: string;
}

export function httpStatus(context: Context, status: Status): httpStatus {
  context.response.status = status;
  return {
    status: status,
    message: STATUS_TEXT[status],
  };
}
