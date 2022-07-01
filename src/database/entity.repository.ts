import {
  Document,
  FilterQuery,
  Model,
  UpdateQuery,
  QueryOptions,
} from 'mongoose';
import { objectId } from 'src/common/types';

export abstract class EntityRepository<T> {
  private _entityModel: Model<T>;

  constructor(protected readonly entityModel: Model<T>) {
    this._entityModel = entityModel;
  }

  findById(
    id: objectId | string,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    return this.entityModel
      .findById(id, {
        ...projection,
      })
      .exec();
  }

  findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    return this.entityModel
      .findOne(entityFilterQuery, {
        ...projection,
      })
      .exec();
  }

  find(
    entityFilterQuery?: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T[] | null> {
    return this.entityModel
      .find(entityFilterQuery, {
        ...projection,
      })
      .exec();
  }

  async create(createEntityData: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }

  findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntitydata: UpdateQuery<unknown>,
  ): Promise<T | null> {
    return this.entityModel
      .findOneAndUpdate(entityFilterQuery, updateEntitydata, { new: true })
      .exec();
  }

  async findByIdAndUpdate(
    id: objectId | string,
    updateEntitydata: UpdateQuery<unknown>,
  ): Promise<T | null> {
    return this.entityModel.findByIdAndUpdate(id, updateEntitydata, {
      new: true,
    });
  }

  async findOneAndDelete(
    entityFilterQuery: FilterQuery<T>,
    entityOption?: QueryOptions<T>,
  ): Promise<T | null> {
    return this.entityModel
      .findOneAndDelete(entityFilterQuery, entityOption)
      .exec();
  }

  async findByIdAndDelete(
    id: objectId | string,
    entityOption?: QueryOptions<T>,
  ): Promise<T | null> {
    return this.entityModel.findByIdAndDelete(id, entityOption).exec();
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel
      .deleteMany(entityFilterQuery)
      .exec();
    return deleteResult.deletedCount >= 1;
  }
}
