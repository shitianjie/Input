import React from 'react';

import Icons from './Icons.jsx';
import './input.scss';

export default class Input extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue || '',
      focus: false
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.onInputFocus = this.onInputFocus.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
    this.onInputClick = this.onInputClick.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.timer = false;
    this.curTime = 0;
  }

  componentDidMount() {
    const { combineData, postLabel } = this.props;
    if(combineData)
      combineData({ [postLabel]: this.state.value })
  }

  shouldComponentUpdate(nextProps, nextState) {
    for(const key in nextProps) {
      if(this.props[key] !== nextProps[key]) return true;
    }
    for(const key in nextState) {
      if(this.state[key] !== nextState[key]) return true;
    }
    return false;
  }

  componentWillReceiveProps(nextProps) {
    if('newValue' in this.props) {
      this.setState({
        value: nextProps.newValue
      })
    };
  }

  onInputChange(e) {
    let value = e.target.value;
    const { valueType, onSearch, combineData, postLabel, defaultValue, onChange } = this.props;

    switch (valueType) {
      case 'phone':
        value = value.replace(/\D/g, '').substring(0, 11);
        break;
      default:
        break;
    }

    this.setState({
      value
    });

    if(onSearch) {
      if(this.timer)
        clearTimeout(this.timer);

      this.timer = setTimeout(() => onSearch(value), 2000);

      const timeStamp = new Date().getTime();
      if(((timeStamp - this.curTime) > 2000) && (value.length > 3)) {
        onSearch(value);
        this.curTime = timeStamp;
      }
    }

    if(combineData)
      combineData({ [postLabel]: value });

    if(!defaultValue && onChange)
      onChange(value)
  }

  onInputFocus() {
    this.setState({
      focus: true
    });

    const { readOnly } = this.props;
    if(readOnly)
      this.inputRef.blur(); //阻止readonly默认事件
  }

  onInputBlur() {
    //防止clearInput之前clear icon消失，导致函数不起作用
    setTimeout(() => {
      this.setState({
        focus: false
      })
    }, 200);

    const { combineData, postLabel } = this.props;
    if(combineData)
      combineData({ [postLabel]: this.state.value })
  }

  onInputClick() {
    const { onClick } = this.props;
    if(onClick)
      onClick(); //显示搜索地址页面
  }

  clearInput() {
    this.setState({
      value: ''
    });
    const { combineData, postLabel } = this.props;
    if(combineData)
      combineData({ [postLabel]: this.state.value })
  }

  renderAssociatedPhones() {
    const { phoneList } = this.props;
    const { focus } = this.state;
    const phoneNodes = !!phoneList && !!phoneList.length && phoneList.map((item, i) => {
      return (
        <li key={item} onTouchTap={() => this.setState({value: item})}>{item}</li>
      )
    })

    return (
       !!phoneList && !!phoneList.length && focus && <ul className="phone-list">{phoneNodes}</ul>
    )
  }

  render() {
    const {
      placeholder,
      label,
      maxlength,
      preIconType,
      sufIconType,
      inputType,
      readOnly,
      isError,
      errorMessage,
      isShowTip,
      handleShowTip,
      phoneList,
    } = this.props;

    const { value, focus } = this.state;

    return (
      <div className={`input-block ${preIconType}-input-block`}>
        <label for={label}>{label}</label>
        {preIconType && !!preIconType.length && <Icons iconType={preIconType} className={`${preIconType}-icon`} />}
        <div className={`input-control ${preIconType}-input-control`}>
          {
              (readOnly &&
                <input
                  placeholder={placeholder}
                  maxLength={maxlength}
                  readOnly="readonly"
                  ref={ref => this.inputRef = ref}
                  type={inputType}
                  value={value}
                  onChange={this.onInputChange}
                  onFocus={this.onInputFocus}
                  onBlur={this.onInputBlur}
                  onClick={this.onInputClick}
                  className={`${preIconType}-input`}
                />)
              ||
              <input
                placeholder={placeholder}
                maxLength={maxlength}
                type={inputType}
                value={value}
                onChange={this.onInputChange}
                onFocus={this.onInputFocus}
                onBlur={this.onInputBlur}
                className={`${preIconType}-input`}
              />
        }
        </div>
        {sufIconType && !!sufIconType.length && !!value.length && focus && <Icons iconType={sufIconType} className={`${sufIconType}-icon`} cb={this.clearInput} />}
        {isError && !focus && <Icons iconType="error" className="error-icon" cb={handleShowTip} message={errorMessage} />}
        {this.renderAssociatedPhones()}
      </div>
    )
  }
}

Input.propTypes = {
  label: React.PropTypes.string || React.PropTypes.node,
  postLabel: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  maxlength: React.PropTypes.string,
  readOnly: React.PropTypes.bool,
  inputType: React.PropTypes.string,
  preIconType: React.PropTypes.string,
  sufIconType: React.PropTypes.string,
  defaultValue: React.PropTypes.string || React.PropTypes.number,
  valueType: React.PropTypes.string,
  onSearch: React.PropTypes.func,
  combineData: React.PropTypes.func,
  onClick: React.PropTypes.func,
  isError: React.PropTypes.bool,
  errorMessage: React.PropTypes.string,
  isShowTip: React.PropTypes.bool,
  handleShowTip: React.PropTypes.func,
  phoneList: React.PropTypes.string,
  onChange: React.PropTypes.func,
}

Input.defaultProps = {
  defaultValue: ''
}
