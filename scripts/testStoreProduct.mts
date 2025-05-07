import dotenv from 'dotenv';
dotenv.config();
import { storeInitialSetup } from '../services/storeInitialSetup';

console.log('⏳ Running testStoreProduct...');

(async () => {
  try {
    await storeInitialSetup({
      productName: 'Test Green Loan',
      targetCustomer: 'SME',
      intendedUse: 'Solar panels for warehouse',
      countryCode: 'US',
      currentState: 'InitialSetup'
    });
    console.log('✅ Data stored successfully');
  } catch (err) {
    console.error('❌ Failed to store data:', err instanceof Error ? err.message : err);
  }
})();