const mongoose = require('mongoose');
const crypto = require('crypto');

// user schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true
    },
    fname: {
      type: String,
      trim: true,
      required: true
    },
    lname: {
        type: String,
        trim: true
    },
    eid: {
        type: String,
        trim: true,
        required: true
    },
    mobile: {
        type: String,
        trim: true
    },    
    oname: {
        type: String,
        trim: true
    },    
    hashed_password: {
      type: String,
      required: true
    },
    salt: String,
    role: {
      type: String,
      default: 'Normal'
    },
    resetPasswordLink: {
      data: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

// virtual
userSchema.virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// methods
userSchema.methods = {
  //compare password
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  //encrypt password
  encryptPassword: function(password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },
  //Generate Salt
  makeSalt: function() {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  }
};

module.exports = mongoose.model('User', userSchema);