import { h, Component } from 'preact'

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
    }

    render({ toastData }, { closed }) {
        return (
            <li onClick={this._dismiss} className={'toast ' + (toastData.closed || closed ? 'toast--closed' : '')}>
                {toastData.description}
            </li>
        )
    }
} 