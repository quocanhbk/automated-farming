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
        isDark: true,
        setTheme: action((state, payload) => {
            state.isDark = payload
        }),
        power: true,
        getPower: thunk(async (actions, payload) => {
            const res = await axios.get("/api/power")
            actions.setPower(res.data.power === "on")
        }),
        setPower:action((state,payload) => {
            state.power = payload
        })
    })
)

export default store