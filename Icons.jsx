import React from 'react';

import './icons.scss';

export default class Icons extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  renderIcon() {
    const { iconType, className, cb, message } = this.props;

    switch (iconType) {
      case 'clear':
        return (<img src={require('../../../../webapp/assets/img/clear_icon.png')} onTouchTap={cb} className={className} />)
        break;
      case 'search':
        return (<img src={require('../../../../webapp/assets/img/search_icon.png')} className={className} />)
        break;
      case 'error':
        return (<img src={require('../../../../webapp/assets/img/error_icon.png')} onTouchTap={cb} alt={message} className={className} />)
        break;
      default:
        break;
    }
  }

  render() {
    return (
      this.renderIcon()
    )
  }
}

Icons.propTypes = {
  iconType: React.PropTypes.string,
  className: React.PropTypes.string,
  cb: React.PropTypes.func,
  message: React.PropTypes.string,
}
