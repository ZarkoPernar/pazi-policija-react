import { createElement, Component } from 'react'

const FUNC = 'function'

export default class Input extends Component {
    state = {
        elValue: '',
    }

    constructor(props) {
        super(props)

        this._el = null

    }

    componentDidMount() {

    }

    getInputValue = () => {
        return this.state.elValue
    }

    _getElRef = (el) => {
        this._el = el
    }

    _onInput = (event) => {
        let val = event.target.value

        // If we pass a validate func, use that first
        if (isFunction(this.props.validate)) {
            if (this.props.validate(val)) {
                this._update(val)
            }
        } else {
            this._update(val)
        }
    }

    _update = (val) => {
        this.setState({
            elValue: val
        })

        if (isFunction(this.props.change)) {
            this.props.change(val)
        }
    }

    render() {
        return <input value={this.state.elValue} onInput={this._onInput} ref={this._getElRef} {...this.props} />
    }
}

function isFunction(fn) {
    return fn !== undefined && typeof fn === FUNC
}
