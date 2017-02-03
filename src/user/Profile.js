import { h, Component } from 'preact'
import { connect } from 'preact-redux'

const initGoogle = window.initGoogle

class UserProfile extends Component { 
    constructor() {
        super()

        this._login = this._login.bind(this)
        this._unregister = initGoogle.addListener('auth', this.initGoogle.bind(this))
    }

    componentDidMount() {
        if (window.gapi) {
            this.initGoogle()
        }
    }

    initGoogle() {
        gapi.load('auth2', function() {
            gapi.auth2.init({
                client_id: 'AIzaSyB2Vxg0KuWymrqutiyBdXcqEIOLm0GZf40.apps.googleusercontent.com',
                fetch_basic_profile: false,
                scope: 'profile'
            })
        })
    }

    _login() {
        let auth = gapi.auth2.getAuthInstance()

        auth.signIn()
            .then(function(res) {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    render() {
        return (
            <div className="user-profile">   
                <button onClick={this._login}>
                    Login With Google
                </button>
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
