import Admin from '../models/Admin.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import Product from '../models/Product.js';

// admin signup
export const signup = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ name, email, password: hashedPassword, mobile });
    await admin.save();
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed' });
  }
};

// admin login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ error: 'Admin not found' });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id, isAdmin: true }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

// admin can create user
export const createUser = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, mobile });
    await user.save();
    res.status(201).json({ message: 'User created by admin' });
  } catch (err) {
    res.status(500).json({ error: 'User creation failed' });
  }
};

// get user details
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('name email mobile _id createdAt');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching users', details: err.message });
  }
};

// admin to delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'User deletion failed' });
  }
};

// admin forgot password
export const adminForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ error: 'Admin not found' });

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = Date.now() + 3600000; // 1 hour

    admin.resetToken = token;
    admin.resetTokenExpiry = expiry;
    await admin.save();

    res.json({
      message: 'Admin password reset link generated',
      resetLink: `http://localhost:5000/api/admin/reset/${token}`
    });
  } catch (err) {
    res.status(500).json({ error: 'Error generating reset link', details: err.message });
  }
};

// admin reset password
export const adminResetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const admin = await Admin.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!admin) return res.status(400).json({ error: 'Invalid or expired token' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    admin.resetToken = undefined;
    admin.resetTokenExpiry = undefined;

    await admin.save();

    res.json({ message: 'Admin password has been reset successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error resetting password', details: err.message });
  }
};

// Admin view: Get product stats
export const getProductStats = async (req, res) => {
  try {
    const products = await Product.find().select('productId name company price stock unitsSold');

    const formatted = products.map(p => ({
      productId: p.productId,
      name: p.name,
      company: p.company,
      price: p.price,
      stock: p.stock,
      status: p.stock === 0 ? 'Out of Stock' : 'In Stock',
      unitsSold: p.unitsSold
    }));

    res.json({ products: formatted });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching product stats', details: err.message });
  }
};
