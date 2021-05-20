import {Redirect} from '@reach/router'
import { useStoreRehydrated, useStoreState } from 'easy-peasy'
import LoadingPage from './LoadingPage';

const Redirector = ({children}) => {
    const username = useStoreState(state => state.username)
    const isRehydrated = useStoreRehydrated();
    return (
        isRehydrated ?
            (username === null ? <Redirect to="/" noThrow/> : children) :
            <LoadingPage/>
    )
}

export default Redirector