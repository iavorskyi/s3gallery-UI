import * as React from 'react';
import Gallery from './Gallery';
import Header from './Header';
import Login from './Login';




function App() {
  const [token, setToken] = React.useState();
  const [username, setUsername] = React.useState();
  const updateToken = (token) => {
      setToken(token)
   }
    const updateUsername = (username) => {
        console.log("Username: " + username )
        setUsername(username)
    }
  return (
          <>
            {token ? (
                <div>
                  <Header username = {username}/>
                  <Gallery token = {token}/>
                </div>
              )
              :
              <Login updateToken = {updateToken} updateUsername = {updateUsername} />
            }
          </>
  )
}

export default App;
