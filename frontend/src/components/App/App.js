import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import AppHeader from '../AppHeader/AppHeader'
import AppMain from '../AppMain/AppMain'
import AppFooter from '../AppFooter/AppFooter'

import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <AppHeader />
        <Scrollbars autoHide>
          <div className='App-container'>
            <AppMain />
          </div>
        </Scrollbars>
        <div className='App-footer'>
          <AppFooter />
        </div>
      </div>
    )
  }
}

export default App
