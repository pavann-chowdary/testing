// api/models/user.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, index: true },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;