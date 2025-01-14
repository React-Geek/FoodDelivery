import React, {useState, useEffect, useRef} from 'react';
import Loader from '../Loader/loader';
import { useDispatch, useSelector } from 'react-redux';
import { getResturantData } from '../../Slices/resturantDataSlice';

import "./foodByItem.css";

import { GoArrowRight, GoArrowLeft } from "react-icons/go";

const FoodByItem:React.FC<{}> =() => {

    // const [menuByFood, setMenuByFood] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const dispatch = useDispatch()

    const resturantData = useSelector((state : any) => state?.resturantData?.resturantData !== null && state?.resturantData?.resturantData[0]);

    console.log(resturantData, "resturantData")
    
    useEffect(() => {
        getMenuDetails()
    }, [])

    const handleScrollleft = () => {
        if(scrollContainerRef.current){
            scrollContainerRef.current.scrollBy({
                left: -600,
                behavior: 'smooth'
            })
        }
    }

    const handleScrollRight = () => {
        if(scrollContainerRef.current){
            scrollContainerRef.current.scrollBy({
                left:600,
                behavior:'smooth'

            })
        }
    }


    // const getMenuDetails = async() => {
    //     try {
    //         setIsLoading(true)
    //         const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    //         const targetUrl = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9689968&lng=77.72088529999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";
            
    //         let response = await fetch(proxyUrl + targetUrl, {
    //             headers: {
    //                 'X-Requested-With': 'XMLHttpRequest'
    //             }
    //         });
      
    //         if (response.ok) {
    //             let resp = await response.json();
    //             setMenuByFood(resp.data.cards[0]);
    //             setIsLoading(false)
    //         }
    //     } catch (err) {
    //         console.error(err);
    //     }
    //   }

      const getMenuDetails = async () => {
        try {
            setIsLoading(true);
            const targetUrl = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9689968&lng=77.72088529999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
    
            let response = await fetch(proxyUrl);
            if (response.ok) {
                let resp = await response.json();
                const menuData = JSON.parse(resp.contents); 
                // setMenuByFood(menuData.data.cards[0]);
                setIsLoading(false)
                dispatch(getResturantData(menuData.data.cards))

            }
        } catch (err) {
            console.error(err);
        }
    };
    
      
    // console.log(menuByFood, "menuByFood")
    
    return (
        <>
            {isLoading && <Loader />}
            {resturantData !== null &&
            <div className='custom-margin overflow-hidden'>
            <div >
                    <div className='flex justify-between mb-5'>
                        <div>
                            <h1 className='text-3xl font-bold'>{resturantData?.card?.card?.header?.title}</h1>
                        </div>
                        <div>
                            <button
                                className='bg-gray-300 text-black p-3 rounded-full font-bold mr-2'
                                onClick={handleScrollleft}
                                >
                                <GoArrowLeft />
                            </button>
                            <button
                                className='bg-gray-300 text-black p-3 rounded-full text-bold'
                                onClick={handleScrollRight}
                                >
                                <GoArrowRight />
                            </button>
                        </div>
                    </div>
                    <div className='flex bg-transparent overflow-scroll scrollbar-hide'
                        ref={scrollContainerRef}>
                        {resturantData?.card?.card?.imageGridCards?.info?.map((item : any) => (
                            <div
                                key={item.id}>
                                <a className='cursor-pointer' href='as'>
                                    <div className='h-45 w-36 mr-4'>
                                        <img 
                                            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`} 
                                            className='bg-inherit'
                                            alt=""
                                        />
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                    <hr className='font-bold margin-hr'/>
            </div>
            </div>
            }
        </>
        )
}

export default FoodByItem


