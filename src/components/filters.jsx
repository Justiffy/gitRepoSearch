import React from "react";

import "./Filters.css";

const filters = props => {
  const {
    languageList,
    setFilterLanguage,
    activFilterLang,
    setFilterStars,
    setFilterForks,
    userList
  } = props;

  const languageListItems = languageList.map((el, index) => {
    if (el === null) {
      return null
    } else {
      return (
        <div key={index}>
          <input
            type="radio"
            name="language"
            value={el}
            onChange={setFilterLanguage}
            checked={activFilterLang === el}
          />
          <span className="filterLanguage--item">{el}</span>
        </div>
      );
    }
  })

  return (
    <div>
      {userList.items ? (
        <div className="FiltersWrapp">
          <div className="filterLanguage">
            Language:
            {languageListItems}
          </div>
          <div className="filterStars">
            Stars:
            <input
              type="text"
              placeholder="Stars more than"
              onChange={setFilterStars}
            />
          </div>
          <div className="filterForks">
            Forks:
            <input
              type="text"
              placeholder="Forks more than"
              onChange={setFilterForks}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default filters;
