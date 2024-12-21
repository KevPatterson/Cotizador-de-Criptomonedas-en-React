import { useState } from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
    display: block;
    font-family: 'Kalnia Glaze', serif;
    color: white;
    font-size: 24px;
    font-weight: 500;
    margin: 15px 0;
`;
const Select = styled.select`
    background-color: #252655;
    border: none;
    width: 100%;
    padding: 14px;
    font-weight: 700;
    color: white;
    text-transform: uppercase;
    font-size: 18px;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
    margin-bottom: 20px;

    &:hover {
        background-color: #1d1e42;
        cursor: pointer;
    }
    &:focus {
        outline: none;
    }
`;

const useSelectMonedas = (label, opciones) => {
    const [state, setState] = useState('');

    const SelectMonedas = () => (
        <>
            <Label>{label}</Label>
            <Select value={state} onChange={(e) => setState(e.target.value)}>
                <option value="">Seleccione</option>
                {opciones.map((opcion) => (
                    <option key={opcion.id} value={opcion.id}>
                        {opcion.nombre}
                    </option>
                ))}
            </Select>
        </>
    );
    return [state, SelectMonedas];
};

export default useSelectMonedas;
