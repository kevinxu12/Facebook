import React, { Component } from 'react'
import './Search.css'
import Autocomplete from './AutoComplete';
import user_middleware from '../../Middleware/User';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: []
        }
    }
    // getData for friends
    async componentDidMount() {
        var obj = {username: this.props.username}
        var options = await user_middleware.getAllFriends(obj);
        this.setState({options: options});
        console.log(options);
        this.props.setFriends(options);
    }
    renderAutoComplete () {
        return <Autocomplete options = {this.state.options}/>
    }
    render() {
        return (
            <div class="row" id="topbarsearch">
                <div class="input-field col s2">
                    <i class="white-text material-icons prefix" style={{marginTop: "-6px"}}>search</i>
                </div>
                <div class="input-field col s10">
                    <form onSubmit = {this.onSubmit}>
                        {this.renderAutoComplete()}
                    </form>
                </div>  
            
            </div>
        );
    }
}
export default connect(null, actions) (Search);