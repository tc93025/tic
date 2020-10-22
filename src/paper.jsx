import React, { useState, useEffect, useReducer } from 'react'
import { Grid, Paper, makeStyles, Select, FormControl, InputLabel, MenuItem, Button, TextField, Container, AppBar, Toolbar } from '@material-ui/core'
import { geoCoordMap } from './common/const'
import Scatter from './charts/effectScatter'
import ChartTable from './charts/Table'
import Bar from './charts/bar'
import Map from './charts/map'

const useLayout = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  formControl: {
    marginLeft: theme.spacing(2),
    minWidth: 120,
  },
  chartsContainer: {
    width: '100%',
    height: '100%'
  },
  button: {
    marginLeft: theme.spacing(2),
    verticalAlign: 'bottom'
  },
  numberInput: {
    width: '100px'
  }
}));

const initialQuery = {
  city: '',
  shop: ''
}

const queryReducer = (state, action) => {
  switch (action.type) {
    case 'city':
      return { ...state, city: action.value };
    case 'shop':
      return { ...state, shop: action.value };
    default:
      throw new Error();
  }
}

const Report = () => {
  const classes = useLayout()

  const [query, dispatch] = useReducer(queryReducer, initialQuery)
  const ggg = Object.keys(geoCoordMap).slice(0, 10)
  console.log(ggg);

  useEffect(() => {
    console.log(query)
  }, [query])

  return (
    <article className="paper-content">
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <AppBar position="sticky" color="inherit">
            <Toolbar>
              <FormControl className={classes.formControl}>
                <TextField
                  className={classes.numberInput}
                  label="销量大于"
                  type="number"
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                  className={classes.numberInput}
                  label="折扣率大于"
                  type="number"
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                  className={classes.numberInput}
                  label="增长幅度大于"
                  type="number"
                />
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label1">城市</InputLabel>
                <Select
                  labelId="demo-simple-select-label1"
                  id="demo-simple-select"
                  value={query.city || ''}
                  onChange={(e) => dispatch({ type: 'city', value: e.target.value })}
                >
                  {ggg.map((i) => <MenuItem key={i} value={i}>{i}</MenuItem>)}
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label2">商家</InputLabel>
                <Select
                  labelId="demo-simple-select-label2"
                  id="demo-simple-select"
                  value={query.shop || ''}
                  onChange={(e) => dispatch({ type: 'shop', value: e.target.value })}
                >
                  {ggg.map((i) => <MenuItem key={i} value={i}>{i}</MenuItem>)}
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label3">二级品类</InputLabel>
                <Select
                  labelId="demo-simple-select-label3"
                  id="demo-simple-select"
                  value={query.age || ''}
                  onChange={(e) => dispatch({ type: 'age', value: e.target.value })}
                >
                  {ggg.map((i) => <MenuItem key={i} value={i}>{i}</MenuItem>)}
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label4">品牌</InputLabel>
                <Select
                  labelId="demo-simple-select-label4"
                  id="demo-simple-select"
                  value={query.aa || ''}
                  onChange={(e) => dispatch({ type: 'age', value: e.target.value })}
                >
                  {ggg.map((i) => <MenuItem key={i} value={i}>{i}</MenuItem>)}
                </Select>
              </FormControl>

              <Button className={classes.button} variant="contained" color="primary">
                搜索
                  </Button>
              <Button className={classes.button} variant="contained" color="primary">
                订阅
                  </Button>

            </Toolbar>
          </AppBar>
          <Grid item xs={12} style={{ marginTop: '30px' }}>
            <Paper className={classes.paper}>
              <Scatter></Scatter>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <ChartTable></ChartTable>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Map></Map>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Bar></Bar>
            </Paper>
          </Grid>
        </Grid>
      </Container>

    </article >
  )
}

export default Report