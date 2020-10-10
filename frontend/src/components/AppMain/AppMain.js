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
  Message
} from 'semantic-ui-react'

import './AppMain.css'

import { yearDropDownOptions } from '../../constants/years'
import { instituteDropDownOptions } from '../../constants/institutes'
import { programDropDownOptions } from '../../constants/programs'
import { durationDropDownOptions } from '../../constants/durations'
import { degreeDropDownOptions } from '../../constants/degrees'
import { categoryDropDownOptions } from '../../constants/categories'
import { poolDropDownOptions } from '../../constants/pools'
import instructions from '../../constants/instructions'

const initialState = {
  data: [],
  year: '2019',
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
          year: this.state.year
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
    var showToast = false
    if (name === 'year') {
      showToast = true
    }
    this.setState({ [name]: value }, () => {
      axios
        .get('/items/', {
          params: {
            year: this.state.year,
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
          this.setState(
            {
              data: response.data.results,
              count: response.data.count,
              currPage: 1
            },
            () => {
              if (showToast) {
                toast({
                  type: 'success',
                  title: 'Year changed',
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
      var compare
      if (this.state.direction != null) {
        this.state.direction === 'ascending'
          ? (compare = this.state.clickedColumn)
          : (compare = '-' + this.state.clickedColumn)
      } else {
        compare = ''
      }
      axios
        .get('/items//', {
          params: {
            year: this.state.year,
            page: this.state.currPage,
            ordering: compare,
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
          currPage: 1
        },
        () => {
          axios
            .get('/items/', {
              params: {
                year: this.state.year,
                page: this.state.currPage,
                ordering: currColumn,
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
          this.state.direction === 'ascending' ? 'descending' : 'ascending'
      },
      () => {
        var compare
        this.state.direction === 'ascending'
          ? (compare = currColumn)
          : (compare = '-' + currColumn)
        axios
          .get('/items/', {
            params: {
              year: this.state.year,
              page: this.state.currPage,
              ordering: compare,
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
            year: this.state.year
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
          <div className={isBrowser ? 'primary-filters' : null}>
            <div className='primary-filters-margin'>
              <Button content='Year' color='facebook' />
              <Dropdown
                name='year'
                value={year}
                placeholder='All'
                selection
                compact
                options={yearDropDownOptions}
                onChange={this.handleChange}
              />
              <SemanticToastContainer />
            </div>
          </div>
          <div className='year-note'>
            *Opening Closing ranks of this year, 2020, will be updated here
            after each round, once they are released by JoSSA :)
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
                    options={instituteDropDownOptions}
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
                    options={programDropDownOptions}
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
                    options={degreeDropDownOptions}
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
              <div className='secondary-filters-margin'>
                <Input
                  type='number'
                  name='userrank'
                  value={userrank}
                  onChange={this.handlePersonalFilter}
                  label={{ content: 'Your Rank', color: 'blue' }}
                  placeholder='Enter your JEE Adv. Rank'
                />
              </div>
              <div className='secondary-filters-margin'>
                <Input
                  type='number'
                  name='userdelta'
                  value={userdelta}
                  onChange={this.handlePersonalFilter}
                  label={{ content: 'Delta', color: 'blue' }}
                  placeholder='Enter prefered Delta'
                />
              </div>
            </div>
          </Accordion.Content>
        </Accordion>

        <div className='reset-margin'>
          <Button color='google plus' onClick={this.handleResetFilters}>
            Clear Filters
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
                  <Table.Cell textAlign='center'>
                    {element.institute_short}
                  </Table.Cell>
                  <Table.Cell textAlign='center'>
                    {element.program_name}
                  </Table.Cell>
                  <Table.Cell textAlign='center'>
                    {element.program_duration}
                  </Table.Cell>
                  <Table.Cell textAlign='center'>
                    {element.degree_short}
                  </Table.Cell>
                  <Table.Cell textAlign='center'>{element.category}</Table.Cell>
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
      </div>
    )
  }
}

export default AppMain
