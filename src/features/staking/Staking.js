import React from 'react';
import { connect } from 'react-redux'
import {
  getInfo,
} from './stakingSlice';

import {
  Row, Col, Card
} from 'react-bootstrap'
import { AiOutlineReload } from 'react-icons/ai'

import styles from './Staking.module.css';

class Staking extends React.Component{
  constructor(props) {
    super(props)

    props.getInfo()
  }

  getInfo = () =>  {
    this.props.getInfo(this.props.auth.address)
  }

  render() {
    console.log('Staking render:', this)
    const delegations = this.props.staking.delegations.filter(e => e.delegator_address === this.props.auth.address)
    const validators = this.props.staking.validators

    return (
      <Card className={styles.staking}>
        <div className={styles.row}>
          <div style={{display: 'flex'}}>
            <h3 style={{flex: 'initial'}} className={styles.title}>Staking balances</h3>
            <button style={{flex: 1}} className={styles.button} onClick={this.getInfo}>
              <AiOutlineReload />
            </button>
          </div>
        </div>
        { delegations.map((e, i) => (
        <div className={styles.row} key={e}>
          <span style={{flex: 3}}>{i === 0 ? 'Delegated' : ''}</span>
          <span style={{flex: 2}}>{e.balance.amount}</span>
          <span style={{flex: 1}}>{e.balance.denom}</span>
        </div>
        ))}
        <Row>
          <Col sm="6">Moniker</Col>
          <Col sm="6">Commission</Col>
        </Row>
        { validators.map((e) => (
          <Row key={e}>
            <Col sm="6">{e.description.moniker}</Col>
            <Col sm="6">{e.commission.commission_rates.rate}</Col>
          </Row>
        ))}
      </Card>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    staking: state.staking,
    auth: state.auth,
    ...props
  }
}

const mapDispatchToProps = { getInfo }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Staking)