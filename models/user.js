const mongoose = require("mongoose");

// user Schema
const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    for: [   //people to whom i have to review
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    from: [ //reviews recived from other peoples
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", employeeSchema);
module.exports = User;
