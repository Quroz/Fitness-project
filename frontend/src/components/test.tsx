import React from 'react';
import { useLocation } from "react-router-dom";

type Props = {
    item: any;
}



function Test({}: Props) {

    const location = useLocation();
    const searchData = new URLSearchParams(location.search).get('data');
    const data = searchData ? JSON.parse(decodeURIComponent(searchData)) : null;
    
    console.log("DATA i test", data)

  return (
    <div></div>
  );
}

export default Test;
