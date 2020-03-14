import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'; 
import { connect } from 'react-redux'; 
// the component for smart search!
class Autocomplete extends Component {

  constructor(props) {
    super(props);
    this.onClick.bind(this);
    this.handleChange.bind(this);
    this.state = {
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: '',
    };
  }
  handleChange = (e) => {
    const options = this.props.friends;
    const userInput = e.currentTarget.value;

    const filteredOptions = options.filter(
      (optionName) =>
        optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeOption: 0,
      filteredOptions,
      showOptions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = (e) => {
    e.preventDefault();
    this.setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: e.currentTarget.textContent
    });
  };

  handleKeyDown = (e) => {
    const { activeOption, filteredOptions} = this.state;
    if (e.keyCode === 13) {
      e.preventDefault();
      this.setState({
        activeOption: 0,
        showOptions: false,
        userInput: filteredOptions[activeOption]
      });
      console.log(this.state);
      var options = this.props.options;
      console.log(options);
      if(options.includes(this.state.userInput)) {
        console.log("Successful search");
        this.props.history.push({
          pathname: '/profile',
          state: {recipient: this.state.userInput}
        });
      }
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
    } else if (e.keyCode === 40) {
      if (activeOption === filteredOptions.length - 1) {
        console.log(activeOption);
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: { activeOption, filteredOptions, showOptions, userInput }
    } = this;

    let optionList;
    if (showOptions && userInput) {
      if (filteredOptions.length) {
        optionList = (
          <ul className="options">
            {filteredOptions.map((optionName, index) => {
              let className;
              if (index === activeOption) {
                className = 'option-active';
              }
              return (
                <li className={className} key={optionName} onClick={onClick}>
                  {optionName}
                </li>
              );
            })}
          </ul>
        );
      } else {
        optionList = (
          <div className="no-options">
            None
          </div>
        );
      }
    }
    return (
      <React.Fragment>
          <div className="search">
            <input
              type="text"
              placeholder="insert"
              className="search-box"
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              value={userInput}
            />
          </div>
        {optionList}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return { friends: state.friends};
}

export default connect(mapStateToProps)(withRouter(Autocomplete));
