import React from 'react';
import { connect } from 'react-redux'
import {
  getBalances,
} from './bankSlice';
import {
  Row, Col, Card
} from 'react-bootstrap'
import { AiOutlineReload } from 'react-icons/ai'

import styles from './Bank.module.css';

class Bank extends React.Component{
  constructor(props) {
    super(props)

    props.getBalances()
  }

  reload = () =>  {
    this.props.getBalances(this.props.auth.address)
  }

  render() {
    const balances = this.props.bank.balances || []
    console.log('Bank render:', this)

    return (
      <Card>
        <div className={styles.row}>
          <div style={{display: 'flex'}}>
            <h3 style={{flex: 'initial'}} className={styles.title}>Bank balances</h3>
            <button style={{flex: 1}} className={styles.button} onClick={this.reload}>
              <AiOutlineReload />
            </button>
          </div>
        </div>
        { balances.map(e => {
            return (
              <div className={styles.row} key={e}>
                <span className={styles.amount}>{e.amount}</span>
                <span className={styles.denom}> {e.denom}</span>
              </div>
            )
          })
        }
      </Card>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    bank: state.bank,
    auth: state.auth,
    ...props
  }
}

const mapDispatchToProps = { getBalances }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bank)