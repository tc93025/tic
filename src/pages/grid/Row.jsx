import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import './grid.scss'

// 添加字符单位
export const unit = (data, unit = 'px') => {
  if (data == null) return null
  data = String(data)
  if (/^[\d]+$/.test(String(data))) {
    return `${data}${unit}`
  }
  return data
}

const Row = (props) => {
  const { className, type, align, justify, gutter, children, ...others } = props

  // 响应式布局
  const [classList, setClassList] = useState([])
  useEffect(() => {

    const classList = classnames('tic-row',
      {
        [`tic-row-${type}`]: !!type,
        [`tic-row-${type}-${align}`]: !!align,
        [`tic-row-${type}-${justify}`]: !!justify,
      }, className)

    setClassList(classList)
  }, [type, align, justify, className])

  // 间隔
  const [style, setStyle] = useState({})
  useEffect(() => {
    if (gutter !== 0) {
      const style = {
        marginLeft: unit(gutter),
        marginRight: unit(gutter)
      };
      setStyle(style)
    }

  }, [gutter])

  return (
    <div {...others} className={classList} style={style}>
      {children}
    </div>
  )

}

export default Row;