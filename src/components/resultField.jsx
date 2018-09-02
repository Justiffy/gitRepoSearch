import React, { Component } from "react";
import {
  ListGroup,
  PaginationLink
} from "reactstrap";
import ReactPaginate from "react-paginate";

import "./resultField.css";
import UserCard from "./userCard.jsx";

class resultField extends Component {
  state = {};

  render() {
    const { userList, activePage, pageChange } = this.props;
    return (
      <div className="resultFieldWrapp">
        <div>
          <ListGroup className="ListGroup">
            {!userList.items ? (
              <p>Start searching</p>
            ) : (
              <div>
                <p>Search result:</p>
                {userList.items.map(el => (
                  <UserCard key={el.id} userInfo={el} />
                ))}
                <ReactPaginate
                  containerClassName="Pagination"
                  pageClassName="Pagination--item"
                  breakClassName="Pagination--item"
                  pageLinkClassName="Pagination--item--link"
                  activeClassName="Pagination--item--active"
                  onPageChange={(event) => pageChange(event.selected)}
                  pageCount={((userList.total_count / 5) <= 200) ? userList.total_count / 5 : 200}
                  pageRangeDisplayed={5}
                  marginPagesDisplayed={1}
                  previousLabel={<PaginationLink previous />}
                  nextLabel={<PaginationLink next />}
                  forcePage={activePage}
                />
              </div>
            )}
          </ListGroup>
        </div>
      </div>
    );
  }
}

export default resultField;
