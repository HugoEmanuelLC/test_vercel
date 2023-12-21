const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = require('./ConfigUsers');

userSchema.pre("updateOne", async function (next) {
  const update = this.getUpdate() // {password: "..."}
  if (update.password) {
    const passwordHash = await bcrypt.hash(update.password, 10);
    // this.setUpdate({ $set: { 
    //     password: passwordHash, 
    //     confirmpw: undefined 
    //   } 
    // });
  }
  next()
});

// fire a function before doc saved to db
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const User = mongoose.model('users', userSchema);

module.exports = User;