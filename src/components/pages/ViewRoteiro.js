import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';


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
    }, [id])

    const options = { year: 'numeric', month: 'numeric', day: 'numeric', timeZone:'UTC' };
    const formattedDateChegada = new Date(repositories.dataChegada).toLocaleDateString(undefined, options);
    const formattedDatePartida = new Date(repositories.dataPartida).toLocaleDateString(undefined, options);



    const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Adicione um ouvinte de evento de rolagem para mostrar ou ocultar o botão
    window.addEventListener('scroll', handleScroll);
    return () => {
      // Remova o ouvinte de evento ao desmontar o componente
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const navigate  = useNavigate();

  const handleEdicao = () => {
    navigate(`/roteiros/${id}/participar`);
};

        return (
            <div className={styles.container}>
                <form className='row g-3'>
                    <div className='col-12'>
                        <h1 className={styles.nomeRoteiro}>{repositories.nomeRoteiro}</h1>
                    </div>

                    <div className='col-12' style={{display:'flex', justifyContent:'center'}}>
                        <img src={repositories.urlImagem} alt='imagemRoteiro'></img>
                    </div>
                    <div className='col-12'>
                        <button className='btn btn-secondary' onClick={() => handleEdicao()} style={{marginTop:'10px'}}><i class="fa-solid fa-plane-departure"></i> Quero ir nesta viagem!</button>
                    </div>
                    <div className='col-12'>
                        <h3 className={styles.atracoes}>{repositories.atracoes}</h3>
                    </div>
                    <div className='col-12' style={{textAlign:'center', color:'red', paddingTop:'20px'}}>
                        <h4>{formattedDatePartida} a {formattedDateChegada}</h4>
                    </div>
                    <div className="col-12">
                        <p className={styles.descricao}><b>SOBRE O DESTINO:</b> {repositories.descricao}</p>
                    </div>

                    <div className="col-12">
                        <h5>PROGRAMAÇÃO DIA A DIA:</h5>

                            {repositories && repositories.programacaoList ? (
                            repositories.programacaoList.map(item => (
                                <div className='border' style={{padding:'10px',  marginBottom:'10px', wordWrap:'break-word', boxShadow:'0px 4px 6px rgba(0, 0, 0, 0.1)'}}>
                                    <h5 key={item.id}><b>Dia {item.sequencialDia} - {item.localDia}</b> </h5>
                                    <p className={styles.atividade}>{item.atividade}</p> 
                                </div>
                            ))
                            ) : (
                            <li>Nenhum dado disponível.</li>
                            )}

                    
                    </div>
                </form>
                <div>
                {showButton && (
                    <button id="back-to-top" className={styles.backToTop} onClick={scrollToTop}>
                    ↑
                    </button>
                )}
                </div>
            </div>
        );
    }


export default ViewRoteiro;
