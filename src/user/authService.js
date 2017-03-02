
export const authService = {
    loginWithGoogle() {
        fetch('/auth/google')
    },
    logout() {
        fetch('/auth/logout')
    }
}