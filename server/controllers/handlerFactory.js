const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) return next(new AppError('No document found with that ID', 404));

    res.status(204).json({
      status: 'success',
      data: null
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const updatedDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    const modelName = Model.collection.name.slice(0, -1);

    if (!updatedDoc)
      return next(new AppError(`No ${modelName} found with that ID`, 404));

    res.status(200).json({
      status: 'success',
      data: {
        [modelName]: updatedDoc
      }
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;

    const modelName = Model.collection.name.slice(0, -1);

    if (!doc)
      return next(new AppError(`No ${modelName} found with that ID`, 404));

    res.status(200).json({
      status: 'success',
      data: {
        [modelName]: doc
      }
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);

    const modelName = Model.collection.name.slice(0, -1);
    // newDoc.__v = undefined;
    // newDoc.createdAt = undefined;
    res.status(201).json({
      status: 'success',
      data: {
        [modelName]: newDoc
      }
    });
  });

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    // To allow nested Get reviews on Tour
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const apiFeatures = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // const docs = await apiFeatures.query.explain();
    const docs = await apiFeatures.query;
    const totalDocs = await Model.countDocuments();

    res.status(200).json({
      status: 'success',
      results: docs.length,
      totalDocs,
      data: {
        [Model.collection.name]: docs
      }
    });
  });
