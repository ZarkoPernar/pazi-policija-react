import React from 'react'
import Map from './map'



const app = React.createClass({
    render() {
        return (
            <div>
                <div className="half-background"></div>
                <div className="container">
                    <div className="row box--shadow holder">                        
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 p-0 list">
                            <div className="box">Hello</div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 p-0">
                            <Map />
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
})


export default app