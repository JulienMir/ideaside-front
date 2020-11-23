import React from 'react';
import { connect } from 'react-redux'
import {
  signIn,
  signOut,
  generateMnemonic,
} from './authSlice';
import { IoIosColorWand } from 'react-icons/io'

import styles from './Auth.module.css';

class Auth extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      mnemonic: "",
      dropdown: true
    }

    props.signIn()
  }

  toggleMnemonic = () => {
    if (!this.state.dropdown) {
      this.props.signOut()
    }
    this.setState({ dropdown: this.state.dropdown === false})
  }

  updateInput = (event) => {
    this.setState({ mnemonic: event.target.value })
  }

  handleSignIn = (event) => {
    const mnemonic = this.state.mnemonic || this.props.auth.mnemonic
    if (mnemonic) {
      this.props.signIn(mnemonic)
    }
  }

  handleGenerateMnemonic = () => {
    this.props.generateMnemonic()
  }

  render() {
    const { mnemonic, address } = this.props.auth
    const localMnemonic = this.state.mnemonic || mnemonic
    const mnemonicIsValid = address !== ""
    const dropdown = !address && this.state.dropdown

    return (
      <div className={styles.signIn}>
        <div className={styles.row}>
          <div className={styles.flex10}>
            <div className={styles.address_bar}>
              {address}
            </div>
          </div>
          <div className={styles.flex2}>
            <button
              className={styles.button}
              aria-label="Decrement value"

              onClick={this.toggleMnemonic}
            >
              {address ? (
                "Sign out"
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </div>
        { dropdown &&
        <div className={styles.dropdown}>
          <div className={styles.dropdown_textarea}>
            <textarea
              value={localMnemonic}
              placeholder={localMnemonic || "Mnemonic..."}
              onChange={this.updateInput}
              className={styles.dropdown_input}
            ></textarea>
            <div
              onClick={this.handleGenerateMnemonic}
            >
              <IoIosColorWand className={styles.wand} />
            </div>
          </div>
          <div
            className={mnemonicIsValid ? styles.button : styles.disabled_button}
            disabled={mnemonicIsValid !== true}
            onClick={this.handleSignIn}
          >
            <div className="dropdown__button__text">
              Import mnemonic
            </div>
          </div>
        </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    auth: state.auth,
    ...props
  }
}

const mapDispatchToProps = { signIn, signOut, generateMnemonic }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth)