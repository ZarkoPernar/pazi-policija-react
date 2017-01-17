import { h, Component } from 'preact'
import { connect } from 'preact-redux'

require('./toast.scss')

import { Toast } from './Toast'

class Toaster extends Component { 
    constructor() {
        super()
    }

    render({ toasts, dismissToast }) {
        return (
            <div key="toaster" className="toaster">                          
                <ul className="toast-list">
                    { toasts.map((data) => <Toast toastData={data} dismiss={dismissToast} />) }
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