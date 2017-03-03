import { h } from 'preact'

export let SearchResultItem = ({res, click}) => (
    <li className="search-result__item" key={res.id || Math.random()}>
        <a onClick={click} className="search-result__link">
            <h4 className="search-result__item__title">
                {res.description}
            </h4>
        </a>
    </li>
)
