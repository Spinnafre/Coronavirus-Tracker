import axios from 'axios'

const url = 'https://covid19.mathdro.id/api'

export const PegarDados=async (pais)=>{
    let urlPais=url
    if(pais){
        urlPais=`${url}/countries/${pais}`
    }else{
        urlPais = url
    }
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(urlPais)
        return { confirmed, recovered, deaths, lastUpdate }
    } catch (error) {
        console.log('Error em Pegar Dados, local: Index.js')
    }
    

}

export const PegarDadosDiarios=async()=>{
    /*Note que em /daily tem um array com vários objetos representando a atualização 
    diário do pais, nesse caso necessitamos pegar somente o número de casos confirmados,
    mortes e a data do dia, para fazer um gráfico com os dados atualizados de acordo com o
    dia.
    */
    try {
        const {data}=await axios.get(`${url}/daily`)
        const extrairDados=data.map((date)=>({
            confirmed: date.confirmed.total,
            deaths: date.deaths.total,
            date: date.reportDate,
        }))
        return extrairDados
    } catch (error) {
        console.log('Error em Nomes de Paises, local: Index.js')
    }
}
/* Em https://covid19.mathdro.id/api/countries é possível obsercar que se trata de um objeto JSON
   com nome "countries" e nele há um array de objetos cujo tem nomes dos países. Necessitamos pegar 
   o nome desses países dentro do "countries"
*/
export const DadosPorPaises=async()=>{
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`)
        // Vai gerar um array com os nomes dos paises
        return countries.map((pais) => pais.name)
    } catch (error) {
        console.log('Error em Dados por países, local: Index.js')
    }
}