import {NextFunction, Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {StatusCodes} from 'http-status-codes';
import {IExceptionFilter} from './exception-filter.interface.js';
import {Component} from '../../types/component.types.js';
import {ILogger} from '../logger/logger.interface.js';
import HttpError from './http-error.js';
import {createErrorObject} from '../../utils/common.js';
import ValidationError from './validation-error.js';
import {ServiceError} from '../../types/service-error.enum.js';

@injectable()
export default class ExceptionFilter implements IExceptionFilter {
  constructor(
    @inject(Component.ILogger) private logger: ILogger
  ) {
    this.logger.info('Register ExceptionFilter');
  }

  catch(error: Error | HttpError, req: Request, res: Response, next: NextFunction): void {
    if (error instanceof HttpError) {
      return this.handleHttpError(error, req, res, next);
    } else if (error instanceof ValidationError) {
      return this.handleValidationError(error, req, res, next);
    }

    this.handleOtherError(error, req, res, next);
  }

  private handleHttpError(error: HttpError, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(`[${error.detail}]: ${error.httpStatusCode} — ${error.message}`);
    res.status(error.httpStatusCode).json(createErrorObject(ServiceError.CommonError, error.message));
  }

  private handleOtherError(error: Error, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(createErrorObject(ServiceError.ServiceError, error.message));
  }

  private handleValidationError(error: ValidationError, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(`[Validation Error]: ${error.message}`);
    error.details.forEach(
      (errorField) => this.logger.error(`[${errorField.property}] — ${errorField.messages}`)
    );

    res.status(StatusCodes.BAD_REQUEST)
      .json(createErrorObject(ServiceError.ValidationError, error.message, error.details));
  }
}
