import { useState } from 'react';
import { useEffect } from 'react';


import styles from '../module/ViewRoteiro.module.css';

function ViewRoteiro() {

    const url = window.location.href;
    const segments = url.split('/');
    const id = segments[segments.length - 1];

    const [repositories, setRepositories] = useState([])

    useEffect(()=>{
        const buscarRepositorios = async() => {
            const response = await fetch(`http://localhost:8080/roteiro/${id}`)

            const data = await response.json()
            setRepositories(data)

            const sequenciaisDia = data.programacaoList.map(item => item.sequencialDia);
        }
        buscarRepositorios()
    }, [])

    

        return (
            <div className={styles.container}>
                <form className='row g-3'>
                    <div className='col-12'>
                        <h1 className={styles.nomeRoteiro}>{repositories.nomeRoteiro}</h1>
                    </div>

                    <div className='col-12' style={{display:'flex', justifyContent:'center'}}>
                        <img src={repositories.urlImagem}></img>
                    </div>
                    <div className='col-12'>
                        <h3 className={styles.atracoes}>{repositories.atracoes}</h3>
                    </div>
                    <div className='col-12' style={{textAlign:'center', color:'red'}}>
                        <h4>{repositories.dataPartida} a {repositories.dataChegada}</h4>
                    </div>
                    <div className="col-12">
                        <p className={styles.descricao}><b>Sobre o destino:</b> {repositories.descricao}</p>
                    </div>

                    <div className="col-12">
                        <h5>Programação dia a dia:</h5>

                            {repositories && repositories.programacaoList ? (
                            repositories.programacaoList.map(item => (
                                <h5 key={item.id}><b>Dia {item.sequencialDia} - {item.localDia}:</b> {item.atividade} </h5>
                
                            ))
                            ) : (
                            <li>Nenhum dado disponível.</li>
                            )}

                    
                    </div>
                </form>
            </div>
        );
    }


export default ViewRoteiro;
