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

export const stakingSlice = createSlice({
  name: 'staking',
  initialState: {
    delegations: [],
    params: {},
    validators: []
  },
  reducers: {
    setState: (state, action) => {
      Object.assign(state, { ...action.payload })
    }
  },
})

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getInfo = address => async dispatch => {
  let params, pool, delegations

  console.log('Staking client', client)

  if (address) { 
    dispatch(getDelegations(address))
  }

  dispatch(getParams())
  dispatch(getValidators())
}

export const getDelegations = delegator => async dispatch => {
  return client.staking.delegatorDelegations(delegator)
      .then(res => {
        console.log('getInfo:', res)
        dispatch(stakingSlice.actions.setState({ delegations: res.result }))
      })
      .catch(err => console.log('Get Delegator Delegations', err))
}

export const getParams = () => async dispatch => {
  return client.staking.parameters()
      .then(res => {
        console.log('getParams:', res)
        dispatch(stakingSlice.actions.setState({ params: JSON.parse(JSON.stringify(res.result)) }))
      })
      .catch(err => console.log('Get Params', err))
}

export const getValidators = () => async dispatch => {
  return client.staking.validators()
      .then(res => {
        console.log('getValidators:', res)
        dispatch(stakingSlice.actions.setState({ validators: JSON.parse(JSON.stringify(res.result)) }))
      })
      .catch(err => console.log('Get Validators', err))
}

export default stakingSlice.reducer;
