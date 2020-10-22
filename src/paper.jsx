import React, { useState, useEffect, useReducer } from 'react'
import { Grid, Paper, makeStyles, Select, FormControl, InputLabel, MenuItem, Button, TextField, Container, AppBar, Toolbar, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@material-ui/core'
import { geoCoordMap, orgMap, cityMap } from './common/const'
import Scatter from './charts/effectScatter'
import ChartTable from './charts/Table'
import Bar from './charts/bar'
import Bar2 from './charts/bar2'
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
  growthSellNum: '',
  growthDiscountRate: '',
  growthSellNumRate: '',
  city: '',
  org: '',
  category: '',
  brand: ''
}

const queryReducer = (state, action) => {
  switch (action.type) {
    case 'growthSellNum':
      return { ...state, growthSellNum: action.value }
    case 'growthDiscountRate':
      return { ...state, growthDiscountRate: action.value }
    case 'growthSellNumRate':
      return { ...state, growthSellNumRate: action.value }
    case 'city':
      return { ...state, city: action.value, cityId: cityMap[action.value] }
    case 'org':
      return { ...state, org: action.value, orgCode: orgMap[action.value] }
    case 'category':
      return { ...state, categoryId: action.value };
    case 'brand':
      return { ...state, brandId: action.value };
    default:
      throw new Error();
  }
}

const Report = () => {
  const classes = useLayout()

  const [query, dispatch] = useReducer(queryReducer, initialQuery)
  const [open, setOpen] = useState(false)
  const [address, setAddress] = useState('')

  const cityArr = Object.keys(geoCoordMap)
  const orgArr = Object.keys(orgMap)

  useEffect(() => {
    console.log(query)
  }, [query])

  const handleClose = () => {
    setAddress('');
    setOpen(false)
  }

  const handleConfirm = () => {
    handleClose()
  }

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
                  value={query.growthSellNum || ''}
                  onChange={(e) => dispatch({ type: 'growthSellNum', value: e.target.value })}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                  className={classes.numberInput}
                  label="折扣率大于"
                  type="number"
                  value={query.growthDiscountRate || ''}
                  onChange={(e) => dispatch({ type: 'growthDiscountRate', value: e.target.value })}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                  className={classes.numberInput}
                  label="增长幅度大于"
                  type="number"
                  value={query.growthSellNumRate || ''}
                  onChange={(e) => dispatch({ type: 'growthSellNumRate', value: e.target.value })}
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
                  {cityArr.map((i) => <MenuItem key={i} value={i}>{i}</MenuItem>)}
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label2">商家</InputLabel>
                <Select
                  labelId="demo-simple-select-label2"
                  id="demo-simple-select"
                  value={query.org || ''}
                  onChange={(e) => dispatch({ type: 'org', value: e.target.value })}
                >
                  {orgArr.map((i) => <MenuItem key={i} value={i}>{i}</MenuItem>)}
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label3">二级品类</InputLabel>
                <Select
                  labelId="demo-simple-select-label3"
                  id="demo-simple-select"
                  value={query.category || ''}
                  onChange={(e) => dispatch({ type: 'category', value: e.target.value })}
                >
                  {cityArr.map((i) => <MenuItem key={i} value={i}>{i}</MenuItem>)}
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label4">品牌</InputLabel>
                <Select
                  labelId="demo-simple-select-label4"
                  id="demo-simple-select"
                  value={query.brand || ''}
                  onChange={(e) => dispatch({ type: 'brand', value: e.target.value })}
                >
                  {cityArr.map((i) => <MenuItem key={i} value={i}>{i}</MenuItem>)}
                </Select>
              </FormControl>

              <Button className={classes.button} variant="contained" color="primary">
                搜索
                  </Button>
              <Button className={classes.button} onClick={() => { setOpen(true) }} variant="contained" color="primary">
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
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Bar></Bar>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Bar2></Bar2>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">订阅</DialogTitle>
        <DialogContent>
          <DialogContentText>
            确认关注此条件下商品的消息？
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="oa用户名（不带@）"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </article >
  )
}

export default Report