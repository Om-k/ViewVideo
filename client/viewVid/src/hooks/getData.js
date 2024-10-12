import { useEffect, useState } from "react"
import apiClient from "../services/apiClient"

const getData =  (urlPath) => {
    const [result, setResult] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [render,setRender] = useState(false)
  
    useEffect(() => {

      (async () => {
        try {
          setError(false)
          setLoading(true)
          const response = await apiClient.get(urlPath); 
          setResult(response.data.data)
          setLoading(false)
        } catch (error) {
          //console.log("Error",error)
          setLoading(false)
          setError(true)
        }

      })()
    },[urlPath,render])
  
    return [result,loading,error,setRender]
  }

  export default getData