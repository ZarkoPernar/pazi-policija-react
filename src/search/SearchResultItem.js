import { createElement, Component } from 'react'

export let SearchResultItem = ({res, click}) => (
    <li className="search-result__item">
        <a onClick={click} className="search-result__link">
            <h4 className="search-result__item__title">
                {res.description}
            </h4>
        </a>
    </li>
)
