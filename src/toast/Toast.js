import { createElement, Component } from 'react'


export class Toast extends Component {
    constructor() {
        super()

        this.state = {
            closed: false
        }

        this._dismiss = this._dismiss.bind(this)
        this.timeOut = this.timeOut.bind(this)
    }

    componentDidMount() {
        if (this.props.toastData.duration) {
            setTimeout(this.timeOut, this.props.toastData.duration)
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.toastData !== this.props.toastData || nextState.closed !== this.state.closed)
    }

    _dismiss() {
        this.props.dismiss(this.props.toastData)
    }

    timeOut() {
        this.setState({
            closed: true
        })

        this.props.removeMe()
    }

    render() {
        return (
            <li onClick={this._dismiss} className={'toast ' + (this.props.toastData.closed || this.state.closed ? 'toast--closed' : '')}>
                {this.props.toastData.description}
            </li>
        )
    }
} 