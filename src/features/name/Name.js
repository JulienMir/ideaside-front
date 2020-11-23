import React from 'react';
import { connect } from 'react-redux'
import {
  getNames, 
  createName, 
  setName,
} from './nameSlice';
import { Card, Container, Col, Row, Button, Input, Form } from 'react-bootstrap'
import { AiOutlineReload } from 'react-icons/ai'
import SetName from './SetName'

import styles from './Name.module.css'

class Name extends React.Component{
  constructor(props) {
    super(props)

    props.getNames(props.auth.address)
  }

  reload = () => {
    console.log(this.props)
    this.props.getNames(this.props.auth.address)
  }

  render() {
    const names = this.props.name.names || []
    console.log('Name render:', this, names)

    return (
      <div className={styles.bank}>
        <div className={styles.row}>
          <div style={{display: 'flex'}}>
            <h3 style={{flex: 'initial'}} className={styles.title}>Names</h3>
            <button style={{flex: 1}} className={styles.button} onClick={this.reload}>
              <AiOutlineReload />
            </button>
          </div>
        </div>
        {names.map(e => (
          <Card key={e}>
            <Card.Header>{e.value}</Card.Header>
            <Card.Body>
              <Row>
                <Col sm="3"><b>Creator</b></Col>
                <Col sm="9">{e.creator}</Col>
              </Row>
              <Container style={{ backgroundColor: 'lightgray', border: '1px solid lightgray', borderRadius: '5px', justififyContent: 'center'}}>
                <Row>
                  <Col sm="3"><b>Price</b></Col>
                  <Col sm="9">{e.price}</Col>
                </Row>
              </Container>
              <SetName name={e}/>
            </Card.Body>
          </Card>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    bank: state.bank,
    auth: state.auth,
    name: state.name,
    ...props
  }
}

const mapDispatchToProps = { getNames, createName, setName }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Name)