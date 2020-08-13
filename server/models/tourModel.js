const mongoose = require('mongoose');
const slugify = require('slugify');
// const User = require('./userModel');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'The name of the tour is required'],
      trim: true,
      unique: true,
      maxlength: [40, 'A tour name can not be longer than 40 characters'],
      minlength: [5, 'A tour name can not be less than 5 characters']
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'Tour must have a duration'],
      min: [1, 'Tour duration must be at least 1']
    },
    season: {
      type: String,
      required: [true, 'Tour must have a season'],
      enum: {
        values: ['spring', 'summer', 'fall', 'winter'],
        message: 'Season is either: spring, summer, fall or winter.'
      }
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'Tour must have a group size'],
      min: [1, 'Tour group size must be at least 1']
    },
    difficulty: {
      type: String,
      required: [true, 'Tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium or difficult'
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: val => Math.round(val * 10) / 10
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'Tour must have a price']
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (value) {
          return value < this.price; // 'this' only points to current doc on NEW document creation
        },
        message: 'Discount price {VALUE} can not be less than regular price'
      }
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'Tour must have a description']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'Tour must have a cover image']
    },
    images: [String],
    startDates: [Date],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    startLocation: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: [Number],
      address: String,
      description: String
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point']
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number
      }
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: '2dsphere' });

// 1) Virtual Property (Not Persisted In DB !)
// tourSchema.virtual('durationInWeeks').get(function () {
//   return this.duration / 7;
// });

// Virtual Populate Reviews
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id'
});

// 2) Document Middlewares
tourSchema.pre('save', function (next) {
  // 'pre' has access to currently processed document
  // Runs before .save() and .create()
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save', async function (next) {
//   const guidesPromises = this.guides.map(async id => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

// tourSchema.post('save', function (doc, next) {
//   // 'post' runs after all 'pre' middlewares have completed
//   // And has access to just finished document ( also 'this' points to the same doc)
//   console.log(doc);
//   next();
// });

// 3) Query Middlewares
// ('this' points to query)
// tourSchema.pre(/^find/, function (next) {
//   // 'pre' has access to currently processed query
//   // Runs before await query at last step
//   this.find({ secretTour: { $ne: true } });
//   this.start = Date.now();
//   next();
// });

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt'
  });
  next();
});

// tourSchema.post(/^find/, function (docs, next) {
//   // 'post' has access to all documents that are returned by query
//   // But has no access to finished query !
//   console.log(`Query took ${Date.now() - this.start} milliseconds`);
//   console.log(docs);
//   next();
// });

// 3) Aggregation Middlewares
// tourSchema.pre('aggregate', function (next) {
//   // 'this' points to aggregate object
//   // And this.pipeline() is the array that we passed to aggregate()
//   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
//   console.log(this.pipeline());
//   next();
// });

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
