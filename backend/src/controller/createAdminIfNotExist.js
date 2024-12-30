const bcrypt = require("bcryptjs");
const User = require("../model/User");
const createAdminIfNotExist = async function createAdminIfNotExist() {
    try {
      const adminExists = await User.findOne({ role: 'admin' });
  
      if (adminExists) {
        console.log('Admin already exists, skipping creation.');
        return;
      }

      const hashedPassword = await bcrypt.hash("adminpassword", 10);
  
      const admin = new User({
        firstname: "Rwittik",
        lastname: "Sarker",
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
      });
  
      await admin.save();
      console.log('Admin user created successfully!');
    } catch (error) {
      console.error('Error creating admin:', error);
    }
  }
  
module.exports = createAdminIfNotExist;