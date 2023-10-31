import { register } from 'swiper/element/bundle'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { useState, useEffect } from 'react';

import styles from '../module/Home.module.css'

register();

function Home() {

    const [repositories, setRepositories] = useState([])

    useEffect(()=>{
        const buscarRepositorios = async() => {
            const response = await fetch('http://localhost:8080/roteiro')

            const data = await response.json()
            setRepositories(data)
        }
        buscarRepositorios()
    }, [])


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

        return (
            <div className="container">
                <Swiper slidesPerView={slidePerView} pagination={{clickable:true}} navigation>
                    {repositories.map((item) =>(
                        <SwiperSlide key={item.id}>
                            <div className={styles.carrossel}>
                            <img
                                src={item.urlImagem}
                                alt="Slider"
                                className={styles.slide_item}
                            />
                            </div>
                        </SwiperSlide>

                    ))}
                </Swiper>        
            </div>
        );

}

export default Home;
