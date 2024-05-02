export type ResponseObject = {
  statusOk: boolean;
  message: string;
  data?:any
};

export function ServiceResponse(
  message: string,
  data?: any,
  statusOk: boolean = true,
): ResponseObject {
  return { statusOk, message,data  };
}
