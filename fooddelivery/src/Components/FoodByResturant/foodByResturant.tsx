import React from 'react'
import { useSelector } from 'react-redux'

const FoodByResturant: React.FC<{}> = () => {

  const resturantByFoodChains = useSelector((state : any) => state?.resturantData?.resturantData && state?.resturantData?.resturantData[1])

  console.log(resturantByFoodChains, "foodchain")

  return (
    <div>foodnF</div>
  )
}


export default FoodByResturant