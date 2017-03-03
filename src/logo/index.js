import { h } from 'preact'

export const Logo = () => (
    <span style={{
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 500,
        fontSize: '40px',
        display: 'block',
        position: 'relative',
        height: '21px',
        width: '50px',
        overflow: 'hidden',
    }} className="logo">
        <span style={{
            transform: 'rotateY(180deg) translateX(50%)',
            position: 'absolute',
            left: '13px',
            lineHeight: .7,
            color: '#3f51b5',
        }} className="logo-left">
            P
        </span>    
        <span style={{
            transform: 'translateX(50%)',
            position: 'absolute',
            color: 'rgb(255, 98, 72)',
            right: '13px',
            top: 0,
            display: 'block',
            lineHeight: .7,
        }} className="logo-right">
            P
        </span>        
    </span>
)