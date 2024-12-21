import styled from '@emotion/styled'

const Contenedor = styled.div`
    background-color: #252655;
    font-family: 'Poppins', sans-serif;
    color: white;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 30px;
`
const Imagen = styled.img`
    max-width: 400px;
    width: 120px;
    display: block;
`

const Texto = styled.p`
    font-size: 18px;
    span {
        font-size: 18px;
        font-weight: 500;
    }
    margin-bottom: 10px;
`
const Precio = styled.p`
    font-size: 24px;
    span {
        font-size: 18px;
        font-weight: 500;
    }
    margin-bottom: 10px;
`

const Resultado = ({ resultado }) => {
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = resultado;

    return (
        <Contenedor>
            <Imagen src={`https://www.cryptocompare.com/${IMAGEURL}`} alt="Imagen Cripto" />
            <div>
                <Precio>El precio actual es: {PRICE}</Precio>
                <Texto>Última actualización: {LASTUPDATE}</Texto>
                <Texto>Precio más alto del día: {HIGHDAY}</Texto>
                <Texto>Precio más bajo del día: {LOWDAY}</Texto>
                <Texto>Variación en las últimas 24 horas: {CHANGEPCT24HOUR}%</Texto>
            </div>
        </Contenedor>
    );
};

export default Resultado;