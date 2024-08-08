const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userskills: {type: String, default: ''},
  linkedinUrl: { type: String, default: '' },  
  xUrl: { type: String, default: '' },         
  personalWebsiteUrl: { type: String, default: '' } 
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    // Check if the password is already hashed
    const isHashed = /^\$2[aby]\$[0-9]+\$/.test(this.password);

    if (!isHashed) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
  next();
});

// Method to check the password on login
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
