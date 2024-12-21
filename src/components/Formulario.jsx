import styled from '@emotion/styled';
import useSelectMonedas from '../hooks/useSelectMonedas';
import { monedas } from '../data/monedas';
import { useState, useEffect } from 'react';
import Error from './Error';
import Spinner from './Spinner';

const InputSubmit = styled.input`
    background-color: #252655;
    border: none;
    width: 100%;
    padding: 10px;
    font-weight: 700;
    color: white;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;

    &:hover {
        background-color: #1d1e42;
        cursor: pointer;
    }
`;

const Formulario = ({ setMonedas }) => {
    const [cripto, setCripto] = useState([]);
    const [error, setError] = useState(false);
    const [moneda, SelectMonedas] = useSelectMonedas('Seleccione su Moneda', monedas);
    const [criptomoneda, SelectCriptomonedas] = useSelectMonedas('Seleccione su Criptomoneda', cripto);

    useEffect(() => {
        const consultarAPI = async () => {
            try {
                const respuesta = await fetch(
                    'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
                );
                const resultado = await respuesta.json();

                if (resultado.Data) {
                    const arrayCriptos = resultado.Data.map((cripto) => ({
                        id: cripto.CoinInfo.Name,
                        nombre: cripto.CoinInfo.FullName,
                    }));
                    setCripto(arrayCriptos);
                } else {
                    console.error('No se encontraron datos de criptomonedas.');
                }
            } catch (error) {
                console.error('Error al consultar la API:', error);
            }
        };

        consultarAPI();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if ([moneda, criptomoneda].includes('')) {
            setError(true);
            return;
        }
        setError(false);
        setMonedas({ moneda, criptomoneda });
    };

    return (
        <>
            {error && <Error>Todos los campos son obligatorios</Error>}

            <form onSubmit={handleSubmit}>
                <SelectMonedas />
                {/* Renderizar SelectCriptomonedas solo si hay criptomonedas */}
                {cripto.length > 0 ? <SelectCriptomonedas /> : <Spinner />}
                <InputSubmit type="submit" value="Cotizar" />
            </form>
        </>
    );
};

export default Formulario;
