import { h } from 'preact'
import { PureComponent } from 'preact-compat'

export default class ViewTitle extends PureComponent {
    render({ viewTitle }) {
        return (
            <span>
                {viewTitle.charAt(0).toUpperCase() + viewTitle.substring(1).toLowerCase()}
            </span>
        )
    }
}

