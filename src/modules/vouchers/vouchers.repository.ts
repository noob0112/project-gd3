import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../database';
import { VoucherDocument } from './schema';

@Injectable()
export class VouchersRepository extends EntityRepository<VoucherDocument> {
  constructor(
    @InjectModel('Voucher')
    private readonly voucherModel: Model<VoucherDocument>,
  ) {
    super(voucherModel);
  }

  findOneAndUpdateCustom(voucherId, updateVoucher) {
    return this.voucherModel
      .findByIdAndUpdate(
        voucherId,
        {
          $set: updateVoucher,
        },
        {
          new: true,
        },
      )
      .then((voucher) => {
        if (!voucher) {
          throw new NotFoundException(
            'Voucher Id is incorrect or not existed!',
          );
        }

        return voucher;
      });
  }
}
