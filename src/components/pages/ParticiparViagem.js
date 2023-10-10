import React, { Component } from 'react';
import { useState } from 'react';
import { useEffect, useRef  } from 'react';
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


    const [cliente, setCliente] = useState({
        nome: '',
        profissao: '',
        telefone: '',
        email:'',
        cidade: '',
        estado: '',
        observacoes: '',
      });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente({ ...cliente, [name]: value });
      };

      const [nomeRoteiroAdicionado, setNomeRoteiroAdicionado] = useState(false);

      const handleChangeObservacao = (e) => {
        const { name, value } = e.target;
      
        // Verifique se o nome do roteiro já foi adicionado
        if (!nomeRoteiroAdicionado) {
          // Adicione o nome do roteiro e marque como adicionado
          const observacoesComNomeRoteiro = `${repositories.nomeRoteiro}: ${value}`;
          setNomeRoteiroAdicionado(true);
          setCliente({ ...cliente, [name]: observacoesComNomeRoteiro });
        } else {
          setCliente({ ...cliente, [name]: value });
        }
      };

      const handleSubmit = async () => {

        try {
          const response = await fetch('http://localhost:8080/cliente', {
            method: 'POST', // ou 'PUT' se for uma atualização
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(cliente),
          });
    
          if (response.ok) {
            console.log("Enviado")
          } else {
            console.log("Erro")
          }
        } catch (error) {
          console.error('Erro ao enviar os dados do cliente:', error);
        }
      };



    return(
        <div className={styles.container}>
            <div>
                <h1 className={styles.nomeRoteiro}>{repositories.nomeRoteiro}</h1>
            </div>

            <div className='col-12' style={{textAlign:'center', color:'red', paddingTop:'20px', paddingBottom:'20px'}}>
                <h4>{formattedDatePartida} a {formattedDateChegada}</h4>
            </div>

            <form className='row g-3 border' style={{paddingTop:'20px'}} onSubmit={handleSubmit}>


                <div className='col-md-6'>
                    <label className='form-label'>Nome:</label>
                    <input
                        type='text'
                        className='form-control'
                        name='nome'
                        value={cliente.nome}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='col-md-6'>
                    <label className='form-label'>Profissão:</label>
                    <input
                        type='text'
                        className='form-control'
                        name='profissao'
                        value={cliente.profissao}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='col-6' style={{paddingTop:'15px'}}>
                    <label className='form-label'>Telefone:</label>
                    <input
                        type='text'
                        placeholder="XX XXXXXXXXX"
                        className='form-control'
                        name='telefone'
                        value={cliente.telefone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='col-6' style={{paddingTop:'15px'}}>
                    <label className='form-label'>Email:</label>
                    <input
                        type='email'
                        className='form-control'
                        name='email'
                        value={cliente.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='col-6' style={{paddingTop:'15px'}}>
                    <label className='form-label'>Cidade:</label>
                    <input
                        type='text'
                        className='form-control'
                        name='cidade'
                        value={cliente.cidade}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='col-6' style={{paddingTop:'15px'}}>
                    <label className='form-label'>Estado:</label>
                    <input
                        type='text'
                        className='form-control'
                        name='estado'
                        value={cliente.estado}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='col-12' style={{paddingTop:'15px'}}>
                    <label className='form-label'>Observações:</label>
                    <textarea
                        className='form-control'
                        aria-label='With textarea'
                        name='observacoes'
                        value={cliente.observacoes}
                        onChange={handleChangeObservacao}
                    ></textarea>
                </div>

                <div className={styles.submit}>
                    <button type="submit" className="btn btn-success"><i className="fa-solid fa-check"></i> Enviar para API</button>
                </div>
            </form>

        </div>
    )
}

export default ParticiparViagem;