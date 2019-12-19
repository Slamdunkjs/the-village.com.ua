
import React from 'react';
import ArticleStatic from './ArticleStatic';
import ArticleAnimation from './ArticleAnimation';
import BlockNews from './BlockNews';


export default function RenderPostsAll(props){
  const arrayForRender = props.posts;
  const copy = [...arrayForRender];
  return (
      <div className="row" >
        <div className="col-4 col-xl-3 blockNewsMain">
          <BlockNews key = {props.views} posts = {props.allPosts} color = {props.color}/>
        </div>
        {copy.map(post => {
          return (post.type == "image") ? <ArticleStatic key = {post.views} postCategory={post.isSuperProject || post.category} {...post}/> :
          <ArticleAnimation key = {post.views} {...post}/>
        })}
      </div>
  )
}