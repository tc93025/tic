import React, { } from 'react'
import { Table, TableBody, TableHead, TableCell, TableRow, makeStyles, TableContainer, Button } from '@material-ui/core'
import { post } from '../../common/request'

const useStyles = makeStyles({
  table: {
    minWidth: '100%',
    minHeight: '60vh',
    maxHeight: '70vh'
  },
  button: {
    marginLeft: '5px',
    verticalAlign: 'bottom'
  },
});

const ChartTable = (props) => {
  const rows = props.data
  console.log('ChartTable', rows);
  const classes = useStyles();

  const handleClick = async ({ upcCode, goodsName }) => {
    console.log({ upcCode, goodsName });
    const res = await post({ url: '/mess/subGoods', data: { upcCode, goodsName } })
    alert('推送成功')
  }

  return (
    <TableContainer className={classes.table}>
      <Table stickyHeader className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>商品名称</TableCell>
            <TableCell align="right" >销量</TableCell>
            {/* <TableCell align="right">购买人数</TableCell> */}
            <TableCell align="right">折扣率</TableCell>
            <TableCell align="right" width="150">销量增长幅度（当前时间内30分钟/十分钟前30分钟合计）</TableCell>
            <TableCell align="right">均价（原价）</TableCell>
            <TableCell align="right">平均到手价</TableCell>
            <TableCell align="right">操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ maxHeight: '500px' }}>
          {rows.length > 0 && rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.goodsName}
              </TableCell>
              {/* <TableCell align="right">{row.calories}</TableCell> */}
              <TableCell align="right">{row.growthSellNum}</TableCell>
              <TableCell align="right">{row.growthDiscountRate}%</TableCell>
              <TableCell align="right">{row.growthSellNumRate}%</TableCell>
              <TableCell align="right">{row.skuTotalAmount}</TableCell>
              <TableCell align="right">{row.sellerAmount}</TableCell>
              <TableCell align="center">
                <Button className={classes.button} onClick={()=>handleClick(row)} variant="contained" color="primary">
                  推送地推员
                  </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  )
}

export default ChartTable