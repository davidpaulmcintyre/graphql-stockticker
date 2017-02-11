import React from 'react';
import {Cell} from 'fixed-data-table';

class NumbericColorCell extends React.Component {
  render() {
    const {rowIndex, field, data, ...props} = this.props;
    const _color = 'green';
    return (
      <Cell {...props}>
        <div style={{textAlign: 'right', marginRight: '5px', color: _color}}> {data[rowIndex][field]}</div>
      </Cell>
    );
  }
}

export default NumbericColorCell;