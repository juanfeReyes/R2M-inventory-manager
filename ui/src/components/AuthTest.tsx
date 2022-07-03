import axios from "axios"
import { useContext } from "react"
import { useSessionstorageState } from "rooks"
import { AuthContext } from "./router/AuthProvider"

export default function AuthTest() {
  let auth = useContext(AuthContext)
  const [accessToken, setAccessToken] = useSessionstorageState<any>("access_token", null)

  async function getUserInfo(){
    const userInfo = await auth.getUserInfo(accessToken.access_token)
    console.log('User Info', userInfo)
  }

  async function getPackages(){
    const headers = {Authorization: `Bearer ${accessToken.access_token}`}
    const response = await axios.get('http://localhost:8080/packages', {headers})
    console.log(response)
  }

  async function logout(){
    await auth.logout()
  }

  return (
    <div>
      <button onClick={() => getUserInfo()}>request user Info</button>
      <button onClick={() => getPackages()}>request packages</button>
      <button onClick={() => logout()}>Log out</button>
    </div>
  )
}