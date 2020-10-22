import React, { } from 'react'
import { Table, TableBody, TableHead, TableCell, TableRow, makeStyles } from '@material-ui/core'
import { rows } from '../../common/mock'

const useStyles = makeStyles({
  table: {
    minWidth: '100%',
    minHeight: '60vh'
  },
});

const ChartTable = () => {
  const classes = useStyles();
  return (
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>商品名称</TableCell>
          <TableCell align="right" >销量</TableCell>
          <TableCell align="right">购买人数</TableCell>
          <TableCell align="right">折扣率</TableCell>
          <TableCell align="right" width="150">销量增长幅度（当前时间内30分钟/十分钟前30分钟合计）</TableCell>
          <TableCell align="right">均价（原价）</TableCell>
          <TableCell align="right">平均到手价</TableCell>

        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.name}>
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.calories}</TableCell>
            <TableCell align="right">{row.fat}</TableCell>
            <TableCell align="right">{row.carbs}</TableCell>
            <TableCell align="right">{row.protein}</TableCell>
            <TableCell align="right">{row.protein}</TableCell>
            <TableCell align="right">{row.protein}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ChartTable