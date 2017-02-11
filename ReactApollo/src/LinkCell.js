import React from 'react';
import {Cell} from 'fixed-data-table';
import { Link } from 'react-router'

class LinkCell extends React.Component {
  render() {
    const {rowIndex, field, data, ...props} = this.props;
    const strLink = data[rowIndex][field];
    return (
      <Cell {...props}>
        <Link to={`/${strLink}`}>
          {strLink}
        </Link>
      </Cell>
    );
  }
}

export default LinkCell;