const mongoose = require("mongoose");
const mongo = 'mongodb+srv://avinash2808:avinash2808@cluster0.viskioy.mongodb.net/driveDB?retryWrites=true&w=majority'
mongoose.connect(mongo, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});