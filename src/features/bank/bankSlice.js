import { createSlice } from '@reduxjs/toolkit';
import {
	Secp256k1HdWallet,
	SigningCosmosClient,
	makeCosmoshubPath,
  LcdClient,
  setupAuthExtension,
  setupBankExtension,
  setupStakingExtension
} from '@cosmjs/launchpad'
import axios from 'axios'
import * as bip39 from 'bip39'
import {
  apiUrl,
  prefix
} from '../../constants'

const client = LcdClient.withExtensions(
  { apiUrl },
  setupAuthExtension,
  setupBankExtension,
  setupStakingExtension
)

export const bankSlice = createSlice({
  name: 'bank',
  initialState: {
    balances: [],
  },
  reducers: {
    setBalances: (state, action) => {
      console.log('Set balances:', action.payload)
      const balances = JSON.parse(action.payload)
      let res = []
      if (balances.length > 0) {
        for(let b of balances) {
          // TODO: Check if real coin
          if (true) {
            res.push(b)
          }
        }
      }

      state.balances = res
    }
  },
});

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getBalances = address => async dispatch => {
  if (!address) { 
    return 
  }

  client.bank.balances(address)
    .then(res => {
      console.log('getBalances Result: ', JSON.stringify(res.result))
      dispatch(bankSlice.actions.setBalances(JSON.stringify(res.result)))
    })
    .catch(err => console.log('Balance catch:', err))
}

export default bankSlice.reducer;
