import React from 'react'
import service from './googlePlacesService'
const scss = require('./autocomplete.scss')

class GoogleAutocomplete extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: true,
            selectedIndex: 0,
            selected: null,
            results: [],
        }
        this._inputChanged = this._inputChanged.bind(this)
        this._inputClicked = this._inputClicked.bind(this)
        this._inputKeydown = this._inputKeydown.bind(this)
        this._optionClicked = this._optionClicked.bind(this)
    }
    componentDidMount() {
        document.documentElement.addEventListener('click', () => {
            this.setState({
                isOpen: false,
            })
        })
    }
    _inputClicked() {
        if (this.state.results.length > 0) {
            this.setState({
                isOpen: true,
            })
        }
    }
    _inputKeydown(e) {
        let next
        if (this.state.results.length > 0) {
            if (e.keyCode === 38) {
                e.preventDefault()
                next = this.state.selectedIndex - 1
                if (next >= 0) {
                    this._optionElements[next].focus()
                    this.setState({
                        selectedIndex: next
                    })
                }
            } else if (e.keyCode === 40) {
                e.preventDefault()
                next = this.state.selectedIndex + 1
                if (next <= (this.state.results.length - 1)) {
                    this._optionElements[next].focus()
                    this.setState({
                        selectedIndex: next
                    })
                }
            } else if (e.keyCode === 13) {
                e.preventDefault()
                let selected = this.state.results[this.state.selectedIndex]
                this._inputElement.value = selected.name
                this.setState({
                    isOpen: false,
                    selected: selected
                })
            }
        }
    }
    _inputChanged(e) {
        let val = e.target.value
        if (val.length < 3) return

        service.search({
            query: e.target.value
        })
        .then((data) => {
            if (data) {
                this.setState({
                    isOpen: true,
                    results: data,
                })
            }
        })
    }
    _optionClicked(e) {
        let index = parseInt(e.target.id.substring(20))
        console.log(index)
        let selected = this.state.results[index]
        this._inputElement.value = selected.name
        this.setState({
            selectedIndex: index,
            isOpen: false,
            selected: selected
        })
    }
    render() {
        const self = this
        this._optionElements = []
        return (
            <div className={this.props.isOpen ? 'slide-dialog slide-dialog--open' : 'slide-dialog'}>
                <div
                    className="form-group"
                    onKeyDown={this._inputKeydown}
                    style={{position: 'relative', width: '300px',}}>
                    <input ref={(e) => this._inputElement = e} key="places-search" onChange={this._inputChanged} onClick={this._inputClicked} />
                    <div key="places-results" className="places-results" style={{
                        display: this.state.isOpen ? 'block' : 'none',
                    }}>
                        {
                            this.state.isOpen ? this.state.results.map((res, i)=> {
                                return (
                                    <button
                                        key={res.id}
                                        id={'places-option-index-' + i}
                                        onClick={self._optionClicked}
                                        ref={(e) => this._optionElements.push(e)}
                                        className={'places-results__result ' + (this.state.selectedIndex === i ? 'places-results__result--selected' : '')}>
                                        {res.name}
                                    </button>
                                )
                            }) : <div></div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default GoogleAutocomplete
