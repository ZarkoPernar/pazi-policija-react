import { createElement, Component } from 'react'
import { PureComponent } from 'react'

export default class AppView extends PureComponent {
    constructor() {
        super()
    }

    render() {
        return (
            <div className={'app-view' + ' ' + (this.props.activeView === this.props.viewName ? 'app-view--active' : '')} data-view-name={this.props.viewName}>
                {this.props.children}
            </div>
        )
    }
}
