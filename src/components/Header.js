import React from 'react';

class Header extends React.Component{

  render() {
    return (
      <div>
        <div className="ui clearing segment">
          <h2 className="ui left floated header">
            {this.props.title}
          </h2>
          <div className="ui right floated header">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
};

export default Header;