import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const ImgScroll = ({imgs})=>{
    if(imgs.length<2)
        return(
            <img  src={imgs[0]} alt="image" className="object-cover h-full w-full"/>
    );
    else
      return(
        <Swiper modules={[Autoplay]} autoplay={{delay:3000}}  slidesPerView={1} loop={true} speed={1000} className="w-full h-full" >
            {
                imgs.map((item,index) =>{
                    return(
                        <SwiperSlide key={index}>
                            <img  src={item} alt="image" className="object-cover h-full w-full"/>
                        </SwiperSlide>
                    );
                })
            }
        </Swiper>
        );
}
export default ImgScroll;