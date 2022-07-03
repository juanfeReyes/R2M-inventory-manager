import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom"
import { useSessionstorageState } from "rooks";
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { AuthContext } from "./AuthProvider";

export default function Callback() {

  let auth = useContext(AuthContext)
  const [user, setUser] = useSessionstorageState<any>("user", null)
  const [code, setCode] = useSessionstorageState<any>("code", null)
  const [accessToken, setAccessToken] = useSessionstorageState<any>("access_token", null)
  let [searchParams] = useSearchParams();

  useEffect(() => {

    const code = searchParams.get("code")!;
    setCode(code)
    return () => {
      
    }
  }, [])

  useEffect(() => {
    const setToken = async () => {
      try {
        // Should avoid second renderization, maybe not using a component but a method or something different
        const token = await auth.getToken(code)
        setAccessToken(token)
       
      } catch (e: any) {
        console.error('token error', e.response.data)
      }
    }

    if (code) {
      setToken()
    }
  }, [code])

  useEffect(() => {
    const setToken = async () => {
      try {
        const userInfo = await auth.getUserInfo(accessToken.access_token)
        setUser(userInfo)
        window.location.replace('http://localhost:3000/')
       
      } catch (e: any) {
        console.error('token error', e.response.data)
      }
    }

    if (accessToken) {
      setToken()
    }
  }, [accessToken])

  return (<div></div>)
}
