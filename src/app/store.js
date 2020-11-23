import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import bankReducer from '../features/bank/bankSlice';
import stakingReducer from '../features/staking/stakingSlice';
import nameReducer from '../features/name/nameSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    bank: bankReducer,
    staking: stakingReducer,
    name: nameReducer
  },
});
