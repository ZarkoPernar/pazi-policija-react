import { createElement, Component } from 'react'


export class Logo extends Component {
    constructor() {
        super()
    }

    shouldComponentUpdate() {
        return false
    }

    render() {
        return (
            <span style={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 500,
                fontSize: '40px',
                display: 'block',
                position: 'relative',
                height: '20px',
                width: '50px',
                overflow: 'hidden',
            }} className="logo">
                <span style={{
                    transform: 'rotateY(180deg) translateX(50%)',
                    position: 'absolute',
                    left: '13px',
                    top: '2px',
                    lineHeight: .7,
                    color: 'rgb(255, 98, 72)',
                }} className="logo-left">
                    P
                </span>    
                <span style={{
                    transform: 'translateX(50%)',
                    position: 'absolute',
                    color: '#3f51b5',
                    right: '13px',
                    top: '2px',
                    display: 'block',
                    lineHeight: .7,
                }} className="logo-right">
                    P
                </span>        
            </span>
        )
    }
}