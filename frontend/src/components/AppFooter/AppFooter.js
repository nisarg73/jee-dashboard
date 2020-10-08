import React, { Component } from 'react'
import { isBrowser } from 'react-device-detect'
import { Segment, Icon } from 'semantic-ui-react'

import './AppFooter.css'

class AppFooter extends Component {
  render () {
    const date = new Date()
    const year = date.getFullYear()
    return (
      <Segment attached className='app-footer-segment'>
        <div className='app-footer-container'>
          <span>
            <a
              href='https://internet.channeli.in/maintainer_site/'
              target='_blank'
              rel='noopener noreferrer'
            >
              {isBrowser ? 'Information Management Group' : 'IMG'}
            </a>
            {', '}
            <a
              href='https://iitr.ac.in/'
              target='_blank'
              rel='noopener noreferrer'
            >
              {isBrowser ? 'IIT Roorkee' : 'IITR'}
            </a>
            {'  '}
            <Icon fitted name='copyright outline' /> {year}
          </span>
          <span>
            Made with <Icon fitted name='heart' color='red' /> by{' '}
            <a
              href='https://internet.channeli.in/maintainer_site/team/nisarg73/'
              target='_blank'
              rel='noopener noreferrer'
            >
              nisarg73
            </a>
          </span>
        </div>
      </Segment>
    )
  }
}

export default AppFooter
