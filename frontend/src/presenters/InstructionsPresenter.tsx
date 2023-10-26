import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import InstructionsView from '../pages/Explore/InstructionsView';


type Props = {}

function InstructionsPresenter({}: Props) {

  const location = useLocation();
  const searchData = new URLSearchParams(location.search).get("data");
  const navigate = useNavigate();

  function navigateHandler(){
    navigate("/explore")
  }

  const dataJSON = searchData
		? JSON.parse(decodeURIComponent(searchData))
		: null;

  return (
    <div>
        <InstructionsView searchData={searchData} dataJSON={dataJSON} navigateHandler = {navigateHandler}/>
    </div>
  )
}

export default InstructionsPresenter