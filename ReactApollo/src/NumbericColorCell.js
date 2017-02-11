class NumbericColorCell extends React.Component {
  render() {
    const {rowIndex, field, data, ...props} = this.props;
    return (
      <Cell {...props}>
        <div style={{textAlign: 'right'}}> {data[rowIndex][field]}</div>
      </Cell>
    );
  }
}