import errorMessages from './error-messages';
import {
  HttpStatus,
  HttpException,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

export default (error: any) => {
  console.error(error);

  switch (error.message) {
    case errorMessages.cacheUnavailable:
      throw new HttpException(
        errorMessages.cacheUnavailable,
        HttpStatus.BAD_GATEWAY,
      );

    case errorMessages.customerNotFound:
      throw new NotFoundException();

    case errorMessages.conflictingId:
      throw new ConflictException();

    default:
      throw new InternalServerErrorException();
  }
};
