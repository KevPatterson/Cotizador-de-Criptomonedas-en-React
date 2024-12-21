import { useEffect, useState } from 'react'
import styled from '@emotion/styled'

const Texto = styled.div`
    background-color: #692c2c;
    color: #FFFFFF !important; 
    padding: 15px;
    font-size: 22px;
    text-transform: uppercase;
    font-weight: 500;
    text-align: center;
    border-radius: 10px;
    margin-bottom: 20px;
`

const Error = ({children}) => {
    return (
        <Texto role="alert" aria-live="assertive">{children}</Texto>
    )
}

export default Error