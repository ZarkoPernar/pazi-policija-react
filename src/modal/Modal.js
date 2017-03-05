import { createElement, Component } from 'react'
import './modal.scss'

export default ({isOpen, children}) => (
    <div className={'modal ' + (isOpen ? 'modal--is-open' : '')}>
        <div className="modal__body">
            {children}
        </div>
    </div>
)