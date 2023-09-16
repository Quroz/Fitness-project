import React, {useState} from 'react'

export interface IAppProps {
}

export function useAccount(props: IAppProps) {

  const [loginError, setLoginError] = useState(null)
  const [signupError, setSignupError] = useState(null)

  async function login(email: String,password: String){


    setLoginError(null)

    const response = await fetch('http://localhost:4000/api/user/login/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email,password})
  })

    const data = await response.json()

    if(response.status !== 200){
        setLoginError(data.Error)
        console.log(data.Error)
    }
    else{
        localStorage.setItem("userFittness", JSON.stringify(data))
        alert("Succed")
    }
  }

  async function signup(email: String,password: String){
        setSignupError(null)

        const response = await fetch('http://localhost:4000/api/user/login/', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email,password})
      })
       const data = await response.json()

       if(response.status !== 200){
          setSignupError(data.Error)
          console.log(data.Error)
        }
      else{
          localStorage.setItem("userFittness", JSON.stringify(data))
          window.location.reload()
      }
  }

  function logout(){
    localStorage.removeItem("userFittness")
  }


  return {login, loginError ,signup ,signupError ,logout}
}



