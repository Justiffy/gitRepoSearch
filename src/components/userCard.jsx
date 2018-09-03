import React from 'react';
import moment from 'moment';
import { ListGroupItem } from "reactstrap";

import './UserCard.css';
import Star from '../img/star.svg';

const userCard = (props) => {
  const {userInfo} = props;
  return(
    <ListGroupItem className="userCardWrapp">
      <div className="userCard--owner">
        <img src={userInfo.owner.avatar_url} alt="" className="userCard--avatar"/>
        <p className="userCard--text">{userInfo.owner.login}</p>
      </div>
      <div className="userCard--repoInfo">
        <a href={userInfo.svn_url} target="_blank">{userInfo.name}</a>
        <div className="userCard--repoInfo--desc">{userInfo.description}</div>        
        <div className="userCard--repoInfo--soc">
          <div>
            <svg  aria-label="fork" viewBox="0 0 10 16" version="1.1" width="10" height="16" role="img"><path fillRule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>
            <span className="userCard--repoInfo--fork">{userInfo.forks_count}</span>
          </div>
          <div>
            <img className="userCard--repoInfo--starIcon" src={Star} alt=""/>
            <span className="userCard--repoInfo--fork">{userInfo.stargazers_count}</span>
          </div>
        </div>
        <div className="userCard--text">Last update: {moment(userInfo.updated_at).format("MMM Do YYYY")}</div>
        <div className="userCard--text">Language: {userInfo.language}</div>
      </div>
    </ListGroupItem>
  )
}

export default userCard;