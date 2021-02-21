import React, { createContext, useState,  useEffect} from 'react';

const { Provider, Consumer } = createContext({});

export const withStore = Component => props => {
    return (<Consumer>{store =>
        <Component {...props} store={store} />}

    </Consumer>);
}

export default props => {

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const user = require('./assets/userInfo.json')
        user.balance = user.balance.replace('.', ',')
        
        setUserInfo(user)
    }, [])

    return (<Provider value={{
        userInfo
    }}>{props.children}</Provider>)
}