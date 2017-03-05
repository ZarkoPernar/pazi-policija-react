import { createElement, Component } from 'react'
import { connect } from 'react-redux'


require('./toast.scss')

import { Toast } from './Toast'

class Toaster extends Component { 
    constructor() {
        super()
    }

    render() {
        return (
            <div key="toaster" className="toaster" hidden={!this.props.toasts.length}>                          
                <ul className="toast-list">
                    { this.props.toasts.map((data) => <Toast key={data.id | Math.random()} toastData={data} dismiss={this.props.dismissToast} />) }
                </ul>
            </div>
        )
    }
}

const LinkedToaster = connect(mapStateToProps, mapDispatchToProps)(Toaster)

export default LinkedToaster

function mapStateToProps({toasts}) {
    return { 
        toasts,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dismissToast(toast) {
            dispatch({
                type: 'DISMISS_TOAST',
                payload: toast
            })
        }
    }
}