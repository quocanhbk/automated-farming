import {action, createStore, persist} from 'easy-peasy'

const store = createStore(
    persist({
        username: null,
        setUsername: action((state, payload) => {
            state.username = payload
        }),
        isDark: true,
        toggleTheme: action((state) => {
            state.isDark = !state.isDark
        })
    })
)

export default store