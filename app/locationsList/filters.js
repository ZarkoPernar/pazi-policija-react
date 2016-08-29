import React from 'react'
import store from '../dropdown/dropdownStore'

var css = require('./filters.scss')

const filter = ({isOpen, active, options}) => (
    <div
        className={isOpen ? 'dropdown open' : 'dropdown'}
        style={{display: 'inline-block'}}>
        <button
            className="dropdown-toggle"
            key="dropdown-toggle"
            onClick={toggle}>
            {isOpen ? 'Select...' : active}
        </button>
        <div className="dropdown-menu" key="dropdown-menu">
            {
                options.map(function(option) {
                    return (
                        <a key={option}
                            className={option === active ? 'dropdown-menu__option active' : 'dropdown-menu__option'}
                            onClick={createDispatch(option)}>
                            {option}
                        </a>
                    )
                })
            }
        </div>
    </div>
)

function toggle() {
    store.dispatch({
        type: 'DROPDOWN_TOGGLE',
    })
}

function createDispatch(option) {
    return function() {
        store.dispatch({
            type: 'DROPDOWN_OPTION_SELECT',
            active: option,
        })
    }
}

export default filter
