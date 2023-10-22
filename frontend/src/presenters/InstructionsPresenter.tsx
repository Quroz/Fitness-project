import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import InstructionsView from '../pages/Explore/InstructionsView';

type Props = {}

function InstructionsPresenter({}: Props) {

  const location = useLocation();
  const searchData = new URLSearchParams(location.search).get("data");

  const dataJSON = searchData
		? JSON.parse(decodeURIComponent(searchData))
		: null;

  return (
    <div>
        <InstructionsView searchData={searchData} dataJSON={dataJSON}/>
    </div>
  )
}

export default InstructionsPresenter