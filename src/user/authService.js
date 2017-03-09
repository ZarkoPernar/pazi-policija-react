import http from '../common/http'

export const authService = {
    loginWithGoogle() {
        http('/auth/google', {
            credentials: 'include'
        })
    },
    logout() {
        http('/auth/logout', {
            credentials: 'include'
        })
    }
}