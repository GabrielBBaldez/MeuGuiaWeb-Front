import React, { Component } from 'react';
import styles from '../module/UpdateCadastro.module.css';
import axios from 'axios';

class UpdateCadastro extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

    };
  }

  componentDidMount() {
    const url = window.location.href;
    const segments = url.split('/');
    const id = segments[segments.length - 1];

    this.buscarRepositorios(id);
  }

  async buscarRepositorios(id) {
    try {
      const response = await fetch(`http://localhost:8080/roteiro/${id}`);
      const data = await response.json();

      this.setState({
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
            })),
          },
      });
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  }

  changeHandler = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      meuObjeto: {
        ...prevState.meuObjeto,
        [name]: value,
      },
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
  
    const url = window.location.href;
    const segments = url.split('/');
    const id = segments[segments.length - 1];
  
    // Use this.state.meuObjeto em vez de this.state.formData
    const meuObjetoJSON = JSON.stringify(this.state.meuObjeto);

    console.log(meuObjetoJSON);
  
    // Envie a solicitação PUT para atualizar os dados
    const headers = {
      'Content-Type': 'application/json',
    };
  
      axios
        .put(`http://localhost:8080/roteiro/${id}`, meuObjetoJSON, { headers })
        .then((response) => {
          console.log('PUT request bem-sucedido:', response);
          window.history.back();
        })
        .catch((error) => {
          console.error('Erro ao enviar o PUT request:', error);
        });
    };

    handleDayChange = (e, index) => {
      const { name, value } = e.target;
      const updatedListaDeDias = [...this.state.meuObjeto.listaDeDias];
    
      // Atualize o objeto na lista de dias com base no índice
      updatedListaDeDias[index] = {
        ...updatedListaDeDias[index],
        local_dia: value,
      };
    
      this.setState((prevState) => ({
        meuObjeto: {
          ...prevState.meuObjeto,
          listaDeDias: updatedListaDeDias,
        },
      }));
    };

    handleDescriptionChange = (e, index) => {
      const { name, value } = e.target;
      const updatedListaDeDias = [...this.state.meuObjeto.listaDeDias];
    
      // Atualize o objeto na lista de dias com base no índice
      updatedListaDeDias[index] = {
        ...updatedListaDeDias[index],
        atividade: value,
      };
    
      this.setState((prevState) => ({
        meuObjeto: {
          ...prevState.meuObjeto,
          listaDeDias: updatedListaDeDias,
        },
      }));
    };


  render() {

    return(
        <div className={styles.container}>
        <div className="border border-dark, col-12" style={{boxShadow:'0px 4px 6px rgba(0, 0, 0, 0.1)'}}>
        <h2 className='text-center' style={{paddingTop:'10px'}}>Atualize um roteiro</h2>
        <form className='row g-3' onSubmit={this.handleSubmit}>
          <div className='col-md-6'>
            <label className='form-label'>Partida:</label>
            <input
              type='date'
              value={this.state.meuObjeto.dataPartida}
              onChange={this.changeHandler}
              className='form-control'
              name='dataPartida'
              required
            />
          </div>

          <div className='col-md-6'>
            <label className='form-label'>Chegada:</label>
            <input
              type='date'
              value={this.state.meuObjeto.dataChegada}
              onChange={this.changeHandler}
              className='form-control'
              name='dataChegada'
              required
            />
          </div>

          <div className='col-12' style={{paddingTop:'15px'}}>
            <label className='form-label'>Nome do roteiro:</label>
            <input
              type='text'
              value={this.state.meuObjeto.nomeRoteiro}
              onChange={this.changeHandler}
              className='form-control'
              name='nomeRoteiro'
              required
            />
          </div>

          <div className='col-12' style={{paddingTop:'15px'}}>
            <label className='form-label'>Principais atrações:</label>
            <textarea
              className='form-control'
              value={this.state.meuObjeto.atracoes}
              onChange={this.changeHandler}
              aria-label='With textarea'
              name='atracoes'
              required
            ></textarea>
          </div>

          <div className='col-12' style={{paddingTop:'15px'}}>
            <label className='form-label'>Descrição:</label>
            <textarea
              className='form-control'
              value={this.state.meuObjeto.descricao}
              onChange={this.changeHandler}
              aria-label='With textarea'
              name='descricao'
              required
            ></textarea>
          </div>

          <div className='col-12' style={{paddingTop:'15px'}}>
            <label className='form-label'>Insira uma imagem do local:</label>
            <input
              type='text'
              value={this.state.meuObjeto.urlImagem}
              onChange={this.changeHandler}
              className='form-control'
              name='urlImagem'
              required
            />
          </div>

          {this.state.meuObjeto.listaDeDias.length > 0 ? (
            this.state.meuObjeto.listaDeDias.map((item, index) => (
            <div key={index} className='col-12'>
              <div style={{ paddingBottom: '20px', paddingTop: '15px' }}>
                <label className='form-label'>Dia: {item.sequencial_dia}</label>
                <input
                  type='text'
                  value={item.local_dia}
                  onChange={(e) => this.handleDayChange(e, index)}
                  className='form-control'
                  name={`local_dia_${index}`}
        />
                    </div>

                    <div>
                        <label className='form-label'>Descrição dos locais:</label>
                        <textarea
                        className='form-control'
                        value={item.atividade}
                        onChange={(e) => this.handleDescriptionChange(e, index)} // Novo manipulador de eventos
                        aria-label='With textarea'
                        name={`atividade_${index}`} // Nome exclusivo com base no índice
                        ></textarea>
                    </div>
                    </div>
                ))
                ) : (
                <li>Nenhum dado disponível.</li>
                )}     
          <div className={styles.botao}>
            <button type="submit" className="btn btn-success" style={{marginTop:'15px', marginBottom:'15px'}} ><i className="fa-solid fa-check"></i> Enviar</button>
         </div>
          </form>
        

          </div>
          </div>
    )
}
}
export default UpdateCadastro
