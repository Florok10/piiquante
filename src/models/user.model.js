const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (v) => /^^[\w\-\.]+@[\w-]+\.+[\w-]{2,4}$/.test(v),
    },
    message: (props) => `${props.value} is not a valid email format`,
    required: true,
  },
  password: {
    type: String,
    validate: {
      validator: (v) => v.length > 50,
    },
    message: () => 'The password is not hashed ?',
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);

// class Schema extends mongoose.Schema {
// 	constructor(){

// 	}
// 	validateEmail
// }
