import React, { Component } from 'react';
// import sections
import { AddDelegator } from './partials/AddDelegator'

import {fetchDelegators} from '../utils/DynamoDB'
import {getValidator} from '../utils/HarmonyAPI'


export class Pool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delegators: [],
      validator: {}
    };
  }
  componentDidMount() {
    fetchDelegators().then(res => this.setState({delegators: res.sort((a, b) => b.amount - a.amount)}))
    getValidator().then(res => this.setState({validator: res}))
  }

  totalStake() {
    let totalStake = 0
    this.state.delegators.forEach(delegator => {
      totalStake += delegator["amount"]
    })
    return totalStake
  }
  effectiveStake() {
    let amounts = []
    this.state.delegators.forEach(delegator => {
      if(delegator["amount"] !== 0) {
        amounts.push(delegator["amount"])
      }
    })
    const mid = Math.floor(amounts.length / 2),
      nums = [...amounts].sort((a, b) => a - b);
    return amounts.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  }
  
  render() {
    return (
      <>
        <section className="cta section center-content-mobile reveal-from-bottom is-revealed">
          <div
            className="cta-inner section-inner cta-split"
          >
            <div className="cta-slogan">
              <h4 className="m-0">
                Current Validator: 
                </h4>
                <h3 className="m-0">{this.state.validator.name}</h3>
                <a href={this.state.validator.url} target="_blank" rel="noopener noreferrer" className="button button-dark button-wide-mobile button-lg">Stake</a>
            </div>
            <div className="cta-action">
              <h6 className="m-0">Address: {this.state.validator.address}</h6>
              <h6 className="m-0">Status: {this.state.validator.status}</h6>
              <h6 className="m-0">APR: {this.state.validator.apr}</h6>
            </div>
          </div>
        </section>


        <section className="hero section reveal-from-bottom is-revealed">
          <div className="container-sm">
            <div className="hero-inner section-inner">
              <div className="center-content">
                <AddDelegator delegators={this.state.delegators} />
              </div>
              <div>
                <div className="center-content">
                  <h5 className="m-0">Harmoforce Stats:</h5>
                  <h6 className="m-0">Total Stake: {this.totalStake()}</h6>
                  <h6 className="mt-0">Effective Stake: {this.effectiveStake()}</h6>
                </div>
                <table>
                  <thead>
                    <th><h4 className="m-0">Delegator</h4></th>
                    <th><h4 className="m-0">Amount</h4></th>
                  </thead>
                  <tbody>
                    {this.state.delegators.map(({address, amount}) => (
                      <tr key={address}>
                        <td><h6 className="m-0">{address}</h6></td>
                        <td><h6 className="m-0">{amount}</h6></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p>Updates every 24 hours</p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Pool;