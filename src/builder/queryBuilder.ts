import { FilterQuery, Query } from "mongoose";

export class QueryBuilder<T> {
  public query: Record<string, unknown>;
  public modelQuery: Query<T[], T>;
  constructor(queryModel: Query<T[], T>, query: Record<string, unknown>) {
    this.query = query;
    this.modelQuery = queryModel;
  }
  // search method
  search(searchAbleFields: string[]) {
    let searchTerm = "";
    if (this.query?.searchTerm) {
      searchTerm = this.query?.searchTerm as string;
    }
    this.modelQuery = this.modelQuery.find({
      $or: searchAbleFields.map((field: string) => {
        return {
          [field]: { $regex: searchTerm, $options: "i" },
        } as FilterQuery<T>;
      }),
    });
    return this;
  }
  // paginate
  paginate() {
    const limit: number = Number(this.query.limit || 10);
    let skip: number = 0;
    if (this.query?.page) {
      const page: number = Number(this.query?.page || 1);
      skip = Number((page - 1) * limit);
    }
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }
  // sorting
  sort() {
    let sortBy = "-releaseDate";
    if (this.query?.sortBy) {
      sortBy = this.query?.sortBy as string;
    }
    this.modelQuery = this.modelQuery.sort(sortBy);
    return this;
  }
  // filtering method
  filter() {
    const payloadObj = { ...this?.query };
    const excludeFields = ["searchTerm", "limit", "page", "sortBy"];
    excludeFields.forEach((field) => delete payloadObj[field]);
    this.modelQuery = this.modelQuery.find(payloadObj as FilterQuery<T>);
    return this;
  }
}
