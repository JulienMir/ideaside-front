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
import { setupNameExtension } from './nameExtension'
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
  setupStakingExtension,
  setupNameExtension
)

export const nameSlice = createSlice({
  name: 'name',
  initialState: {
    names: [],
  },
  reducers: {
    set: (state, action) => {
      console.log('Set name:', action.payload)
      state.names = action.payload
    }
  },
});

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getNames = owner => async dispatch => {
  if (!owner) { 
    return 
  }

  console.log('Get names: ', client, owner)

  client.name.owned(owner)
    .then(res => {
      console.log('getNames Result: ', JSON.stringify(res.result))
      dispatch(nameSlice.actions.set(res.result))
    })
    .catch(err => console.log('Balance catch:', err))
}

export const createName = name => async dispatch => {
  if (!name) { 
    return 
  }

  console.log('Name create:', name)
  client.name.create(name)
    .then(res => {
      console.log('Result: ', JSON.stringify(res.result))
      dispatch(nameSlice.actions.setBalances(JSON.stringify(res.result)))
    })
    .catch(err => console.log('Balance catch:', err))
}

export const setName = owner => async dispatch => {
  if (!owner) { 
    return 
  }

  console.log('Name set:', owner)
  client.name.set(owner)
    .then(res => {
      console.log('Result: ', JSON.stringify(res.result))
      dispatch(nameSlice.actions.setBalances(JSON.stringify(res.result)))
    })
    .catch(err => console.log('Balance catch:', err))
}

export default nameSlice.reducer;
