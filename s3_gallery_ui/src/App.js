import * as React from 'react';
import Gallery from './Gallery';
import Header from './Header';
import Login from './Login';
import Cookies from 'js-cookie';


function App() {
    const [token, setToken] = React.useState();
    const [username, setUsername] = React.useState();
    const updateToken = (token) => {
        setToken(token)
    }
    const updateUsername = (username) => {
        console.log("Username: " + username)
        setUsername(username)
    }
    const cookieUser = Cookies.get('mysession')
    return (
        <>
            {cookieUser ? (
                    <div>
                        <Header username={username}/>
                        <Gallery token={token}/>
                    </div>
                )
                :
                <Login updateToken={updateToken} updateUsername={updateUsername}/>
            }
        </>
    )
}

export default App;
