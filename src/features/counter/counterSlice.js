import { createSlice } from '@reduxjs/toolkit';

import {
  LcdClient,
  setupAuthExtension,
  setupBankExtension,
  setupDistributionExtension,
  setupGovExtension,
  setupMintExtension,
  setupSlashingExtension,
  setupStakingExtension,
  setupSupplyExtension,
} from "@cosmjs/launchpad";

import { apiUrl } from '../../constants'

const client = LcdClient.withExtensions(
  { apiUrl },
  setupAuthExtension,
  setupBankExtension,
  setupDistributionExtension,
  setupGovExtension,
  setupMintExtension,
  setupSlashingExtension,
  setupStakingExtension,
  setupSupplyExtension,
);

const example = async () => {
  //const balances = await client.bank.balances(myAddress);
  const distParameters = await client.distribution.parameters();
  const proposals = await client.gov.proposals();
  const inflation = await client.mint.inflation();
  const signingInfos = await client.slashing.signingInfos();
  const redelegations = await client.staking.redelegations();
  const supply = await client.supply.totalAll();
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = state => state.counter.value;

export default counterSlice.reducer;
