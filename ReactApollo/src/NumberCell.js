import React from 'react';
import {Cell} from 'fixed-data-table';

class NumericCell extends React.Component {
  render() {
    const {rowIndex, field, data, ...props} = this.props;
    const _value = data[rowIndex][field].toFixed(2);
    return (
      <Cell {...props}>
        <div style={{textAlign: 'right', marginRight: '5px', }}> {_value}</div>
      </Cell>
    );
  }
}

export default NumericCell;