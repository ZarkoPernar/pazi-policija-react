import React from 'react'
import mapStore from '../common/mapStore'


class ListOptions extends React.Component {
    constructor(props) {
        super(props)

        mapStore.subscribe('google_autocomplete_selected', (place) => {

        })
        mapStore.subscribe('google_map_selected', (place) => {
            this.selectedLocation = place
        })
    }   

    render() {
        return (
            <div>
               <button>Add</button>   
            </div>
        )
    }
}

export default ListOptions
