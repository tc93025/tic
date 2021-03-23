/* eslint-disable no-sequences */
import React, { useState, useEffect } from 'react'
import classnames from 'classnames'

const Col = (props) => {
  const { col, order, offset, pull, push, xs, sm, md, lg, className, children, ...others } = props
  const sizeProps = props;
  // 响应式布局
  const [classList, setClassList] = useState([])
  useEffect(() => {

    const classList = classnames('tic-col',
      {
        [`tic-col-${col}`]: col,
        [`tic-col-order-${order}`]: order,
        [`tic-col-offset-${offset}`]: offset,
        [`tic-col-push-${push}`]: push,
        [`tic-col-pull-${pull}`]: pull,
      }, className); // 这个分号

    ['xs', 'sm', 'md', 'lg'].forEach(size => {
      if (typeof sizeProps[size] === 'string') {
        // classList.push(`tic-col-${size}-${sizeProps[size]}`);
      } else if (typeof sizeProps[size] === 'object') {
        let obj = sizeProps[size];
        // !!obj && Object.entries(obj).forEach(([key, val]) => classList.push(key !== 'span' ? `tic-col-${size}-${key}-${val}` : `tic-col-span-${size}-${val}`))
      }
    });

    setClassList(classList)
  }, [className, col, order, offset, pull, push, sizeProps])


  return (
    <div className={classList} {...others}>
      {children}
    </div>
  )
}

export default Col