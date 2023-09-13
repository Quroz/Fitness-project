import React, {useState} from 'react'

export interface IAppProps {
}

export function useAccount(props: IAppProps) {

  const [loginError, setLoginError] = useState(null)
  const [signupError, setSignupError] = useState(null)

  async function login(email: String,password: String){

    setLoginError(null)

    const response = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        body: JSON.stringify({email,password}),
        headers: {"Content-Type": "application/json"}
    })
    const data = await response.json()

    if(response.status !== 200){
        setLoginError(data.Error)
        console.log(data.Error)
    }
    else{
        alert("Succed")
        localStorage.setItem("User", JSON.stringify(data))
        window.location.reload()
    }
  }

  async function signup(email: String,password: String){
        setSignupError(null)

        const response = await fetch("http://localhost:4000/api/user/signup", {
          method: "POST",
          body: JSON.stringify({email,password}),
          headers: {"Content-Type": "application/json"}
        })
       const data = await response.json()

       if(response.status !== 200){
          setSignupError(data.Error)
          console.log(data.Error)
        }
      else{
          localStorage.setItem("User", JSON.stringify(data))
          window.location.reload()
      }
  }

  function logout(){
    localStorage.removeItem("User")
  }


  return {login, loginError ,signup ,signupError ,logout}
}



