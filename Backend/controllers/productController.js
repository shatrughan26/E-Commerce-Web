import Product from '../models/Product.js';
import { logToFile } from '../utils/logger.js';

// Create/Add a new product
const generateProductId = (name) => {
  const trimmed = name.replace(/\s+/g, '').toLowerCase();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${trimmed}${randomNum}`;
};
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, imageUrl } = req.body;
    const productId = generateProductId(name);
    const product = new Product({productId, name, description, price, category, stock, imageUrl });
    await product.save();
    res.status(201).json({
      message: 'Product created successfully',
      product: {
        productId: product.productId,
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Error creating product', details: err.message });
  }
};

// Read all the list of product
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};

// Read one
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching product' });
  }
};

// Update
export const updateProduct = async (req, res) => {
  try {
    const {name, description, price, category, stock, imageUrl } = req.body;
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {name, description, price, category, stock, imageUrl },
      { new: true }
    );
    res.json({ message: 'Product updated', updated });
  } catch (err) {
    res.status(500).json({ error: 'Error updating product' });
  }
};

// Delete
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting product' });
  }
};



export const getProductStockStats = async (req, res) => {
  try {
    const products = await Product.find().select('name stock unitsSold');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching product stock stats' });
  }
};

export const buyProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const product = await Product.findOne({productId});

    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (product.stock < quantity) return res.status(400).json({ error: 'Insufficient stock' });

    product.stock -= quantity;
    product.unitsSold += quantity;

    await product.save();

    logToFile(`Product purchased: ${product.name} | Qty: ${quantity} | Remaining stock: ${product.stock} | Total sold: ${product.unitsSold}`);
    
    res.json({ message: 'Purchase successful', product });
  } catch (err) {
    res.status(500).json({ error: 'Purchase failed', details: err.message });
  }
};

export const restockProduct = async (req, res) => {
  try {
    const { productId} = req.params;
    const { quantity } = req.body;

    const product = await Product.findOne({productId});
    if (!product) return res.status(404).json({ error: 'Product not found' });

    product.stock += quantity;       

    await product.save();

    logToFile(`Product restocked: ${product.name} | Added: ${quantity} | New stock: ${product.stock}`);

    res.json({ message: 'Product restocked', product });
  } catch (err) {
    res.status(500).json({ error: 'Restock failed', details: err.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { cat } = req.params;

    const products = await Product.find({ category: cat });
    if (products.length === 0) {
      return res.status(404).json({ message: `No products found in ${cat} category` });
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching category', details: err.message });
  }
};




