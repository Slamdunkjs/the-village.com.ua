import React from 'react';
import ArticleStatic from './ArticleStatic';
import ArticleAnimation from './ArticleAnimation';
import BlockNews from './BlockNews';
import RenderUnderCategorys from './RenderUnderCategorys';

export default function BlockPlace(props){
  const arrayForRender = props.posts;
  const copy = [];
  for (var i = 0; i < arrayForRender.length; i += 1){
    if(arrayForRender[i].category === "places"){
      copy.push(arrayForRender[i])
    }
  }

  let arrayUnderCategory = []
  copy.forEach(post=>{
    if(!arrayUnderCategory.includes(post.underCategory)){
      arrayUnderCategory.push(post.underCategory)
    }
  })
  return (
    <div className="row">
      <div className="col-12 row titleCategory">
        <div className="col-4 col-xl-3 categoryText">{props.category}</div>
        <div className="col-8 col-xl-9 categoryRightText">
          <span className="popularTopics">популярны темы</span>
          <ul className="listCategorys">
            <RenderUnderCategorys categorys = {arrayUnderCategory}/>
          </ul>

        </div>
      </div>
        <div className="col-4 col-xl-3">
          <BlockNews key = {props.views} posts = {copy} color = {props.color}/>
        </div>
      {copy.map(post => {
        return (post.type == "image") ? <ArticleStatic key = {post.views} postCategory={post.isSuperProject || post.category} {...post}/> :
        <ArticleAnimation key = {post.views} {...post}/>
      })}
    </div>
  )
}