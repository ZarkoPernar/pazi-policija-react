import { createElement, Component } from 'react'

import './styles.scss'

export default class Loader extends Component {
    shouldComponentUpdate() {
        return false
    }
    render() {
        return (
            <div className="pswp__preloader__icn">
                <div className="pswp__preloader__cut">
                    <div className="pswp__preloader__donut" />
                </div>
            </div>
        )
    }
}