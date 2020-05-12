import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class SignUpForm extends Component{
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            name: '',
            hasAgreed: false,
            messages : []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log('The form was submitted with the following data:');
        console.log(this.state);

        let config = {
          headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Methods": 'DELETE, POST, GET, OPTIONS'

            }
          };
          
        axios
        .post("http://localhost:8300/createUser?track_id=1",this.state,config)
        .then(
        response =>{
          this.setState({
            messages : response.data.message
          });
          console.log(response)
        }
        )
        .catch(
          error=>{
            console.log(error)
          }
        );
        
    }
    render(){
      const { messages } = this.state;
        return(
            
            <div className="FormCenter">
              <form onSubmit={this.handleSubmit} className="FormFields">
                <div className="FormField">
                  <label className="FormField__Label" htmlFor="name">Full Name</label>
                  <input type="text" id="name" className="FormField__Input" placeholder="Enter your full name" name="name"  value={this.state.name} onChange={this.handleChange}/>
                </div>

                <div className="FormField">
                  <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                  <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange}/>
                </div>

                <div className="FormField">
                  <label className="FormField__Label" htmlFor="password">Password</label>
                  <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
                </div>

                <div className="FormField">
                  <label className="FormField__CheckboxLabel">
                      <input className="FormField__Checkbox" type="checkbox" name="hasAgreed"   value={this.state.hasAgreed} onChange={this.handleChange}/> I agree all statements in <a href="" className="FormField__TermsLink">terms of service</a>
                  </label>
                </div>

                <div className="FormField">
                    <button className="FormField__Button mr-20">Sign Up</button> <Link to="/sign-in" className="FormField__Link">I'm already member</Link>
                </div>

                <div>
                     {messages}
                </div>   
              </form>
          </div>

        );
    }
}

export default SignUpForm;