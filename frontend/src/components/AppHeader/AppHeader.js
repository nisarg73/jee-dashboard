import React, { Component } from 'react'
import { isBrowser } from 'react-device-detect'
import { Segment } from 'semantic-ui-react'

import './AppHeader.css'

class AppHeader extends Component {
  render () {
    return (
      <Segment attached className='app-header-segment'>
        <div className='app-header-container'>
          {isBrowser ? (
            <h1>JEE Opening Closing Ranks</h1>
          ) : (
            <h1>JEE Cutoff Ranks</h1>
          )}
        </div>
      </Segment>
    )
  }
}

export default AppHeader
