import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductStockStats,
  restockProduct ,
  buyProduct,
  getProductsByCategory
} from '../controllers/productController.js';

const router = express.Router();

router.post('/add-product', createProduct);        // Add new product
router.get('/all', getProducts);           // Get all products
router.get('/:id', getProductById);     // Get one product
router.put('/:id', updateProduct);      // Update product
router.delete('/:id', deleteProduct);   // Delete product
router.get('/admin/stock', getProductStockStats); 
router.post('/buy/:productId', buyProduct);
router.put('/restock/:productId', restockProduct);  
router.get('/category/:cat', getProductsByCategory);

export default router;