import React, { Component } from "react";
import { InputGroup, Input, InputGroupAddon, Button } from "reactstrap";
import axios from 'axios';

import "./App.css";
import ResultField from './components/resultField.jsx';
import Sorting from './components/sorting.jsx';
import Filters from './components/filters.jsx';
import Alert from './components/alert.jsx';


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
  }

  debounce = (f, ms) => {
    let timer = null;
    
      return function (...args) {
        const onComplete = () => {
          f.apply(this, args);
          timer = null;
        }
    
        if (timer) {
          clearTimeout(timer);
        }
    
        timer = setTimeout(onComplete, ms);
      };
  } 

  deb = this.debounce((key, value) => {
    this.setState({
      [key]: value
    }, () => this.searchUser())
  }, 1000)

  setSearchField = (e) => {
    const value = e.target.value.trim();
    this.setState({
      searchField: value
    })
  }

  startSearch = () => {
    this.setLanguageList();
    this.setState({
      activFilterLang: '',
      activeFilterStars: '',
      activeFilterForks: '',
    }, () => this.searchUser())
  }

  setLanguageList = () => {
    const {searchField: user} = this.state;
    axios.get(`https://api.github.com/search/repositories?q=${user}&per_page=100`)
      .then( response => {
        const {items: searchList} = response.data;
        const LanguageList = [];

        searchList.forEach( el => {
          const language = el.language;
          if (LanguageList.includes(language)) {
            return
          }
          LanguageList.push(language)
        })

        this.setState({
          languageList: LanguageList
        })
      })
      .catch(error => 
        console.log(error)
      );
  }

  searchUser = (page = 1, sort = '') => {
    const {searchField: user, sortOrder, activFilterLang, activeFilterStars, activeFilterForks} = this.state;
    axios.get(`https://api.github.com/search/repositories?q=${user}+${activFilterLang?'language:'+activFilterLang+'+':''}${activeFilterStars?'stars:>'+activeFilterStars+'+':''}${activeFilterForks?'forks:>'+activeFilterForks+'+':''}&per_page=5&page=${page}&sort=${sort}&order=${sortOrder}`)
      .then( response => {
        this.setState({
          userList: response.data
        })
      })
      .catch(error =>
        this.getAlert()
      )
  }

  getAlert = () => {
    const { openAlert } = this.state

    if (openAlert) {
      return
    }

    this.setState({
      openAlert: true,
    })
    setTimeout(() => {
      this.setState({
        openAlert: false
      })
    }, 4000)
  }

  setSortParam = (name) => {
    this.setState({
      sortBy: name,
      activePage: 0,
    })
    const order = (name === this.state.sortBy && this.state.sortOrder === 'desc') ? 'asc' : 'desc'
    this.setState({
      sortOrder: order
    }, () => this.searchUser(1, name))
  }

  pageChange = (page) => {
    const {sortBy} = this.state;
    this.setState({
      activePage: page
    })
    this.searchUser(page+1, sortBy);
  }

  setFilterLanguage = (event) => {
    const value = event.target.value;
    this.setState({
      activFilterLang: value
    }, () => this.searchUser())
  }

  setFilterStars = (event) => {
    const value = event.target.value;
    this.deb('activeFilterStars', value);
  }
  setFilterForks = (event) => {
    const value = event.target.value;
    this.deb('activeFilterForks', value);
  }


  render() {
    const {openAlert, searchField, userList, activePage, sortBy, sortOrder, activFilterLang} = this.state;
    return (
      <div className="App">
        <div className="kottansWrapp">
          <div className="kottan--searchField">
            <InputGroup>
              <Input placeholder="Repositories name" value={searchField} onChange={this.setSearchField}/>
              <InputGroupAddon addonType="append">
                <Button color="srcondary" onClick={this.startSearch}>Search</Button>
              </InputGroupAddon>
            </InputGroup>            
          </div>
          {openAlert ? <Alert /> : null}
          <div className="kottan--resultFieldWrapp">
            <Sorting setSort={this.setSortParam} activSort={sortBy} sortOrder={sortOrder} userList={userList}/>
            <div className="result_filterWrapp">
              <ResultField activePage={activePage} pageChange={this.pageChange} userList={userList} />
              <Filters
                userList={userList}
                languageList={this.state.languageList} 
                setFilterLanguage={this.setFilterLanguage} 
                activFilterLang={activFilterLang}
                setFilterStars={this.setFilterStars}
                setFilterForks={this.setFilterForks} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
