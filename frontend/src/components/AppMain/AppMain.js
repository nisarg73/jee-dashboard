import React, { Component } from 'react'
import axios from 'axios'
import { isBrowser } from 'react-device-detect'
import { SemanticToastContainer, toast } from 'react-semantic-toasts'
import 'react-semantic-toasts/styles/react-semantic-alert.css'
import {
  Dropdown,
  Table,
  Segment,
  Button,
  Search,
  Pagination,
  Icon,
  Accordion,
  Input,
  Message,
  Form,
  Radio
} from 'semantic-ui-react'

import './AppMain.css'

import { yearDropDownOptions } from '../../constants/years'
import { roundDropDownOptions } from '../../constants/rounds'
import {
  iitDropDownOptions,
  nitDropDownOptions
} from '../../constants/institutes'
import {
  iitProgramDropDownOptions,
  nitProgramDropDownOptions
} from '../../constants/programs'
import { durationDropDownOptions } from '../../constants/durations'
import {
  iitDegreeDropDownOptions,
  nitDegreeDropDownOptions
} from '../../constants/degrees'
import { categoryDropDownOptions } from '../../constants/categories'
import { poolDropDownOptions } from '../../constants/pools'
import instructions from '../../constants/instructions'

const initialState = {
  data: [],
  year: '2021',
  round_no: '3',
  institute_type: 'IIT',
  quota: '',
  count: 0,
  search: '',
  currPage: 1,
  clickedColumn: '',
  direction: null,
  ordering: '',
  activeIndexs: [-1, 0, 1],
  institute_short: '',
  program: '',
  duration: '',
  degree: '',
  category: '',
  pool: '',
  userrank: 0,
  userdelta: 0
}

class AppMain extends Component {
  constructor (props) {
    super(props)
    this.state = initialState
  }

  componentDidMount () {
    axios
      .get('/items/', {
        params: {
          year: this.state.year,
          round_no: this.state.round_no,
          institute_type: this.state.institute_type
        }
      })
      .then(response =>
        this.setState({
          data: response.data.results,
          count: response.data.count
        })
      )
      .catch(err => {
        toast({
          type: 'error',
          title: 'Error in your browser',
          description: (
            <ul style={{ margin: '0em', padding: '0em' }}>
              <li>Either clear your browser cache or</li>
              <li>Use incognito or different browser.</li>
            </ul>
          ),
          animation: 'fade up',
          icon: 'ban',
          time: 10000
        })
      })
  }

  handleChange = (e, { name, value }) => {
    if (value === 'All') {
      value = ''
    }
    // Temporary hack.
    // Create a generic handle change to avoid code repetition in future
    if (name === 'year') {
      if (value === '2021') {
        this.setState({ round_no: '3' })
      } else {
        this.setState({ round_no: '' })
      }
    }
    var showToast = false
    if (
      name === 'year' ||
      name === 'institute_type' ||
      name === 'quota' ||
      name === 'round_no'
    ) {
      showToast = true
    }
    this.setState({ [name]: value }, () => {
      axios
        .get('/items/', {
          params: {
            year: this.state.year,
            round_no: this.state.round_no,
            institute_type: this.state.institute_type,
            quota: this.state.quota,
            search: this.state.search,
            ordering: this.state.ordering,
            institute_short: this.state.institute_short,
            program_name: this.state.program,
            program_duration: this.state.duration,
            degree_short: this.state.degree,
            category: this.state.category,
            pool: this.state.pool,
            closing_rank__gte:
              Number(this.state.userrank) + Number(this.state.userdelta)
          }
        })
        .then(response =>
          this.setState(
            {
              data: response.data.results,
              count: response.data.count,
              currPage: 1
            },
            () => {
              if (showToast) {
                var msg
                if (value === 'OS') {
                  msg = 'OS Quota'
                } else if (value === 'HS') {
                  msg = 'HS Quota'
                } else if (value === '') {
                  msg = 'HS & OS Quota'
                } else {
                  msg = value
                }
                if (name === 'round_no') {
                  msg = 'Round ' + value
                }
                toast({
                  type: 'success',
                  title: `Changed to ${msg}`,
                  description: 'Please scroll down to see the table.',
                  animation: 'fade up',
                  icon: 'check circle',
                  time: 3000
                })
              }
            }
          )
        )
        .catch(err => {
          toast({
            type: 'error',
            title: 'Error occured',
            description: 'Please try again after sometime.',
            animation: 'fade up',
            icon: 'ban',
            time: 3000
          })
        })
    })
  }

  handlePageChange = (event, data) => {
    this.setState({ currPage: data['activePage'] }, () => {
      axios
        .get('/items/', {
          params: {
            year: this.state.year,
            round_no: this.state.round_no,
            institute_type: this.state.institute_type,
            quota: this.state.quota,
            page: this.state.currPage,
            ordering: this.state.ordering,
            search: this.state.search,
            institute_short: this.state.institute_short,
            program_name: this.state.program,
            program_duration: this.state.duration,
            degree_short: this.state.degree,
            category: this.state.category,
            pool: this.state.pool,
            closing_rank__gte:
              Number(this.state.userrank) + Number(this.state.userdelta)
          }
        })
        .then(response =>
          this.setState({
            data: response.data.results,
            count: response.data.count
          })
        )
    })
  }

  handleSort = currColumn => () => {
    if (currColumn !== this.state.clickedColumn) {
      this.setState(
        {
          clickedColumn: currColumn,
          direction: 'ascending',
          ordering: currColumn,
          currPage: 1
        },
        () => {
          axios
            .get('/items/', {
              params: {
                year: this.state.year,
                round_no: this.state.round_no,
                institute_type: this.state.institute_type,
                quota: this.state.quota,
                page: this.state.currPage,
                ordering: this.state.clickedColumn,
                search: this.state.search,
                institute_short: this.state.institute_short,
                program_name: this.state.program,
                program_duration: this.state.duration,
                degree_short: this.state.degree,
                category: this.state.category,
                pool: this.state.pool,
                closing_rank__gte:
                  Number(this.state.userrank) + Number(this.state.userdelta)
              }
            })
            .then(response =>
              this.setState({
                data: response.data.results,
                count: response.data.count
              })
            )
        }
      )
      return
    }

    this.setState(
      {
        direction:
          this.state.direction === 'ascending' ? 'descending' : 'ascending',
        ordering:
          this.state.direction === 'ascending' ? '-' + currColumn : currColumn
      },
      () => {
        axios
          .get('/items/', {
            params: {
              year: this.state.year,
              round_no: this.state.round_no,
              institute_type: this.state.institute_type,
              quota: this.state.quota,
              page: this.state.currPage,
              ordering: this.state.ordering,
              search: this.state.search,
              institute_short: this.state.institute_short,
              program_name: this.state.program,
              program_duration: this.state.duration,
              degree_short: this.state.degree,
              category: this.state.category,
              pool: this.state.pool,
              closing_rank__gte:
                Number(this.state.userrank) + Number(this.state.userdelta)
            }
          })
          .then(response =>
            this.setState({
              data: response.data.results,
              count: response.data.count,
              clickedColumn: currColumn
            })
          )
      }
    )
  }

  handleAccordian = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndexs } = this.state
    const newIndex = activeIndexs

    const currentIndexPosition = activeIndexs.indexOf(index)
    if (currentIndexPosition > -1) {
      newIndex.splice(currentIndexPosition, 1)
    } else {
      newIndex.push(index)
    }
    this.setState({ activeIndexs: newIndex })
  }

  handlePersonalFilter = e => {
    this.setState(
      { [e.target.name]: e.target.valueAsNumber || e.target.value },
      () => {
        axios
          .get('/items/', {
            params: {
              year: this.state.year,
              round: this.state.round_no,
              institute_type: this.state.institute_type,
              quota: this.state.quota,
              search: this.state.search,
              institute_short: this.state.institute_short,
              program_name: this.state.program,
              program_duration: this.state.duration,
              degree_short: this.state.degree,
              category: this.state.category,
              pool: this.state.pool,
              closing_rank__gte:
                Number(this.state.userrank) + Number(this.state.userdelta),
              ordering: 'opening_rank'
            }
          })
          .then(response =>
            this.setState({
              data: response.data.results,
              count: response.data.count,
              currPage: 1
            })
          )
      }
    )
  }

  handleResetFilters = () => {
    this.setState(initialState, () => {
      axios
        .get('/items/', {
          params: {
            year: this.state.year,
            round_no: this.state.round_no,
            institute_type: this.state.institute_type
          }
        })
        .then(response =>
          this.setState({
            data: response.data.results,
            count: response.data.count
          })
        )
    })
  }

  render () {
    const {
      data,
      year,
      round_no,
      institute_type,
      quota,
      currPage,
      count,
      search,
      clickedColumn,
      direction,
      activeIndexs,
      institute_short,
      program,
      duration,
      degree,
      category,
      pool,
      userrank,
      userdelta
    } = this.state
    return (
      <div className='app-main' id='scroll-to-filter'>
        <Segment>
          <div className='primary-filters-margin'>
            <div className='year-type'>
              <div
                className={
                  isBrowser ? 'year-round-browser' : 'year-round-mobile'
                }
              >
                <div>
                  <Button
                    content='Year'
                    color='facebook'
                    className='year-button'
                  />
                  <Dropdown
                    name='year'
                    value={year}
                    placeholder='All'
                    selection
                    compact
                    options={yearDropDownOptions}
                    onChange={this.handleChange}
                  />
                </div>
                {year === '2021' && (
                  <div>
                    <Button
                      className={
                        isBrowser
                          ? 'round-button-browser'
                          : 'round-button-mobile'
                      }
                      content='Round'
                      color='facebook'
                    />
                    <Dropdown
                      name='round_no'
                      value={round_no}
                      placeholder='Round no'
                      selection
                      compact
                      options={roundDropDownOptions}
                      onChange={this.handleChange}
                    />
                  </div>
                )}
              </div>
              <div className='year-type-margin'>
                <Form>
                  <Form.Group className='form-group-margin-bottom'>
                    <Form.Field>
                      <Button content='College' color='facebook' />
                    </Form.Field>
                    <Form.Field>
                      <Radio
                        className='college-margin'
                        label='IIT'
                        name='institute_type'
                        value='IIT'
                        checked={institute_type === 'IIT'}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Radio
                        className='college-margin'
                        label='NIT'
                        name='institute_type'
                        value='NIT'
                        checked={institute_type === 'NIT'}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                  </Form.Group>
                </Form>
              </div>
              {institute_type === 'NIT' && (
                <div className='year-type-margin'>
                  <Form>
                    <Form.Group className='form-group-margin-bottom'>
                      <Form.Field>
                        <Button
                          content='State'
                          color='facebook'
                          className='state-button'
                        />
                      </Form.Field>
                      <Form.Field>
                        <Radio
                          className='college-margin'
                          label='HS'
                          name='quota'
                          value='HS'
                          checked={quota === 'HS'}
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                      <Form.Field>
                        <Radio
                          className='college-margin'
                          label='OS'
                          name='quota'
                          value='OS'
                          checked={quota === 'OS'}
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                      <Form.Field>
                        <Radio
                          className='college-margin'
                          label='Both'
                          name='quota'
                          value='All'
                          checked={quota === ''}
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                    </Form.Group>
                  </Form>
                </div>
              )}
            </div>
            <SemanticToastContainer />
          </div>

          <div className='year-note'>
            *Opening Closing ranks of this year, 2021, will be updated here
            after each round, once they are released by JoSSA. Best of Luck! :))
          </div>
        </Segment>
        <Accordion fluid styled>
          <Accordion.Title
            active={activeIndexs.includes(-1)}
            index={-1}
            onClick={this.handleAccordian}
          >
            <Icon name='dropdown' />
            Instructions
          </Accordion.Title>
          <Accordion.Content active={activeIndexs.includes(-1)}>
            <Message info list={instructions} />
          </Accordion.Content>

          <Accordion.Title
            active={activeIndexs.includes(0)}
            index={0}
            onClick={this.handleAccordian}
          >
            <Icon name='dropdown' />
            Primary Filters
          </Accordion.Title>
          <Accordion.Content active={activeIndexs.includes(0)}>
            <div className={isBrowser ? 'secondary-filters' : null}>
              <div className={isBrowser ? 'secondary-filters-col' : null}>
                <div className='secondary-filters-margin'>
                  <Button content='Institute' color='facebook' />
                  <Dropdown
                    className='dropdown-filters'
                    name='institute_short'
                    value={institute_short}
                    placeholder='All'
                    selection
                    search
                    clearable
                    options={
                      this.state.institute_type === 'IIT'
                        ? iitDropDownOptions
                        : nitDropDownOptions
                    }
                    onChange={this.handleChange}
                  />
                </div>
                <div className='secondary-filters-margin'>
                  <Button content='Program' color='facebook' />
                  <Dropdown
                    className='dropdown-filters'
                    name='program'
                    value={program}
                    placeholder='All'
                    selection
                    search
                    clearable
                    options={
                      this.state.institute_type === 'IIT'
                        ? iitProgramDropDownOptions
                        : nitProgramDropDownOptions
                    }
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className={isBrowser ? 'secondary-filters-col' : null}>
                <div className='secondary-filters-margin'>
                  <Button content='Degree' color='facebook' />
                  <Dropdown
                    className='dropdown-filters'
                    name='degree'
                    value={degree}
                    placeholder='All'
                    selection
                    search
                    clearable
                    options={
                      this.state.institute_type === 'IIT'
                        ? iitDegreeDropDownOptions
                        : nitDegreeDropDownOptions
                    }
                    onChange={this.handleChange}
                  />
                </div>
                <div className='secondary-filters-margin'>
                  <Button content='Duration' color='facebook' />
                  <Dropdown
                    className='dropdown-filters'
                    name='duration'
                    value={duration}
                    placeholder='All'
                    selection
                    search
                    clearable
                    options={durationDropDownOptions}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className={isBrowser ? 'secondary-filters-col' : null}>
                <div className='secondary-filters-margin'>
                  <Button content='Pool' color='facebook' />
                  <Dropdown
                    className='dropdown-filters'
                    name='pool'
                    value={pool}
                    placeholder='All'
                    selection
                    search
                    clearable
                    options={poolDropDownOptions}
                    onChange={this.handleChange}
                  />
                </div>
                <div className='secondary-filters-margin'>
                  <Button content='Category' color='facebook' />
                  <Dropdown
                    className='dropdown-filters'
                    name='category'
                    value={category}
                    placeholder='All'
                    selection
                    search
                    clearable
                    options={categoryDropDownOptions}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
          </Accordion.Content>

          <Accordion.Title
            active={activeIndexs.includes(1)}
            index={1}
            onClick={this.handleAccordian}
          >
            <Icon name='dropdown' />
            Personal Rank based search
          </Accordion.Title>
          <Accordion.Content active={activeIndexs.includes(1)}>
            <div className='personalized-filter'>
              <div className='personlized-filter-align'>
                <Button
                  content={
                    institute_type === 'IIT' ? 'Adv. Rank' : 'Mains Rank'
                  }
                  color='blue'
                />
                <Input
                  style={{ width: 130, height: 37 }}
                  type='number'
                  name='userrank'
                  value={userrank}
                  onChange={this.handlePersonalFilter}
                  placeholder='Enter your JEE Rank'
                />
              </div>
              <div className='personlized-filter-align'>
                <Button content='Delta' color='blue' />
                <Input
                  style={{ width: 130, height: 37 }}
                  type='number'
                  name='userdelta'
                  value={userdelta}
                  onChange={this.handlePersonalFilter}
                  placeholder='Enter prefered Delta'
                />
              </div>
            </div>
          </Accordion.Content>
        </Accordion>

        <div className='reset-margin'>
          <Button color='google plus' onClick={this.handleResetFilters}>
            Reset Filters
          </Button>
        </div>

        <div>
          <div className='global-search'>
            <Search
              name='search'
              value={search}
              placeholder='Search by any keyword'
              open={false}
              fluid
              onSearchChange={this.handleChange}
            />
          </div>
        </div>

        <div className='table-overflow table-margin' id='scroll-ref'>
          <Table celled color={'blue'} sortable unstackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign='center'>Sr.</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>Year</Table.HeaderCell>
                {year === '2021' && (
                  <Table.HeaderCell textAlign='center'>Round</Table.HeaderCell>
                )}
                <Table.HeaderCell
                  sorted={
                    clickedColumn === 'institute_short' ? direction : null
                  }
                  onClick={this.handleSort('institute_short')}
                  textAlign='center'
                >
                  Institute
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={clickedColumn === 'program_name' ? direction : null}
                  onClick={this.handleSort('program_name')}
                  textAlign='center'
                >
                  Program
                </Table.HeaderCell>
                {institute_type === 'NIT' && (
                  <Table.HeaderCell textAlign='center'>Quota</Table.HeaderCell>
                )}
                <Table.HeaderCell
                  sorted={
                    clickedColumn === 'program_duration' ? direction : null
                  }
                  onClick={this.handleSort('program_duration')}
                  textAlign='center'
                >
                  Duration
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={clickedColumn === 'degree_short' ? direction : null}
                  onClick={this.handleSort('degree_short')}
                  textAlign='center'
                >
                  Degree
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={clickedColumn === 'category' ? direction : null}
                  onClick={this.handleSort('category')}
                  textAlign='center'
                >
                  Category
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={clickedColumn === 'pool' ? direction : null}
                  onClick={this.handleSort('pool')}
                  textAlign='center'
                >
                  Pool
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={clickedColumn === 'opening_rank' ? direction : null}
                  onClick={this.handleSort('opening_rank')}
                  textAlign='center'
                >
                  Opening
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={clickedColumn === 'closing_rank' ? direction : null}
                  onClick={this.handleSort('closing_rank')}
                  textAlign='center'
                >
                  Closing
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map(element => (
                <Table.Row key={data.indexOf(element)}>
                  <Table.Cell collapsing textAlign='center'>
                    {data.indexOf(element) + 1 + 50 * (currPage - 1)}
                  </Table.Cell>
                  <Table.Cell collapsing textAlign='center'>
                    {element.year}
                  </Table.Cell>
                  {year === '2021' && (
                    <Table.Cell collapsing textAlign='center'>
                      {element.round_no}
                    </Table.Cell>
                  )}
                  <Table.Cell textAlign='center'>
                    {element.institute_short}
                  </Table.Cell>
                  <Table.Cell textAlign='center'>
                    {element.program_name}
                  </Table.Cell>
                  {institute_type === 'NIT' && (
                    <Table.Cell collapsing textAlign='center'>
                      {element.quota}
                    </Table.Cell>
                  )}
                  <Table.Cell collapsing textAlign='center'>
                    {element.program_duration}
                  </Table.Cell>
                  <Table.Cell textAlign='center'>
                    {element.degree_short}
                  </Table.Cell>
                  <Table.Cell collapsing textAlign='center'>
                    {element.category}
                  </Table.Cell>
                  <Table.Cell textAlign='center'>{element.pool}</Table.Cell>
                  <Table.Cell textAlign='center'>
                    {element.is_preparatory
                      ? element.opening_rank + ' - P'
                      : element.opening_rank}
                  </Table.Cell>
                  <Table.Cell textAlign='center'>
                    {element.is_preparatory
                      ? element.closing_rank + ' - P'
                      : element.closing_rank}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan='10'>
                  <Pagination
                    activePage={currPage}
                    totalPages={data ? Math.ceil(count / 50) : '1'}
                    onClick={() =>
                      document.getElementById('scroll-ref').scrollIntoView()
                    }
                    onPageChange={this.handlePageChange}
                    firstItem={{
                      'aria-label': 'First item',
                      content: <Icon name='angle double left' />,
                      key: '1'
                    }}
                    prevItem={{
                      'aria-label': 'Previous item',
                      content: <Icon name='angle left' />,
                      key: '4'
                    }}
                    nextItem={{
                      'aria-label': 'Next item',
                      content: <Icon name='angle right' />,
                      key: '3'
                    }}
                    lastItem={{
                      'aria-label': 'Last item',
                      content: <Icon name='angle double right' />,
                      key: '2'
                    }}
                  />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
          <Icon
            className='scroll-to-top'
            name='chevron circle up'
            size='big'
            color='grey'
            onClick={() => {
              document.getElementById('scroll-to-filter').scrollIntoView()
            }}
          />
        </div>
        <div className='github-repo'>
          *This is an open source project, if found helpful, do star{' '}
          <a
            href='https://github.com/nisarg73/jee-dashboard'
            target='_blank'
            rel='noopener noreferrer'
          >
            its github repo
          </a>{' '}
          :D
        </div>
      </div>
    )
  }
}

export default AppMain
