export default class ApiFeatures {
  constructor(mongooseQuery, serachQuery) {
    (this.mongooseQuery = mongooseQuery), (this.serachQuery = serachQuery);
  }
  pagination() {
    if (this.serachQuery.page <= 0) {
      this.serachQuery.page = 1;
    }
    this.pageNumber = this.serachQuery.page * 1 || 1;
    let pageLimit = 2;
    let skip = (this.pageNumber - 1) * pageLimit;
    this.mongooseQuery.skip(skip).limit(pageLimit);
    return this;
  }
  filter() {
    let filterObj = { ...this.serachQuery };
    let excludedFields = ["page", "sort", "fields", "keyword"];
    excludedFields.map((x) => {
      delete filterObj[x];
    });
    filterObj = JSON.stringify(filterObj);
    filterObj = filterObj.replace(/(gt|gte|lt|lte)/g, (x) => "$" + x);
    filterObj = JSON.parse(filterObj);
    console.log(filterObj);
    this.mongooseQuery.find(filterObj);
    return this;
  }
  sort() {
    if (this.serachQuery.sort) {
      let sort = this.serachQuery.sort.split(",").join(" ");
      console.log(sort);
      this.mongooseQuery.sort(sort);
    }
    return this;
  }
  fields() {
    if (this.serachQuery.fields) {
      let fields = this.serachQuery.fields.split(",").join(" ");
      console.log(fields);
      this.mongooseQuery.select(fields);
    }
    return this;
  }
  search() {
    if (this.serachQuery.keyword) {
        this.mongooseQuery.find({
        $or: [
          { title: { $regex: this.serachQuery.keyword } },
          { description: { $regex: this.serachQuery.keyword } },
        ],
      });
    }
    return this;
  }
}
