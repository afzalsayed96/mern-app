/* eslint-env jest */

import { shallow } from 'enzyme'
import React from 'react'
import App from '../pages/index.js'

describe('With Enzyme', () => {
  it('App renders landing image', () => {
    const app = shallow(<App />)

    expect(app.find('img#landingImg'))
  })
})