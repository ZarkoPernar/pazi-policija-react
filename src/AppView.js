import { h } from 'preact'
import { PureComponent } from 'preact-compat'

export default class AppView extends PureComponent {
    render({ viewName, activeView, children }) {
        return (
            <div className={'app-view' + ' ' + (activeView === viewName ? 'app-view--active' : '')}>
                {children}
            </div>
        )
    }
}
