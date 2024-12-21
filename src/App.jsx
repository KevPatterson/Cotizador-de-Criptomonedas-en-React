import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import ImagenCripto from './img/pngwing.com (1).png'; // Imagen principal
import ImagenAdicional1 from './img/adicional1.png'; // Nueva imagen 1
import Formulario from './components/Formulario';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 90%;
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Dos columnas */
  column-gap: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr; /* Cambia a una sola columna en pantallas pequeñas */
  }
`;

const ContenedorImagenes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px; /* Espaciado entre la imagen principal y las adicionales */
  margin-top: 20px; /* Espaciado superior del contenedor */
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 20px auto; /* Espaciado entre imágenes */
  display: block;
`;

const SubContenedorImagenes = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px; /* Espaciado horizontal entre las imágenes */
`;

const ImagenAdicional = styled.img`
  max-width: 400px; /* Tamaño máximo para las imágenes adicionales */
  width: auto;
  height: auto;
  display: block;
`;

const Heading = styled.h1`
  font-family: 'Kalnia Glaze', serif;
  text-align: center;
  font-weight: 500;
  font-optical-sizing: auto;
  font-style: normal;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 38px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #3d3e80;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

function App() {
  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const cotizarCripto = async () => {
        setCargando(true);
        setResultado({});

        const { moneda, criptomoneda } = monedas;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setResultado(resultado.DISPLAY[criptomoneda][moneda]);
        setCargando(false);
      };
      cotizarCripto();
    }
  }, [monedas]);

  return (
    <Contenedor>
      {/* Columna izquierda */}
      <ContenedorImagenes>
        {/* Imagen principal */}
        <Imagen src={ImagenCripto} alt="Bitcoin" />

        {/* Imágenes adicionales */}
        <SubContenedorImagenes>
          <ImagenAdicional src={ImagenAdicional1} alt="Imagen adicional 1" />
        </SubContenedorImagenes>
      </ContenedorImagenes>

      {/* Columna derecha */}
      <div>
        <Heading>Cotiza tus Criptomonedas en Tiempo real</Heading>
        <Formulario setMonedas={setMonedas} />
        {cargando && <Spinner />}
        {resultado.PRICE && <Resultado resultado={resultado} />}
      </div>
    </Contenedor>
  );
}

export default App;
