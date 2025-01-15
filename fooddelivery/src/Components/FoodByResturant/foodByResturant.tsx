import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import "./foodByResturant.css"
import Scroller from '../Scroller/scroller'

const FoodByResturant: React.FC<{}> = () => {

  const resturantByFoodChains = useSelector((state : any) => state?.resturantData?.resturantData && state?.resturantData?.resturantData[1])
  const resturantDetails = resturantByFoodChains?.card?.card?.gridElements?.infoWithStyle?.restaurants
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);


  console.log(resturantByFoodChains, "foodchain")
  // console.log(resturantByFoodChains.card.card.gridElements.infoWithStyle.restaurants,"resturantDetails")

  return (
    
    <div className='custom-margin overflow-hidden'>
      <div>
        <div className='flex justify-between mb-5'>
          <h1 className='text-3xl font-bold'>{resturantByFoodChains?.card?.card?.header.title}</h1>
          <Scroller refDetails={scrollContainerRef}/>
          </div>
      </div>
      <div className='flex overflow-scroll scrollbar-hide'>
        {resturantDetails.map((item : any) => (
          <div className='w-full'>
          <a className=""key={item.info.id} href="hs">
            <div>
              <div>
                <img className=""
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item.info.cloudinaryImageId}`} 
                  alt=""/>
              </div>
              <div>

              </div>
            </div>
          </a>
          </div>
        ))}
      </div>
      <hr className='font-bold margin-hr'/>
    </div>
  )
}


export default FoodByResturant