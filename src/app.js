import { createElement, Component } from 'react'
import { Provider } from 'react-redux'

import AppStore from './AppStore'
import Container from './Container'

export default class App extends Component {
    constructor() {
        super()
    } 
    render() {
        return (
            <Provider store={AppStore}>    
                <Container />
            </Provider>
        )
    }
}
