import { useEffect } from 'react'
import './App.css'
import FrontPage from "./componets/FrontPageData/FrontPage.jsx"
import getData from './hooks/getData.js'

function App() {


  
  // const [result,loading,error] = getData('/videos/')
  // console.log(result) 

  // if(loading)
  // {
  //   return (
  //     <h1>Loading...</h1>
  //   )
  // }

  // if(error)
  //   {
  //     return (
  //       <h1>Error</h1>
  //     )
  //   }

  return (
    <>
      {/* <h1>{result.totalVideos}</h1> */}
      <FrontPage />
    </>
  )
}

export default App

