import React, {useState, useEffect } from 'react'

export default function Resturant() {

  const [menuByFood, setMenuByFood] = useState();

  useEffect(() => {
    getMenuDetails()
  }, [])

  const getMenuDetails = async() => {
    try{
      let response = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9689968&lng=77.72088529999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"));
      if(response.ok){
        let resp = await response.json();
        setMenuByFood(resp);
      }

    }catch(err){
      console.error(err)
    }
  }

  console.log(menuByFood, "menuByFood")

  return (
    <div className='max-width-screen-l flex '>
        <h1>This is the resturant page</h1>



    </div>
  )
}
