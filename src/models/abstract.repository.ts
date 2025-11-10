import {
  DeleteResult,
  Model,
  MongooseUpdateQueryOptions,
  ProjectionType,
  QueryOptions,
  RootFilterQuery,
  UpdateQuery,
} from 'mongoose';

export class AbstractRepository<T> {
  constructor(private readonly model: Model<T>) {}

  async create(item: Partial<T>) {
    const doc = new this.model(item);
    return await doc.save();
  }

  async getAll(
    filter: RootFilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions,
  ) {
    return await this.model.find(filter, projection, options);
  }

  async getOne(
    filter: RootFilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions,
  ) {
    return await this.model.findOne(filter, projection, options);
  }

  async update(
    filter: RootFilterQuery<T>,
    update: UpdateQuery<T>,
    options?: MongooseUpdateQueryOptions,
  ) {
    return this.model.findOneAndUpdate(filter, update, {...options,new:true});
  }

  async delete(filter: RootFilterQuery<T>): Promise<DeleteResult> {
    return await this.model.deleteOne(filter);
  }

  async deleteMany(filter: RootFilterQuery<T>): Promise<DeleteResult> {
    return await this.model.deleteMany(filter);
  }
}
