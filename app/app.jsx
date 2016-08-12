import React, {Component} from 'react'
import Map from './map/index.jsx'
import LocationsList from './locationsList/list.jsx';
import service from './common/locationsService';
import store from './common/mapStore';


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listData: [],
            lheight: 0,
        }

        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        this.setState({lheight: this.refs.list.scrollHeight})

        service.listAll().then(res => res.json())
            .then(data => {
                store.dispatch(data)
                this.setState({listData: data})
            })
    }
    render() {
        return (
            <div>
                <div className="half-background"></div>
                <div className="container">
                    <div className="row box--shadow holder" ref="list">                        
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 p-0 list">
                            <LocationsList list={this.state.listData} lheight={this.state.lheight}/>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 p-0">
                            <Map list={this.state.listData} />
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}


export default App