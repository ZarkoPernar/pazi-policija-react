import fetch from 'unfetch'

import { URL } from '../common/urlService'

export const authService = {
    loginWithGoogle() {
        fetch(URL + '/auth/google')
    },
    logout() {
        fetch(URL + '/auth/logout')
    }
}