import { createSlice } from '@reduxjs/toolkit';
import {
	Secp256k1HdWallet,
	SigningCosmosClient,
	makeCosmoshubPath
} from '@cosmjs/launchpad'
import axios from 'axios'
import * as bip39 from 'bip39'
import {
  apiUrl,
  prefix
} from '../../constants'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    mnemonic: "",
    address: "",
    account: ""
  },
  reducers: {
    signedIn: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.account = action.payload
    },
    signOut: (state) => {
      state.address = ""
      state.mnemonic = ""
    },
    generateMnemonic: (state) => {
      state.mnemonic = bip39.generateMnemonic()
    },
    setMnemonic: (state, action) => {
      state.mnemonic = action.payload
    }
  },
});

export const { signedIn, signOut, generateMnemonic } = authSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const trySignIn = mnemonic => async dispatch => {
  const wallet = await Secp256k1HdWallet.fromMnemonic(
    mnemonic,
    makeCosmoshubPath(0),
    prefix
  )

  try {
  if (bip39.validateMnemonic(mnemonic)) {
    const [{ address }] = await wallet.getAccounts()
    const url = `${apiUrl}/auth/accounts/${address}/`
    const account = await axios.get(url)
    console.log(wallet, account)
    dispatch(signedIn(account))
  }
} catch {
  console.log(this)
}
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectAddress = state => console.log(state);
export const selectMnemonic = state => state.auth.mnemonic;

export default authSlice.reducer;
