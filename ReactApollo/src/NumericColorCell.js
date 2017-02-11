import React from 'react';
import {Cell} from 'fixed-data-table';

class NumericColorCell extends React.Component {
  render() {
    const {rowIndex, field, data, ...props} = this.props;
    let _color = 'green';
    let _value = data[rowIndex][field];
    let strValue;
    if (_value < 0) {
      _color = 'red';
      strValue = '-' + _value;
    } else {
      strValue = '+' + _value;
    }
    return (
      <Cell {...props}>
        <div style={{textAlign: 'right', marginRight: '10px', color: _color}}> {strValue}</div>
      </Cell>
    );
  }
}

export default NumericColorCell;