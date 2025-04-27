import dotenv from 'dotenv';
dotenv.config();
import { storeProduct } from '../services/storeProduct.js';

console.log('⏳ Running testStoreProduct...');

(async () => {
  try {
    await storeProduct('Test Green Loan', 'SME', 'Solar panels for warehouse', 'US');
    console.log('✅ Data stored successfully');
  } catch (err) {
    console.error('❌ Failed to store data:', err instanceof Error ? err.message : err);
  }
})();