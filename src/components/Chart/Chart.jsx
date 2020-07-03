import React, { useEffect, useState } from 'react'
import style from './Chart.module.css'
import { Line, Bar } from 'react-chartjs-2'
import { PegarDadosDiarios } from '../../api'



export const Chart = ({ date: { confirmed, recovered, deaths }, pais }) => {
    /* Note que dadosDiarios vai ser um array pois devido ao map usado na Api
        irá ser retornado dadosModificados em formato de array.
    */
    const [dadosDiarios, setDadosDiarios] = useState([])

    /* Toda vez que ouver atualização do componente, remoção, criação do componente irá
    atualizar os dadosDiarios pegados da API. 
    */
    useEffect(() => {
        const armazenarDadosAtualizados = async () => {
            const dadosAtualizados = await PegarDadosDiarios()
            setDadosDiarios(dadosAtualizados)
        }
        armazenarDadosAtualizados()
    }, [])


    const GraficoLinha = (
        dadosDiarios.length ? (
            <Line
                data={{

                    // Está pegando as datas e adicionando nos labels do gráfico, mostrando as datas no linha do gráfico.
                    labels: dadosDiarios.map(({ date }) => date),
                    datasets: [
                        {
                            data: dadosDiarios.map(({ confirmed }) => confirmed),
                            label: 'Infectados',
                            borderColor: '#3333ff',
                            backgroundColor: 'rgba(51, 51, 255,0.1)',
                            fill: true
                        },
                        {
                            data: dadosDiarios.map(({ deaths }) => deaths),
                            label: 'Mortos',
                            borderColor: 'red',
                            backgroundColor: 'rgba(255,0,0,0.5)',
                            fill: true
                        }
                    ]
                }} />) : null
    )

    const GraficoBarra = (
        confirmed ?
            <Bar
                data={{
                    // labels: ['Infectados', 'Recuperados', 'Mortos'],
                    datasets: [{
                        label: 'Comfirmados',
                        backgroundColor: [
                            'rgba(0,0,255,0.5)'],
                        data: [confirmed.value]
                    },
                    {
                        label: 'Recuperados',
                        backgroundColor: [
                            'rgba(0,255,0,0.5)'],
                        data: [ recovered.value]
                    },
                    {
                        label: 'Mortos',
                        backgroundColor: ['rgba(255,0,0,0.5)'],
                        data: [ deaths.value]
                    },
                    ]
                }}
                option={{
                    legend: { display: false },

                    title: { display: true, text: `Estado Atual ${pais}` }
                }} /> : null
    )

    return (
        <div className={style.container}>
            {pais ? GraficoBarra : GraficoLinha}

        </div>
    )
}