import { createElement, Component } from 'react'
import { PureComponent } from 'react'

export default class ViewTitle extends PureComponent {
    render() {
        return (
            <span>
                {this.props.viewTitle.charAt(0).toUpperCase() + this.props.viewTitle.substring(1).toLowerCase()}
            </span>
        )
    }
}

