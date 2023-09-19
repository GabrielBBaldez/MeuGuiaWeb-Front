import React, { Component } from 'react';
import axios from 'axios';
import styles from './CadastraRoteiro.module.css';

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
      })
      .catch((error) => {
        console.error('Erro ao enviar o POST request:', error);
      });
  };

  render() {
    const { meuObjeto, novoDia, objetoEmEdicaoIndex } = this.state;

    return (
      <div className={styles.container}>
        <h2 className='text-center'>Cadastre um roteiro</h2>
        <form className='row g-3'>
          <div className='col-md-6'>
            <label className='form-label'>Partida:</label>
            <input
              type='date'
              value={meuObjeto.dataPartida}
              onChange={this.changeHandler}
              className='form-control'
              name='dataPartida'
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
            />
          </div>

          <div className='col-12'>
            <label className='form-label'>Nome do roteiro:</label>
            <input
              type='text'
              value={meuObjeto.nomeRoteiro}
              onChange={this.changeHandler}
              className='form-control'
              name='nomeRoteiro'
            />
          </div>

          <div className='col-12'>
            <label className='form-label'>Principais atrações:</label>
            <textarea
              className='form-control'
              value={meuObjeto.atracoes}
              onChange={this.changeHandler}
              aria-label='With textarea'
              name='atracoes'
            ></textarea>
          </div>

          <div className='col-12'>
            <label className='form-label'>Descrição:</label>
            <textarea
              className='form-control'
              value={meuObjeto.descricao}
              onChange={this.changeHandler}
              aria-label='With textarea'
              name='descricao'
            ></textarea>
          </div>

          <div className='col-12'>
            <label className='form-label'>Insira uma imagem do local:</label>
            <input
              type='text'
              value={meuObjeto.urlImagem}
              onChange={this.changeHandler}
              className='form-control'
              name='urlImagem'
            />
          </div>

          <div className='col-md-8'>
            <label className='form-label'>Locais que serão visitados:</label>
            <input
              type='text'
              value={novoDia.local_dia}
              onChange={this.handleChange}
              className='form-control'
              name='local_dia'
            />
          </div>

          <div className='col-md-10'>
            <label className='form-label'>Descrição dos locais:</label>
            <textarea
              className='form-control'
              value={novoDia.atividade}
              onChange={this.handleChange}
              aria-label='With textarea'
              name='atividade'
            ></textarea>
          </div>

          <div>
            <button onClick={this.adicionarDia}>
              {objetoEmEdicaoIndex !== -1 ? 'Editar Dia' : 'Adicionar Dia'}
            </button>
          </div>

          <div>
            <button onClick={this.enviarObjetoParaAPI}>
              Enviar para API
            </button>
          </div>

          <div>
            <h2>Lista de Dias:</h2>
            <ul>
              {meuObjeto.listaDeDias.map((dia, index) => (
                <li key={dia.sequencial_dia}>
                  {`Dia ${dia.sequencial_dia}: Local: ${dia.local_dia}, Descrição: ${dia.atividade}`}
                  <button onClick={() => this.editarDia(index)}>Editar</button>
                  <button onClick={() => this.excluirDia(index)}>Excluir</button>
                </li>
              ))}
            </ul>
          </div>
        </form>
      </div>
    );
  }
}

export default MeuComponente;
