import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux'
import {
  trySignIn,
  signOut,
  selectAddress,
  generateMnemonic,
  selectMnemonic
} from './authSlice';
import { IoIosColorWand } from 'react-icons/io'
import styles from './Auth.module.css';

class Auth extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      mnemonic: "",
      dropdown: false
    }
  }

  updateInput = (event) => {
    this.setState({ mnemonic: event.target.value })
  }

  handleSignIn = (event) => {
    if (this.state.mnemonic) {
      this.props.trySignIn(this.state.mnemonic)
    }
  }

  handleGenerateMnemonic = () => {
    this.props.generateMnemonic()
    this.setState({ mnemonic: this.props.auth.mnemonic })
  }

  render() {
    const { mnemonicProps, address } = this.props.auth
    const mnemonic = this.state.mnemonic || mnemonicProps
    const mnemonicIsValid = address !== ""
    const { dropdown } = this.state

    return (
      <div>
        <div className={styles.row}>
          <input className={styles.value} value={address} disabled={true} />
          <button
            className={styles.button}
            aria-label="Decrement value"

            onClick={() => { this.setState(Object.assign(this.state, { dropdown: !this.state.dropdown })) }}
          >
            {address ? (
              "Sign out"
            ) : (
              "Sign In"
            )}
          </button>
        </div>
        <div className="row">
          <div className={styles.container_dropdown}>
            { dropdown && !address &&
              <div className={styles.dropdown}>
                <div className={styles.dropdown_textarea}>
                  <textarea
                    value={mnemonic}
                    placeholder={mnemonic || "Mnemonic..."}
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
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = { trySignIn, signOut, generateMnemonic }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth)