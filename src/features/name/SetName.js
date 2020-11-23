import React from 'react'
import { connect } from 'react-redux'
import {
  setName
} from './nameSlice';
import { Card, Container, Col, Row, Button, Input, Form } from 'react-bootstrap'

class SetName extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      receiver: ""
    }
  }

  submit = () => {
    this.props.setName(this.state.receiver)
  }

  handleChange = (e) => {
    this.setState({receiver: e.target.value})
  }

  render() {
    console.log(this.props)
    return (
      <Form onSubmit={this.submit}>
        <Form.Label>Send name</Form.Label>
        <Row>
          <Col sm="10">
            <Form.Control type="text" placeholder="Enter address" onChange={this.handleChange}/>
          </Col>
          <Col sm="2">
            <Button type="submit">SEND</Button>
          </Col>
        </Row>
      </Form>
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

const mapDispatchToProps = { setName }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetName)