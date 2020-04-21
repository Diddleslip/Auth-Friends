import React from 'react'
import { axiosWithAuth } from "../utils/axiosWithAuth";

class FriendsList extends React.Component {
    state = {
        friends: [],
        newFriend: {
            id: Date.now(),
            name: '',
            age: "",
            email: '',
        }
    }

    componentDidMount() {
        this.getFriendsData();
    }

    getFriendsData = e => {
        // request data with the token
        // set the data to state

        axiosWithAuth()
        .get("/api/friends")
        .then(response => {
            // console.log(response.data);
            this.setState({
                friends: [ ...this.state.friends, ...response.data ]
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    handleChanges = e => {
        e.preventDefault();

        this.setState({
            newFriend: {
                ...this.state.newFriend, 
                [e.target.name]: e.target.value
            }
        })
    }

    onSubmit = e => {
        // e.preventDefault();

        axiosWithAuth()
        .post("/api/friends", this.state.newFriend)
        .then(response => console.log("THIS IS POST RESPONSE", response))
        .catch(error => console.log("THIS IS POST error", error))
    }

    render() {
        return(
            <div>
                <h1 className={"friendsTitle"}>Welcome to your Friends List:</h1>
                {console.log(this.state.friends)}
                {this.state.friends.map(X => {

                    return (
                        <div className={"divCard"} key={X.id}>
                            <h2>{X.name}</h2>
                            <h3>{X.age}</h3>
                            <h3>{X.email}</h3>
                        </div>
                    )
                })} {/* End of Mapping */}<br/>

                <h2>Add a Friend to the List!</h2>

                <form onSubmit={this.onSubmit}>
                    <label>
                        <input 
                            type="text"
                            name="name"
                            placeholder="Type in a name..."
                            value={this.state.newFriend.name}
                            onChange={this.handleChanges}
                        />
                    </label><br/>
                    <label>
                        <input 
                            type="text"
                            name="age"
                            placeholder="Type in an age..."
                            value={this.state.newFriend.age}
                            onChange={this.handleChanges}
                        />
                    </label><br/>
                    <label>
                        <input 
                            type="text"
                            name="email"
                            placeholder="Type in an email..."
                            value={this.state.newFriend.email}
                            onChange={this.handleChanges}
                        />
                    </label><br/>
                    <button>Submit</button>
                </form><br/>
            </div>
        )
    }
}

export default FriendsList
