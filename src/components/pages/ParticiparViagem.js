import React, { Component } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styles from '../module/ParticiparViagem.module.css';

function ParticiparViagem(){
    const url = window.location.href;
    const id = url.split('/').slice(-2)[0];

    const [repositories, setRepositories] = useState([])

    useEffect(()=>{
        const buscarRepositorios = async() => {
            const response = await fetch(`http://localhost:8080/roteiro/${id}`)

            const data = await response.json()
            setRepositories(data)

            const sequenciaisDia = data.programacaoList.map(item => item.sequencialDia);
        }
        buscarRepositorios()
    }, [id])

    const options = { year: 'numeric', month: 'numeric', day: 'numeric', timeZone:'UTC' };
    const formattedDateChegada = new Date(repositories.dataChegada).toLocaleDateString(undefined, options);
    const formattedDatePartida = new Date(repositories.dataPartida).toLocaleDateString(undefined, options);

    return(
        <div className={styles.container}>
                <div>
                    <h1 className={styles.nomeRoteiro}>{repositories.nomeRoteiro}</h1>
                </div>

                <div className='col-12' style={{textAlign:'center', color:'red', paddingTop:'20px', paddingBottom:'20px'}}>
                    <h4>{formattedDatePartida} a {formattedDateChegada}</h4>
                </div>

                <form className='row g-3 border' style={{paddingTop:'20px'}}>
                <div className='col-md-6'>
                    <label className='form-label'>Nome:</label>
                    <input
                        type='text'
                        className='form-control'
                        name='name'
                        required
                        />
                    </div>

                    <div className='col-md-6'>
                        <label className='form-label'>Profissão:</label>
                        <input
                        type='text'
                        className='form-control'
                        name='profissao'
                        required
                        />
                    </div>

                    <div className='col-6' style={{paddingTop:'15px'}}>
                        <label className='form-label'>Telefone:</label>
                        <input
                        type='text'
                        placeholder="(XX) XXXX-XXXX"
                        className='form-control'
                        name='telefone'
                        required
                        />
                    </div>

                    <div className='col-6' style={{paddingTop:'15px'}}>
                        <label className='form-label'>Email:</label>
                        <input
                        type='email'
                        className='form-control'
                        name='email'
                        required
                        />
                    </div>

                    <div className='col-6' style={{paddingTop:'15px'}}>
                        <label className='form-label'>Cidade:</label>
                        <input
                        type='text'
                        className='form-control'
                        name='cidade'
                        required
                        />
                    </div>

                    <div className='col-6' style={{paddingTop:'15px'}}>
                        <label className='form-label'>Estado:</label>
                        <input
                        type='text'
                        className='form-control'
                        name='estado'
                        required
                        />
                    </div>



                    <div className='col-12' style={{paddingTop:'15px'}}>
                        <label className='form-label'>Observações:</label>
                        <textarea
                        className='form-control'
                        aria-label='With textarea'
                        name='observacoes'
                        ></textarea>
                    </div>

                    <div className={styles.submit}>
                        <button className="btn btn-success"><i className="fa-solid fa-check"></i> Enviar para API</button>
                    </div>
                </form>

        </div>
    )
}

export default ParticiparViagem;