import {
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
    return doc.save();
  }

  async getAll(
    filter: RootFilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions,
  ) {
    return this.model.find(filter, projection, options);
  }

  async getOne(
    filter: RootFilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions,
  ) {
    return this.model.findOne(filter, projection, options);
  }

  async update(
    filter: RootFilterQuery<T>,
    update: UpdateQuery<T>,
    options?: MongooseUpdateQueryOptions,
  ) {
    return this.model.updateOne(filter, update, options);
  }

  async delete(id: string, options?: QueryOptions) {
    return this.model.findByIdAndDelete(id, options);
  }
}
