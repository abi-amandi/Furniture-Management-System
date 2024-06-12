const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Rider = require('../models/Rider');

const SALT_ROUNDS = 10

const registerUser = async (req, res) => {
  const { username, email, password, address, role } = req.body

  // Email validation function
  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  if (!username || !email || !password) {
    return res.status(400).json({ error: 'error occured in json body' });
  } else if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Please enter a valid email' });
  }else if (await User.findOne({ email })) {
    return res.status(400).json({ error: 'User already exists' }); 
  } 
  else {
    try {
      const hashed = await bcrypt.hash(password, SALT_ROUNDS)
      const user = await User.create({ username, email, "password": hashed, address, role })

      req.session.userId = user._id

      return res.status(200).json({ error: 'user created successfully ..' })
    } catch (errors) {
      console.log(`error: ${errors}`)
      return res.status(400).json({ error: 'An error occured' })
    }
  }

};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Email validation function
  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  console.log(typeof password)

  try {
    console.log(password)

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }else if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Please enter a valid email' });  
    }


    let user, rider;
    let isMatchUser, isMatchRider;

    user = await User.findOne({ email: email });
    rider = await Rider.findOne({ email: email });

    if (user) {
      isMatchUser = bcrypt.compare(password, user.password);
    } else if (rider) {
      isMatchRider = rider.nic.toString() === password;
    } else {
      return res.status(401).json({ error: 'Login failed' });
    }

    if (!(isMatchUser || isMatchRider)) {
      return res.status(401).json({ error: 'Login failed' });
    } else if (isMatchRider) {
      req.session.userId = rider._id;
      req.session.role = rider.role;
      console.log(`Login successful | User: ${rider._id}`);
      res.json({ message: 'Login successful', role: rider.role });
      console.log(rider.role)
    } else if (isMatchUser) {
      req.session.userId = user._id;
      req.session.role = user.role;
      req.session.address = user.address;
      console.log(`Login successful | User: ${user._id}`);
      res.json({ message: 'Login successful', role: user.role });
      console.log(user.role)
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `${error}` });
  }
};

const LogoutUser = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to logout' });
    }

    res.json({ message: 'Logout successful' });
  });
};


const getUserProfile = async (req, res) => {
  try {
    const userId = req.session.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateUserProfile = async (req, res) => {
  const userId = req.session.userId;
  const { username, email, password, address } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update fields
    user.username = username || user.username;
    user.email = email || user.email;
    user.address = address || user.address;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      user.password = hashedPassword;
    }

    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete user profile
const deleteUserProfile = async (req, res) => {
  const userId = req.session.userId;

  try {
    await User.findByIdAndDelete(userId);
    req.session.destroy(); // Destroy session after deleting user
    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// CRUD operations for specific user by ID

// Get user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update user by ID
const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, address } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (address) user.address = address;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      user.password = hashedPassword;
    }

    await user.save();
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete user by ID
const deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  registerUser,
  loginUser,
  LogoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,

  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById
};
