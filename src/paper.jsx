import React, { useState, useEffect, useReducer, useRef } from 'react'
import { Grid, Paper, makeStyles, Select, FormControl, InputLabel, MenuItem, Button, TextField, Container, AppBar, Toolbar, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@material-ui/core'
import { geoCoordMap, orgMap, cityMap, categoryMap, brandMap } from './common/const'
import Scatter from './charts/effectScatter'
import ChartTable from './charts/Table'
import Bar from './charts/bar'
import Bar2 from './charts/bar2'
import Map from './charts/map'
import { post } from './common/request'

function getRandomArrayElements(arr, count) {
  var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  if (!shuffled.slice(min)[0]) {
    return []
  }
  return shuffled.slice(min).sort((a, b) => a.growthSellNum - b.growthSellNum);
}

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
  growthSellNum: null,
  growthDiscountRate: null,
  growthSellNumRate: null,
  city: '',
  org: '',
  category: '',
  brand: ''
}

const queryReducer = (state, action) => {
  switch (action.type) {
    case 'growthSellNum':
      return { ...state, growthSellNum: parseInt(action.value) }
    case 'growthDiscountRate':
      return { ...state, growthDiscountRate: parseInt(action.value) }
    case 'growthSellNumRate':
      return { ...state, growthSellNumRate: parseInt(action.value) }
    case 'city':
      return { ...state, city: action.value, cityId: cityMap[action.value] }
    case 'org':
      return { ...state, org: action.value, orgCode: orgMap[action.value] }
    case 'category':
      return { ...state, category: action.value, categoryId: categoryMap[action.value] };
    case 'brand':
      return { ...state, brand: action.value, brandId: brandMap[action.value] };
    default:
      throw new Error();
  }
}

const Report = () => {
  const classes = useLayout()

  const [query, dispatch] = useReducer(queryReducer, initialQuery)
  const [open, setOpen] = useState(false)
  const [address, setAddress] = useState('')
  const [scatterData, setScatterData] = useState([])
  const [tableData, setTableData] = useState([])
  const [bar2Data, setBar2Data] = useState([])
  const [mapData, setMapData] = useState([])
  const [barData, setBarData] = useState([])

  const [totalRes, setTotalRes] = useState({})

  const cityArr = Object.keys(geoCoordMap)
  const orgArr = Object.keys(orgMap)
  const categoryArr = Object.keys(categoryMap)
  const brandArr = Object.keys(brandMap)

  const intervalRef = useRef()

  useEffect(() => {
    handleSearch()
    // let interval = setInterval(() => {
    //   handleSearch()
    // }, 600000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = () => {
    setAddress('');
    setOpen(false)
  }

  const handleConfirm = async () => {
    await post({ url: '/mess/subscribe', data: { ...query, account: address } })
    alert('订阅成功')
    handleClose()
  }

  // const handleDeliver = async() =>{
  //   await post({ url: '/mess/subscribe', data: { ...query, account: address } })
  // }

  const handleChange = (e) => {
    setAddress(e.target.value)
  }

  const handleSearch = async () => {
    const res = await post({ url: '/stats/queryBestSellerGoodsList', data: query })
    const res2 = await post({ url: '/stats/queryBrandBestSellerGoodsList', data: query })
    const res3 = await post({ url: '/stats/queryCityBestSellerGoodsList', data: query })

    calculate(res.data.result, res2.data.result, res3.data.result)
  }

  const calculate = (data, data2, data3) => {
    setTotalRes({ data, data2, data3 })
  }

  useEffect(() => {
    if (totalRes.data) {
      setData(getRandomArrayElements(totalRes.data, 20), getRandomArrayElements(totalRes.data2, 20), getRandomArrayElements(totalRes.data3, 20))
      const id = setInterval(() => {
        setData(getRandomArrayElements(totalRes.data, 20), getRandomArrayElements(totalRes.data2, 20), getRandomArrayElements(totalRes.data3, 20))
      }, 30000)

      intervalRef.current = id

      return () => {
        clearInterval(intervalRef.current)
      }
    }

  }, [totalRes])

  const setData = (data, data2, data3) => {
    setTableData(data)
    setScatterData(data)
    setBar2Data(data)
    setBarData(data2)
    setMapData(data3)
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
                  {categoryArr.map((i) => <MenuItem key={i} value={i}>{i}</MenuItem>)}
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
                  {brandArr.map((i) => <MenuItem key={i} value={i}>{i}</MenuItem>)}
                </Select>
              </FormControl>

              <Button className={classes.button} variant="contained" color="primary" onClick={handleSearch}>
                搜索
                  </Button>
              <Button className={classes.button} onClick={() => { setOpen(true) }} variant="contained" color="primary">
                订阅
                  </Button>

            </Toolbar>
          </AppBar>
          <Grid item xs={12} style={{ marginTop: '30px' }}>
            <Paper className={classes.paper}>
              <Scatter data={scatterData}></Scatter>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <ChartTable data={tableData}></ChartTable>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Map data={mapData}></Map>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Bar data={barData}></Bar>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Bar2 data={bar2Data}></Bar2>
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
            onChange={handleChange}
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