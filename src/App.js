import React, { Component } from 'react';
import { InputGroup, Input, InputGroupAddon, Button } from 'reactstrap';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import './App.css';
import { getMaxResult, searchUser } from './api/index.js';
import ResultField from './components/ResultField';
import Sorting from './components/Sorting';
import Filters from './components/Filters';
import Alert from './components/Alert.jsx';

class App extends Component {
  state = {
    searchField: '',
    userList: [],
    sortBy: '',
    activePage: 0,
    sortOrder: 'desc',
    activFilterLang: '',
    activeFilterStars: '',
    activeFilterForks: '',
    languageList: [],
    openAlert: false
  };

  componentDidMount = () => {
    const { match } = this.props;
    if(match.params.repo) {
      this.setState({
        searchField: match.params.repo
      }, () => this.startSearch())
    }
  }

  setSearchField = e => {
    const value = e.target.value.trim();
    this.setState({
      searchField: value
    });
  };

  startSearch = () => {
    this.setLanguageList();
    this.setState(
      {
        activFilterLang: '',
        activeFilterStars: '',
        activeFilterForks: ''
      },
      () => this.searchUser()
    );
  };

  setLanguageList = async () => {
    const { searchField } = this.state;
    const { data } = await getMaxResult(searchField);

    const LanguageList = [];
    data.items.forEach(el => {
      const language = el.language;
      if (LanguageList.includes(language)) {
        return;
      }
      LanguageList.push(language);
    });
    this.setState({
      languageList: LanguageList
    });
  };

  searchUser = async (page = 1, sort = '') => {
    const { searchField: user, sortOrder, activFilterLang, activeFilterStars, activeFilterForks } = this.state;
    const result = await searchUser(user, activFilterLang, activeFilterStars, activeFilterForks, page, sort, sortOrder);

    this.setState({
      userList: result.data
    });
  };

  getAlert = () => {
    const { openAlert } = this.state;

    if (openAlert) {
      return;
    }

    this.setState({
      openAlert: true
    });
    setTimeout(() => {
      this.setState({
        openAlert: false
      });
    }, 4000);
  };

  setSortParam = name => {
    this.setState({
      sortBy: name,
      activePage: 0
    });
    const order = name === this.state.sortBy && this.state.sortOrder === 'desc' ? 'asc' : 'desc';
    this.setState(
      {
        sortOrder: order
      },
      () => this.searchUser(1, name)
    );
  };

  pageChange = page => {
    const { sortBy } = this.state;
    this.setState({
      activePage: page
    });
    this.searchUser(page + 1, sortBy);
  };

  setFilterLanguage = event => {
    const value = event.target.value;
    this.setState(
      {
        activFilterLang: value
      },
      () => this.searchUser()
    );
  };

  debounced = _.debounce((key, value) => {
    this.setState(
      {
        [key]: value
      },
      () => this.searchUser()
    );
  }, 1000);

  setFilterStars = event => {
    const value = event.target.value;
    this.debounced('activeFilterStars', value);
  };

  setFilterForks = event => {
    const value = event.target.value;
    this.debounced('activeFilterForks', value);
  };

  render() {
    const { openAlert, searchField, userList, activePage, sortBy, sortOrder, activFilterLang } = this.state;
    return (
      <div className="App">
        <div className="kottansWrapp">
          <div className="kottan--searchField">
            <InputGroup>
              <Input placeholder="Repositories name" value={searchField} onChange={this.setSearchField} />
              <InputGroupAddon addonType="append">
                <Link to={`/search/${searchField}`}>
                  <Button color="srcondary" onClick={this.startSearch}>
                    Search
                  </Button>
                </Link>
              </InputGroupAddon>
            </InputGroup>
          </div>
          {openAlert ? <Alert /> : null}
          <div className="kottan--resultFieldWrapp">
            <Sorting setSort={this.setSortParam} activSort={sortBy} sortOrder={sortOrder} userList={userList} />
            <div className="result_filterWrapp">
              <ResultField
                activePage={activePage}
                pageChange={this.pageChange}
                userList={userList}
              />
              <Filters
                userList={userList}
                languageList={this.state.languageList}
                setFilterLanguage={this.setFilterLanguage}
                activFilterLang={activFilterLang}
                setFilterStars={this.setFilterStars}
                setFilterForks={this.setFilterForks}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
