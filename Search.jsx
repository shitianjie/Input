import React from 'react';

import Input from './Input.jsx';

export default class Search extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onInputSearch = this.onInputSearch.bind(this);
  }

  onInputSearch(value) {
    const { onSearch } = this.props;
    if(onSearch)
      onSearch(value)
  }

  render() {
    const {
      placeholder,
      valueType,
      label,
      maxlength,
      isRequired,
      inputType,
      sufIconType,
      defaultValue,
    } = this.props;

    return (
      <Input
        placeholder={placeholder}
        valueType={valueType}
        preIconType="search"
        onSearch={this.onInputSearch}
        label={label}
        maxlength={maxlength}
        isRequired={isRequired}
        inputType={inputType}
        sufIconType={sufIconType}
        defaultValue={defaultValue}
      />
    )
  }
}

Search.propTypes = {
  label: React.PropTypes.string || React.PropTypes.node,
  placeholder: React.PropTypes.string,
  valueType: React.PropTypes.string,
  onSearch: React.PropTypes.func,
  maxlength: React.PropTypes.string,
  isRequired: React.PropTypes.bool,
  inputType: React.PropTypes.string,
  sufIconType: React.PropTypes.string,
  defaultValue: React.PropTypes.string,
}
