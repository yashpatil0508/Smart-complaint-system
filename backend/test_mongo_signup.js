require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

async function testSignup() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const email = "test3@example.com";
    const password = "password123";
    const role = "citizen";
    const otherData = {
      name: "Test User 3",
      mobile: "0987654321",
    };

    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists');
      process.exit(1);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      email,
      password: hashedPassword,
      role: role || 'citizen',
      ...otherData
    });

    await user.save();
    console.log("User saved successfully");
  } catch (e) {
    console.error("Error occurred:", e.message);
    console.error(e.stack);
  } finally {
    mongoose.disconnect();
  }
}

testSignup();
