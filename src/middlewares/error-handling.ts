import { ApplicationError } from "protocols";
import { Response, Request, NextFunction } from "express";
import httpStatus from "http-status";

export function handlingError(
  err: ApplicationError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err.name === "ConflictError") {
    return res.status(httpStatus.CONFLICT).send({ message: err.message });
  }
  if (
    err.name === "UnauthorizedError" ||
    err.name === "InvalidCredentialsError"
  ) {
    return res.status(httpStatus.UNAUTHORIZED).send({ message: err.message });
  }
  if (err.name === "NotFoundError") {
    return res.status(httpStatus.NOT_FOUND).send({ message: err.message });
  }
  if (err.name === "ForBiddenError") {
    return res.status(httpStatus.FORBIDDEN).send({ message: err.message });
  }
  if (err.name === "ValidationError") {
    return res.status(httpStatus.BAD_REQUEST).send({ message: err.message });
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: "InternalServerError",
    message: "Internal Server Error",
  });
}
