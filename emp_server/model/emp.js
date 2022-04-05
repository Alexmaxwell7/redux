var mongoose = require("mongoose");

var empSchema = new mongoose.Schema(
  {  id:{
      type:String,
      required:true
  },
    emp_name: {
      type: String,
      required: true,
    },
    emp_role: {
      type: String,
      required: true,
    },
    emp_email: {
      type: String,
      required: true,
      unique: true,
    },
    emp_salary:{
        type:String,
        required:true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", empSchema);
