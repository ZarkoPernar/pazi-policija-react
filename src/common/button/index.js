import { h, Component } from 'preact'

require('./_button.scss')

const CssClasses = {
    RIPPLE_EFFECT: 'mdl-js-ripple-effect',
    RIPPLE_CONTAINER: 'mdl-button__ripple-container',
    RIPPLE: 'mdl-ripple'
}

export default class MyButton extends Component { 
    constructor() {
        super()

        this.getElement = this.getElement.bind(this)
    }

    getElement(el) {
        this.element_ = el

        this.boundButtonBlurHandler = this.blurHandler.bind(this)
    }

    blurHandler() {

    }

    render({children, ...props}) {
        return (
            <button 
                onMouseup={this.boundButtonBlurHandler}
                onMouseleave={this.boundButtonBlurHandler}
                className={'mdl-button mdl-js-button' + ' ' + props.customClasses} {...props} ref={this.getElement}>
                {children}
                {
                    this.props.ripple && (
                        <span className="mdl-button__ripple-container">
                            <span className="mdl-ripple" onMouseup={this.boundButtonBlurHandler}></span>                
                        </span>
                    )
                }
            </button>
        ) 
    }
}