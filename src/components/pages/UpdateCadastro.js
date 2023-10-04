import styles from '../module/UpdateCadastro.module.css'
import axios from 'axios';
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'

function UpdateCadastro(){
    const url = window.location.href;
    const segments = url.split('/');
    const id = segments[segments.length - 1];

    const [repositories, setRepositories] = useState([])
    const [formData, setFormData] = useState({
        meuObjeto: {
            dataPartida: '',
            dataChegada: '',
            nomeRoteiro: '',
            atracoes: '',
            descricao: '',
            urlImagem: '',
            listaDeDias: [],
          },
          novoDia: {
            sequencial_dia: 0,
            local_dia: '',
            atividade: '',
          },
        });

    useEffect(()=>{
        const buscarRepositorios = async() => {
            const response = await fetch(`http://localhost:8080/roteiro/${id}`)

            const data = await response.json()
            setRepositories(data)

            setFormData({
                meuObjeto: {
                  dataPartida: data.dataPartida,
                  dataChegada: data.dataChegada,
                  nomeRoteiro: data.nomeRoteiro,
                  atracoes: data.atracoes,
                  descricao: data.descricao,
                  urlImagem: data.urlImagem,
                  listaDeDias: data.programacaoList.map((item) => ({
                    sequencial_dia: item.sequencialDia,
                    local_dia: item.localDia,
                    atividade: item.atividade,
                  }))
                },
              });
        }
        buscarRepositorios()
    }, [id]);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          meuObjeto: {
            ...prevData.meuObjeto,
            [name]: value,
          },
          
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();

        const url = window.location.href;
        const segments = url.split('/');
        const id = segments[segments.length - 1];
    
        // Envie a solicitação PUT para atualizar os dados
        try {
            const response = await axios.put(`http://localhost:8080/roteiro/${id}`, formData);
            if (response.status === 200) {
              console.log('ok')
            } else {
                console.log('erro')
            }
          } catch (error) {
            // Lidar com erros de rede ou outros erros
          }
        };

        const handleDayChange = (e, index) => {
            const { name, value } = e.target;
            const updatedRepositories = [...repositories.programacaoList];
            updatedRepositories[index].localDia = value;
          
            setRepositories({
              ...repositories,
              programacaoList: updatedRepositories,
            });
          };
          
          const handleDescriptionChange = (e, index) => {
            const { name, value } = e.target;
            const updatedRepositories = [...repositories.programacaoList];
            updatedRepositories[index].atividade = value;
          
            setRepositories({
              ...repositories,
              programacaoList: updatedRepositories,
            });
          };
    
    return(
        <div className={styles.container}>
        <div className="border border-dark, col-12" style={{boxShadow:'0px 4px 6px rgba(0, 0, 0, 0.1)'}}>
        <h2 className='text-center' style={{paddingTop:'10px'}}>Cadastre um roteiro</h2>
        <form className='row g-3' onSubmit={handleSubmit}>
          <div className='col-md-6'>
            <label className='form-label'>Partida:</label>
            <input
              type='date'
              value={formData.meuObjeto.dataPartida}
              onChange={changeHandler}
              className='form-control'
              name='dataPartida'
              required
            />
          </div>

          <div className='col-md-6'>
            <label className='form-label'>Chegada:</label>
            <input
              type='date'
              value={formData.meuObjeto.dataChegada}
              onChange={changeHandler}
              className='form-control'
              name='dataChegada'
              required
            />
          </div>

          <div className='col-12' style={{paddingTop:'15px'}}>
            <label className='form-label'>Nome do roteiro:</label>
            <input
              type='text'
              value={formData.meuObjeto.nomeRoteiro}
              onChange={changeHandler}
              className='form-control'
              name='nomeRoteiro'
              required
            />
          </div>

          <div className='col-12' style={{paddingTop:'15px'}}>
            <label className='form-label'>Principais atrações:</label>
            <textarea
              className='form-control'
              value={formData.meuObjeto.atracoes}
              onChange={changeHandler}
              aria-label='With textarea'
              name='atracoes'
              required
            ></textarea>
          </div>

          <div className='col-12' style={{paddingTop:'15px'}}>
            <label className='form-label'>Descrição:</label>
            <textarea
              className='form-control'
              value={formData.meuObjeto.descricao}
              onChange={changeHandler}
              aria-label='With textarea'
              name='descricao'
              required
            ></textarea>
          </div>

          <div className='col-12' style={{paddingTop:'15px'}}>
            <label className='form-label'>Insira uma imagem do local:</label>
            <input
              type='text'
              value={formData.meuObjeto.urlImagem}
              onChange={changeHandler}
              className='form-control'
              name='urlImagem'
              required
            />
          </div>

          {repositories && repositories.programacaoList ? (
                repositories.programacaoList.map((item, index) => (
                    <div key={item.id} className='col-12'>
                    <div style={{ paddingBottom: '20px', paddingTop: '15px' }}>
                        <label className='form-label'>Dia: {item.sequencialDia}</label>
                        <input
                        type='text'
                        value={item.localDia}
                        onChange={(e) => handleDayChange(e, index)} // Novo manipulador de eventos
                        className='form-control'
                        name={`local_dia_${index}`} // Nome exclusivo com base no índice
                        />
                    </div>

                    <div>
                        <label className='form-label'>Descrição dos locais:</label>
                        <textarea
                        className='form-control'
                        value={item.atividade}
                        onChange={(e) => handleDescriptionChange(e, index)} // Novo manipulador de eventos
                        aria-label='With textarea'
                        name={`atividade_${index}`} // Nome exclusivo com base no índice
                        ></textarea>
                    </div>
                    </div>
                ))
                ) : (
                <li>Nenhum dado disponível.</li>
                )}     

          </form>
        
          <div style={{textAlign:'center'}}>
            <button type="submit" className="btn btn-success" style={{marginTop:'15px', marginBottom:'15px'}}><i className="fa-solid fa-check"></i> Enviar para API</button>
         </div>

          </div>
          </div>
    )
}

export default UpdateCadastro