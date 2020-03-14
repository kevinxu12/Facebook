import React, { Component } from 'react'
import Test from './../../Middleware/Test'
import { Link } from 'react-router-dom';

class TestButton extends Component {
    handleSubmit(e) {
        e.preventDefault();
        Test.testPostCall();
    }
    // 
    render() {
        return (
            <div>
                <a href={"http://localhost:8080/friendvisualizer"}> TEST VISUALIZER LINK </a>
                <form onSubmit = {e => this.handleSubmit(e)}>
                    <button type = "submit" className = "orange btn-flat right white-text"> 
                    Test API
                    <i className="material-icons right"> done </i>
                    </button>
                </form>
            </div>
       
        )
    }
}

export default TestButton