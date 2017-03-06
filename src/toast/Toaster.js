import { createElement, Component } from 'react'
import { connect } from 'react-redux'


require('./toast.scss')

import { Toast } from './Toast'

class Toaster extends Component { 
    constructor() {
        super()
    }

    remove = (toast) => {
        return () => {
            this.props.removeToast(toast)
        }
    }

    render() {
        return (
            <div key="toaster" className="toaster" hidden={!this.props.toasts.length}>                          
                <ul className="toast-list">
                    { this.props.toasts.map((data) => {
                        return (<Toast key={data.id | Math.random()} 
                            removeMe={this.remove(data)} 
                            toastData={data} 
                            dismiss={this.props.dismissToast} />
                        )
                    }) }
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
        removeToast(toast) {
            dispatch({
                type: 'REMOVE_TOAST',
                payload: toast
            })
        },
        dismissToast(toast) {
            dispatch({
                type: 'DISMISS_TOAST',
                payload: toast
            })
        }
    }
}