import { register } from 'swiper/element/bundle'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { useState, useEffect } from 'react';

import styles from './Home.module.css'

register();

function Home() {

    const [slidePerView, setSlidePerView] = useState(2)

    useEffect(() => {
        function handleResize(){
            if(window.innerWidth < 720){
                setSlidePerView(1);
            } else {
                setSlidePerView(2);
            }
        }

        handleResize();

        window.addEventListener("resize", handleResize)

        return() =>{
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    const data=[
        {id:'1', image: 'https://i.scdn.co/image/ab67706c0000da84fa3aaa0d963e2bf8ad57b74a'},
        {id:'2', image: 'https://i.redd.it/ekaeyhvxoyp61.jpg'},
        {id:'3', image: 'https://i.imgur.com/qW7QMXB.jpg'},
        {id:'4', image: 'https://i.pinimg.com/originals/c7/1b/77/c71b7763ff93ef9b1a8ee1ebde0db025.jpg'},
    ]


        return (
            <div className='container'>
                <Swiper slidesPerView={slidePerView} pagination={{clickable:true}} navigation>
                    {data.map((item) =>(
                        <SwiperSlide key={item.id}>
                            <img
                                src={item.image}
                                alt="Slider"
                                className={styles.slide_item}
                            />
                        </SwiperSlide>

                    ))}
                </Swiper>
                
            </div>
        );

}

export default Home;
