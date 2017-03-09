import fetch from 'unfetch'

import { URL } from '../common/urlService'

export default function http(url, ...args) {
    return fetch(URL + url, args)
}