import React, { Fragment, Component } from 'react'

import style from './App.module.css'
import cn from 'classnames'

import { Chart } from './components/Chart/Chart'
import Cards from './components/Cards/Cards'
import { CountryPicker } from './components/CountryPicker/CountryPicker'



import { PegarDados } from './api'
export default class App extends Component {
    state = {
        date: {},
        pais: ''
    }
    async componentDidMount() {
        const date = await PegarDados()
        this.setState({ date: date })
    }
    PegarPaisSelecionado = async (pais) => {
        const paisDados=await PegarDados(pais)
        this.setState({ date: paisDados, pais: pais})
    }

    render() {
        const { date, pais } = this.state
        return (
            <div className={style.princ}>
                <Cards date={date} />
                <CountryPicker PegarPaisSelecionado={this.PegarPaisSelecionado} />
                <Chart date={date} pais={pais}/>
            </div>
        )
    }
}