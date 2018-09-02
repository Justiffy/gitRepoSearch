import React from 'react';
import classNames from 'classnames';

import './sorting.css';
import sortUp from '../img/sortUp.svg';
import sortDown from '../img/sortDown.svg';

const sorting = (props) => {
  const {setSort, activSort, sortOrder, userList} = props;

  const activeSort = (sortBy) => {
    return classNames('sorting--item', {'activeSort': activSort === sortBy})
  }

  return(
    <div>
      {(userList.items) ?
        <div className="sortingWrapp">
          Sort by:
          <span onClick={() => setSort('')} className={activeSort('')}>
            Name    
          </span>
          <span onClick={() => setSort('stars')} className={activeSort('stars')}>
            Star
            {(sortOrder === 'desc') ?
              <img src={sortUp} alt="" className="sortIcon"/> :
              <img src={sortDown} alt="" className="sortIcon"/>
            } 
          </span>
          <span onClick={() => setSort('forks')} className={activeSort('forks')}>
            Fork
            {(sortOrder === 'desc') ?
              <img src={sortUp} alt="" className="sortIcon"/> :
              <img src={sortDown} alt="" className="sortIcon"/>
            } 
          </span>
          <span onClick={() => setSort('updated')} className={activeSort('updated')}>
            Last updated
            {(sortOrder === 'desc') ?
              <img src={sortUp} alt="" className="sortIcon"/> :
              <img src={sortDown} alt="" className="sortIcon"/>
            } 
          </span>
        </div> :
        null
      }
    </div>
  )
}

export default sorting;