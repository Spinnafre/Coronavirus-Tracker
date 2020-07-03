import React, { useEffect, useState } from 'react'
import style from './CountryPicker.module.css'
import { NativeSelect, FormControl } from '@material-ui/core'
import { DadosPorPaises } from '../../api'
export const CountryPicker = ({ PegarPaisSelecionado }) => {
    const [pais, setPais] = useState([])

    useEffect(() => {
        const MostrarPaises = async () => {
            const ListaPaises = await DadosPorPaises()
            setPais(ListaPaises)
        }
        MostrarPaises()
        console.log(pais)
    }, [setPais])
    return (
        <div>
            <FormControl className={style.FormControl}>
                <NativeSelect defaultValue='' onChange={(e) => PegarPaisSelecionado(e.target.value)}>
                    <option value=''>Global</option>
                    {pais.map((nome, indice) => <option key={indice} value={nome}>{nome} </option>)}
                </NativeSelect>
            </FormControl>
        </div>
    )
}