import { Component, h } from 'preact'
import { Provider } from 'preact-redux'
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
