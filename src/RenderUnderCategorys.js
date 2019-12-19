import React from 'react';

export default function RenderUnderCategorys(props){

  let categorys = props.categorys;
  return (
    <>
      {categorys.map(category => {
        return (
          <li><a href="#" className="underCategory">{category}</a></li>
        )
      })}
    </>
  )
}