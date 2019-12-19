import React from 'react';


export default function BlockNews(props){
  const arrayForRender = props.posts;
  const copy = [...arrayForRender];
  const borderColor = props.color;
  const colorFlag = {
    borderColor,
    borderRightColor: 'transparent',
  }
  return (
      <div className="blockNews">
        <span className="flag flagRight" style={colorFlag}/>
        <span className="articleNews">новини</span>
        <ul className="blockNewsUl">
          {copy.map(post => {
            return (
              <li className="liForNew"><a href="#">{post.secondText}</a></li>
              )
          })}
        </ul>
      </div>
  )
}