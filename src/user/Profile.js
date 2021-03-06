import { createElement, Component } from 'react'
import { connect } from 'react-redux'

import { authService } from './authService'

import './profile.scss'

class UserProfile extends Component { 
    constructor() {
        super()
        this.init = false
        this._login = this._login.bind(this)
        this._logout = this._logout.bind(this)
        this.updateSigninStatus = this.updateSigninStatus.bind(this)

        this.state = {
            isSignedIn: false
        }

    }

    componentDidMount() {
        
    }

    initGoogle() {
        if (this.init) return
        this.init = true

        this.gapiLoadAuth()
    }

    updateSigninStatus(isSignedIn) {
        this.setState({ isSignedIn })
    }   

    _login() {
        authService.loginWithGoogle()
    }

    _logout() {
        authService.logout()
    }

    render() {
        return (
            <div className="user-profile">   
                <a key="login-google" target="_self" href="/auth/google">
                    Login With Google
                </a>

                <a key="logout-google" target="_self" href="/auth/logout">
                    Logout
                </a>
            </div>
        )
    }
}

// const LinkedUserProfile = connect(mapStateToProps, mapDispatchToProps)(UserProfile)

export default UserProfile

// function mapStateToProps({activeView, searchParams, selectedAutocompleteItem}) {
//     return { 
//         activeView,
//         searchParams,
//         selectedAutocompleteItem,
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         autocompleteSelect: (item) => {
//             dispatch(
//                 autocompleteSelectActions.select(
//                     item
//                 )
//             )
//         },
//         onSearchKeydown: (event) => {
//             dispatch({
//                 type: 'SEARCH_KEYDOWN',
//                 payload: {
//                     inputValue: event.target.value
//                 }
//             })
//         },
//         onSearchEnter: (event) => {
//             dispatch({
//                 type: 'SEARCH_ENTER',
//                 payload: {
//                     inputValue: event.target.value
//                 }
//             })
//         },
//     }
// }
