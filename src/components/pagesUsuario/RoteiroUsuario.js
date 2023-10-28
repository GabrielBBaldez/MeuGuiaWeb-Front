import CardUsuario from '../Card/CardUsuario';
import { useState } from 'react';
import { useEffect } from 'react';


import styles from '../module/Roteiro.module.css';

function RoteiroUsuario() {

    const [repositories, setRepositories] = useState([])

    useEffect(()=>{
        const buscarRepositorios = async() => {
            const response = await fetch('http://localhost:8080/roteiro')

            const data = await response.json()
            setRepositories(data)
        }
        buscarRepositorios()
    }, [])

    

        return (
            <section className={styles.roteiro}>

                <h1 className='text-center' style={{color:'black'}} >Roteiros</h1>

                    {
                        repositories.length > 0 ? (
                            <section className={styles.lista}>
                                {
                                    repositories.map((repo) =>(
                                        <CardUsuario
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


export default RoteiroUsuario;