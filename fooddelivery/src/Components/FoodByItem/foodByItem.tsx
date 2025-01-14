import React, {useState, useEffect, useRef} from 'react';
import Loader from '../Loader/loader';
import "./foodByItem.css";

import { GoArrowRight, GoArrowLeft } from "react-icons/go";

const FoodByItem:React.FC<{}> =() => {

    const [menuByFood, setMenuByFood] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    
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
            const targetUrl = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9689968&lng=77.72088529999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
    
            let response = await fetch(proxyUrl);
            if (response.ok) {
                let resp = await response.json();
                const menuData = JSON.parse(resp.contents); // Swiggy's response is wrapped in the `contents` field
                setMenuByFood(menuData.data.cards[0]); // Inspect data here
            }
        } catch (err) {
            console.error(err);
        }
    };
    
      
    console.log(menuByFood, "menuByFood")
    
    return (
        <>
            {isLoading && <Loader />}
            {menuByFood !== null &&
            <div className='custom-margin overflow-hidden'>
            <div >
                    <div className='flex justify-between mb-5'>
                        <div>
                            <h1 className='text-3xl font-bold'>{menuByFood?.card?.card?.header?.title}</h1>
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
                        {menuByFood?.card?.card?.imageGridCards?.info?.map((item : any) => (
                            console.log(item, "item"),
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
                    <hr/>
            </div>
            </div>
            }
        </>
        )
}

export default FoodByItem


