import React from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

class Form extends React.Component {
    state = {
        newUser: {
            id: Date.now(),
            username: "",
            password: ""
        }
    }

    handleChanges = e => {
        this.setState({ 
            newUser: { ...this.state.newUser,
                [e.target.name]: e.target.value
            } 
        })
    }

    login = e => {
        e.preventDefault();

        axiosWithAuth()
        .post("http://localhost:5000/api/login", this.state.newUser)
        .then(response => {
            // console.log("TOKEN: ", response.data.payload);
            // response.data.payload is our token

            window.localStorage.setItem("token", JSON.stringify(response.data.payload));
            this.props.history.push("/protected")
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <div>
                <h1>Welcome to the Login page!</h1>
                <form onSubmit={this.login}>
                    <label>
                        <input 
                            type="text"
                            name="username"
                            placeholder="Type in your username..."
                            value={this.state.newUser.username}
                            onChange={this.handleChanges}
                        />
                    </label><br/>
                    <label>
                        <input 
                            type="password"
                            name="password"
                            placeholder="Type in your password..."
                            value={this.state.newUser.password}
                            onChange={this.handleChanges}
                        />
                    </label><br/>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
} 

export default Form;