/*import { createElement, Component } from 'react'
var css = require('./filters.scss')


const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}


const Filter = ({isOpen, active, options}) => (
    <div className={isOpen ? 'dropdown open' : 'dropdown'}
        style={{display: 'inline-block'}}>
        <button
            className="dropdown-toggle"
            key="dropdown-toggle"
            onClick={toggle}>
            {!active ? 'Select...' : active}
        </button>
        <div className="dropdown-menu" key="dropdown-menu">
            {
                options.map(function(option) {
                    return (
                        <a key={option}
                            className={option === active ? 'dropdown-menu__option active' : 'dropdown-menu__option'}
                            onClick={createDispatch(option)}>
                            {option}
                        </a>
                    )
                })
            }
        </div>
    </div>
)

const Filters = (props) => {
    return (
        <div className="filters">
            <Filter options={['distance', 'upvotes']}
                active={store.getState().active}
                isOpen={store.getState().isOpen} />
        </div>
    )
}

function toggle() {
    store.dispatch({
        type: 'DROPDOWN_TOGGLE',
    })
}

function createDispatch(option) {
    return function() {
        store.dispatch({
            type: 'DROPDOWN_OPTION_SELECT',
            active: option,
        })
    }
}

export default Filters*/
