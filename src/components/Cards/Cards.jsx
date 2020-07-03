import React from 'react'
import style from './Cards.module.css'
import { Grid, Card, Typography, CardContent, CardHeader, CardMedia } from '@material-ui/core'
import CountUp from 'react-countup'
import classes from 'classnames'

const Cards = ({date:{ confirmed, recovered, deaths, lastUpdate}})=>{
    
    if(!confirmed && !recovered && !deaths){
        return 'Loading...'
    }
    return(
        <div className={style.container}>
            <Grid  container spacing={3} justify='center'>
                {/* Infectados */}
                <Grid item component={Card} md={3} xs={12} lg={4}className={classes(style.card,style.infectados)}>
                    <CardContent>
                        <Typography >Infectados</Typography>
                        <Typography variant='h3'>
                            <CountUp
                                start={0}
                                end={confirmed.value}
                                duration={2}
                                separator='.'
                            />
                        </Typography>
                        <Typography>{new Date().toDateString()}</Typography>
                        <Typography>Número de infectados pela a Covid-19</Typography>
                    </CardContent>
                </Grid>

                {/* Recuperados */}
                <Grid item component={Card} md={3} xs={12}  className={classes(style.card,style.recuperados)}>
                    <CardContent>
                        <Typography >Recuperados</Typography>
                        <Typography variant='h3'>
                            <CountUp
                                start={0}
                                end={recovered.value}
                                duration={2}
                                separator='.'
                            />
                        </Typography>
                        <Typography>{new Date().toDateString()}</Typography>
                        <Typography>Número de recuperados pela a Covid-19</Typography>
                    </CardContent>
                </Grid>

                {/* Mortos */}
                <Grid item component={Card} md={3} xs={12} className={classes(style.card,style.mortos)}>
                    <CardContent>
                        <Typography >Mortos</Typography>
                        <Typography variant='h3'>
                            <CountUp
                                start={0}
                                end={deaths.value}
                                duration={2}
                                separator='.'
                            />
                        </Typography>
                        <Typography>{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography>Número de mortos pela a Covid-19</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}
export default Cards