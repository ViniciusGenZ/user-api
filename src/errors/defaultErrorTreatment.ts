import { Response } from "express";

import { formatResponse } from "@utils/formatResponse";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function defaultErrorTreatment(res: Response, err: any) {
  return formatResponse(res, 500, "Internal Server Error", err);
}

export default defaultErrorTreatment;
