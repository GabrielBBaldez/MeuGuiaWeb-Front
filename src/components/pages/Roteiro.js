import Card from '../Card/Card';
import { useState } from 'react';
import { useEffect } from 'react';

import { register } from 'swiper/element/bundle'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


import styles from '../module/Roteiro.module.css';

function Roteiro() {

    const [repositories, setRepositories] = useState([])

    useEffect(()=>{
        const buscarRepositorios = async() => {
            const response = await fetch('http://localhost:8080/roteiro')

            const data = await response.json()
            setRepositories(data)
        }
        buscarRepositorios()
    }, []) 



    const [slidePerView, setSlidePerView] = useState(1)

    /*
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

    */

        return (
            <section className={styles.roteiro}>

                <h1 className='text-center' style={{color:'black'}} >Roteiros</h1>

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
                            <div className={styles.textoImagem}>
                                <h1 className={styles.textoRoteiro}>{item.nomeRoteiro}</h1>
                            </div>

                            </div>
                        </SwiperSlide>

                    ))}
                </Swiper>                       
            </div>

                    {
                        repositories.length > 0 ? (
                            <section className={styles.lista}>
                                {
                                    repositories.map((repo) =>(
                                        <Card 
                                            key={repo.id} 
                                            name={repo.nomeRoteiro} 
                                            description={repo.descricao}
                                            html_url={repo.urlImagem}
                                            identificador={repo.id}
                                        />
                                    ))
                                }
                            </section>
                        ) : (
                            <p></p>
                        )
                    }

            </section>
        );
    }


export default Roteiro;