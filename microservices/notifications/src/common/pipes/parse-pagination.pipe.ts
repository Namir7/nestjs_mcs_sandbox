import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { PaginationDto } from '../dto/pagination.dto';

const DEFAULT_PAGINATION: PaginationDto = {
  skip: 0,
  take: 50,
};

const TAKE_PARAM_MAX = 1000;

@Injectable()
export class ParsePaginationPipe implements PipeTransform {
  transform(value: PaginationDto) {
    if (!value) {
      return DEFAULT_PAGINATION;
    }

    if (value.take > TAKE_PARAM_MAX) {
      throw new BadRequestException(
        `'take' params max value exceeded: ${TAKE_PARAM_MAX}`,
      );
    }

    return value;
  }
}
