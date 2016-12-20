export default {
    select(item) {
        return {
            type: 'SELECT',
            payload: item
        }
    }
}