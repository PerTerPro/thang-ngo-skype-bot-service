//Require Mongoose
var mongoose = require('mongoose');

//Định nghĩa một schema
var Schema = mongoose.Schema;

var BotWorkSchemaModel = new Schema({
  // _id: Schema.Types.ObjectId,
  id: String,
  name: String,
  conversationId: String,
  message: String,
  isEnabled: Boolean,
  isSended: Boolean,
  trigger: {
    typeTrigger: Number,
    timeOfDay: String,
    endDate: String,
    startDate: String,
    dayOfWeek: [String],
    dayOfMonth: [Number],
    month: [Number]
  }
});

exports.botWorkModel = function () {
  return BotWorkSchemaModel;
}