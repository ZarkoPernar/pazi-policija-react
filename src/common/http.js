import fetch from 'unfetch'

import { URL } from '../common/urlService'

export default function http(url, options) {
    return fetch(URL + url, options)
}

http.get = get
http.post = post

export function get(url) {
    return fetch(url)
}

export function post(url, data, options={}) {
    return fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(data),
        ...options
    })
}