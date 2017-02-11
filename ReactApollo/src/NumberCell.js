import React from 'react';
import {Cell} from 'fixed-data-table';

class NumericCell extends React.Component {
  render() {
    const {rowIndex, field, data, ...props} = this.props;
    return (
      <Cell {...props}>
        <div style={{textAlign: 'right', marginRight: '5px', }}> {data[rowIndex][field]}</div>
      </Cell>
    );
  }
}

export default NumericCell;