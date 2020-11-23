import { createSlice } from '@reduxjs/toolkit';
import {
	Secp256k1HdWallet,
	SigningCosmosClient,
	makeCosmoshubPath
} from '@cosmjs/launchpad'
import * as bip39 from 'bip39'
import {
  apiUrl,
  prefix
} from '../../constants'
import {
  getBalances
} from '../bank/bankSlice'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    mnemonic: "",
    address: "",
    account: ""
  },
  reducers: {
    signingIn: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const client = action.payload
      state.wallet = action.payload.wallet
      state.address = state.wallet.address
      state.mnemonic = action.payload.mnemonic
    },
    signingOut: (state) => {
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

export const { signingIn, signingOut, generateMnemonic } = authSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const signIn = mnemonic => async dispatch => {
  mnemonic= mnemonic || localStorage.getItem(prefix + 'mnemonic')
  if (!mnemonic) {
    return
  }

  localStorage.setItem(prefix + 'mnemonic', mnemonic)

  const wallet = await Secp256k1HdWallet.fromMnemonic(
    mnemonic,
    makeCosmoshubPath(0),
    prefix
  )

  if (bip39.validateMnemonic(mnemonic)) {
    const [{ address }] = await wallet.getAccounts()
    const client = new SigningCosmosClient(apiUrl, address, wallet)
    dispatch(signingIn({
      wallet: {
        address: client.senderAddress,
        pubkey: Array.apply([], wallet.pubkey.buffer),
        privkey: Array.apply([], wallet.privkey.buffer)
      },
      mnemonic: mnemonic
    }))
    dispatch(getBalances(client.senderAddress))
  }
}

export const signOut = () => async dispatch => {
  // Forget Mnemonic
  localStorage.setItem(prefix + 'mnemonic', "")
  dispatch(signingOut())
}

export default authSlice.reducer;
