import React, { Component } from 'react'
import axios from 'axios'
import './styles.css'

export default class list extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            users: [],
            communities: []
        }
    }

    componentDidMount() { this.getData() }
    componentWillReceiveProps() { this.getData() }

    getData() {
        const token = localStorage.getItem("token")
        const obj = {
            token: token
        }
        if (this.props.mode === 'profile') axios.get(window.API_URL+'/admin/users/', {headers: obj})
        .then(res => {
            this.setState({
                users: res.data
            })
        })
        else axios.get(window.API_URL+'/admin/communities/', {headers: obj})
        .then(res => {
            this.setState({
                communities: res.data
            })
        })
    }

    user() {
        const token = localStorage.getItem("token")
        const obj = {
            token: token
        }
        const drop = (id) => {
            axios.delete(window.API_URL+'/user/'+id,  {headers: obj})
            .then(() => {
                window.location.reload()
            })
        }
        const users = this.state.users.map(c => {
            return <div className='user'>
                <img src={c.picture} />
                <p className='name'>{c.name}</p>
                <button onClick={drop.bind(this, c._id)}>Delete</button>
            </div>
        })
        return users
    }

    community() {
        const token = localStorage.getItem("token")
        const obj = {
            token: token
        }
        const drop = (id) => {
            axios.delete(window.API_URL+'/community/'+id,  {headers: obj})
            .then(() => {
                window.location.reload()
            })
        }
        const communities = this.state.communities.map(c => {
            return <div className='community'>
                <img src={c.picture} />
                <p className='name'>{c.name}</p>
                {/* <p className='description'>{c.description}</p> */}
                <button onClick={drop.bind(this, c._id)}>Delete</button>
            </div>
        })
        return communities
    }

    render() {
        return (
            <div className='admin'>
                {this.props.mode === 'profile' ? this.user() : this.community()}
            </div>
        )
    }
}
