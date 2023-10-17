import React, { Component } from 'react';
import axios from 'axios';
import styles from '../module/CadastraRoteiro.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class MeuComponente extends Component {
  constructor() {
    super();
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
      objetoEmEdicaoIndex: -1,
    };
  }

  adicionarDia = (e) => {
    e.preventDefault(); // Evita a recarga da página
    const { meuObjeto, novoDia, objetoEmEdicaoIndex } = this.state;
    const sequencial_dia =
      objetoEmEdicaoIndex !== -1
        ? novoDia.sequencial_dia
        : meuObjeto.listaDeDias.length + 1;

    const novoObjetoDeProgramacao = {
      sequencial_dia,
      local_dia: novoDia.local_dia,
      atividade: novoDia.atividade
    };

    let novaListaDeDias;

    if (objetoEmEdicaoIndex !== -1) {
      // Se estamos editando, substitua o dia na lista
      novaListaDeDias = [...meuObjeto.listaDeDias];
      novaListaDeDias[objetoEmEdicaoIndex] = novoObjetoDeProgramacao;
    } else {
      // Se não estamos editindo, adicione um novo dia à lista
      novaListaDeDias = [...meuObjeto.listaDeDias, novoObjetoDeProgramacao];
    }

    this.setState({
      meuObjeto: {
        ...meuObjeto,
        listaDeDias: novaListaDeDias,
      },
      novoDia: {
        sequencial_dia: 0,
        local_dia: '',
        atividade: '',
      },
      objetoEmEdicaoIndex: -1, // Limpa o índice de edição
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      novoDia: {
        ...prevState.novoDia,
        [name]: value,
      },
    }));
  };

  editarDia = (index) => {
    const { meuObjeto } = this.state;
    const diaEmEdicao = meuObjeto.listaDeDias[index];
    this.setState({
      objetoEmEdicaoIndex: index,
      novoDia: { ...diaEmEdicao },
    });
  };

  excluirDia = (index) => {
    const { meuObjeto } = this.state;
    const novaListaDeDias = meuObjeto.listaDeDias.filter((_, i) => i !== index);
    this.setState({
      meuObjeto: {
        ...meuObjeto,
        listaDeDias: novaListaDeDias,
      },
      objetoEmEdicaoIndex: -1, // Limpa o índice de edição
    });
  };

  excluirTodosDias = (e) => {
    e.preventDefault();
    this.setState({
      meuObjeto: {
        ...this.state.meuObjeto,
        listaDeDias: [], // Define uma lista vazia para excluir todos os dias
      },
      objetoEmEdicaoIndex: -1, // Limpa o índice de edição
    });
  };

  changeHandler = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      meuObjeto: {
        ...prevState.meuObjeto,
        [name]: value,
      },
    }));
  };


  enviarObjetoParaAPI = (e) => {
    e.preventDefault();

    let { meuObjeto } = this.state;
    meuObjeto = JSON.stringify(meuObjeto);
   console.log(meuObjeto);

   const headers = {
    'Content-Type': 'application/json',
  };

    axios
      .post('http://localhost:8080/roteiro', meuObjeto, { headers })
      .then((response) => {
        console.log('POST request bem-sucedido:', response);
        toast.success('Roteiro cadastrado com sucesso!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });

        setTimeout(() => {
          window.location.reload();
        }, 1500);

      })
      .catch((error) => {
        console.error('Erro ao enviar o POST request:', error);
        toast.error('Ocorreu um erro ao tentar fazer o cadastro!', {
          position: 'top-right', // Posição da notificação
          autoClose: 3000,      // Duração em milissegundos
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      });
  };

  render() {
    const { meuObjeto, novoDia, objetoEmEdicaoIndex } = this.state;

    return (
      <div className={styles.container}>
        <div className="border border-dark, col-12" style={{boxShadow:'0px 4px 6px rgba(0, 0, 0, 0.1)'}}>
        <h2 className='text-center' style={{paddingTop:'10px'}}>Cadastre um roteiro</h2>
        <form className='row g-3'>
          <div className='col-md-6'>
            <label className='form-label'>Partida:</label>
            <input
              type='date'
              value={meuObjeto.dataPartida}
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
              value={meuObjeto.dataChegada}
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
              value={meuObjeto.nomeRoteiro}
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
              value={meuObjeto.atracoes}
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
              value={meuObjeto.descricao}
              onChange={this.changeHandler}
              aria-label='With textarea'
              name='descricao'
              required
            ></textarea>
          </div>

          <div className='col-12' style={{paddingBottom: '20px', paddingTop:'15px'}}>
            <label className='form-label'>Insira uma imagem do local:</label>
            <input
              type='text'
              value={meuObjeto.urlImagem}
              onChange={this.changeHandler}
              className='form-control'
              name='urlImagem'
              required
            />
          </div>

          <div className='col-md-12'>
            <label className='form-label'>Locais que serão visitados:</label>
            <input
              type='text'
              value={novoDia.local_dia}
              onChange={this.handleChange}
              className='form-control'
              name='local_dia'
            />
          </div>

          <div className='col-md-12'>
            <label className='form-label'>Descrição dos locais:</label>
            <textarea
              className='form-control'
              value={novoDia.atividade}
              onChange={this.handleChange}
              aria-label='With textarea'
              name='atividade'
            ></textarea>
          </div>

          <div className={styles.estiloBotao}>
            <div className={styles.adicionaDia}>
                <button className="btn btn-primary" onClick={this.adicionarDia}>
                <i className="fa-solid fa-plus"></i>{objetoEmEdicaoIndex !== -1 ? ' Editar Dia' : ' Adicionar Dia'}
                </button>
            </div>
            <div>
                <button className="btn btn-warning" onClick={this.excluirTodosDias}><i className="fa-solid fa-eraser"></i> Limpar Campos</button>
            </div>
            <div>
                <button className="btn btn-success" onClick={this.enviarObjetoParaAPI}><i className="fa-solid fa-check"></i> Enviar para API</button>
              </div>
          </div>
          </form>
          </div>

          <div className='col-md-12'>
            <h2 className='text-center' style={{paddingTop:'20px'}}>Lista de Dias:</h2>

              {meuObjeto.listaDeDias.map((dia, index) => (
                  <div className={styles.card} key={dia.sequencial_dia} style={{paddingBottom:'10px'}}>
                    <div className='border' style={{width: '570px', paddingLeft: '10px', boxShadow:'0px 4px 6px rgba(0, 0, 0, 0.1)',  overflow: 'hidden', textOverflow: 'ellipsis', paddingRight:'10px'}}>
                      <h5>{`Dia ${dia.sequencial_dia}:`}</h5> 
                      <h6>{`Local: ${dia.local_dia}`}</h6>
                      <p>{`Descrição: ${dia.atividade}`}</p>  
                      <div className={styles.botoes}>    
                        <button className='btn btn-secondary' onClick={() => this.editarDia(index)}><i className="fa-solid fa-pen-to-square"></i> Editar</button>
                        <div style={{paddingLeft:'10px'}}>
                        <button className='btn btn-danger' onClick={() => this.excluirDia(index)}><i className="fa-solid fa-trash"></i> Excluir</button>
                        </div>
                      </div>
                    </div>
                  </div>

              ))}

          </div>
          <ToastContainer /> 
      </div>
    );
  }
}

export default MeuComponente;
