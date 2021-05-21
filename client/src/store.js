import {action, createStore, persist, thunk} from 'easy-peasy'
import axios from 'axios'
const store = createStore(
    persist({
        username: null,
        setUsername: action((state, payload) => {
            state.username = payload
        }),
        getUsername: thunk(async (actions, payload) => {
            let returnData = await axios.get('/api/auth')
            if (returnData.data.username) {
                actions.setUsername(returnData.data.username)
            }
        }),
        
        //Theming
        isDark: false,
        toggleTheme: action((state) => {
            state.isDark = !state.isDark
        })
    })
)

export default store