import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { VouchersRepository } from './vouchers.repository';
import { INewVoucher, IVoucher, IUpdateVoucher } from './interfaces';
import { NewVoucherDto, UpdateVoucherDto } from './dtos';

@Injectable()
export class VouchersService {
  constructor(readonly vouchersRepository: VouchersRepository) {}

  async createVoucher(newVoucher: NewVoucherDto): Promise<IVoucher> {
    if (newVoucher.startTime < newVoucher.endTime) {
      return await this.vouchersRepository
        .create(newVoucher)
        .then()
        .catch((error) => {
          if (Object.keys(error.keyPattern)[0])
            throw new BadRequestException('Code of voucher is existed!');
          throw new InternalServerErrorException(error.message);
        });
    }
    throw new BadRequestException(
      'Please input startTime smaller than endTime!',
    );
  }

  async findVoucherById(voucherId: string): Promise<IVoucher> {
    return await this.vouchersRepository.findById(voucherId);
  }

  async findListVoucher(): Promise<IVoucher[]> {
    return await this.vouchersRepository.find();
  }

  async findVoucherByIdAndUpdate(
    voucherId: string,
    updateVoucher: UpdateVoucherDto,
  ): Promise<IVoucher> {
    if (updateVoucher.startTime > updateVoucher.endTime) {
      throw new BadRequestException(
        'Please input startTime smaller than endTime!',
      );
    }
    return this.vouchersRepository.findOneAndUpdateCustom(
      voucherId,
      updateVoucher,
    );
  }

  async findVoucherByIdAndDelete(voucherId: string): Promise<boolean | void> {
    return await this.vouchersRepository
      .findByIdAndDelete(voucherId)
      .then((voucher) => {
        if (voucher) return true;
        throw new NotFoundException('Voucher Id is incorrect or not existed!');
      })
      .catch((error) => {
        throw new BadRequestException(error.message);
      });
  }
}
