import React, {Component} from 'react';

class ArticleStatic extends Component{
  constructor(props){
    super(props)
    this.state = {
      category: this.props.category,
      isSuperProject: this.props.isSuperProject,
    }
  }

  handleClickToPost(){
    console.log('click to block static')
  }

  handleClickToCategory(e){
    console.log('click to category')
    e.stopPropagation();
  }
  handleClickToSuperProject(e){
    e.stopPropagation();
  }


  render(){
    const {background, imgPost, views, mainText, secondText, postCategory, category, comments} = this.props;

    const backgroundSuperProject = {
      background,
    };

    const categoryRender = (postCategory == "спецпроект") ? 
    <div className="divCategory" onClick={this.handleClickToSuperProject}>{<span className="superProject" style={backgroundSuperProject}>{postCategory}</span>}</div> : 
    <div className="divCategory" onClick={this.handleClickToCategory}>{<span className="categoryPost"><a href="#">{category}</a></span>}</div>

    const commentsRender = (comments > 0) ? 
    (<><i className="fas fa-comment-alt comment"/><span className="count">{comments}</span></>) : null;
    
    return (
      <div className="articleStatic col-4 col-xl-3" >
        <div className="onlyContentPosts" onClick={this.handleClickToPost}>
          <div className="visibility">
              <div className="divForImg">
                <img className="imgPost" src={imgPost} alt="img2" />
                <div className="opacity" />
              </div>
              <div className="hover">
                <i className="far fa-eye" />
                <span className="count">{views}</span>
                {commentsRender}
              </div>
            </div>
            {categoryRender}
            <div className="mainTextPost">{mainText}</div>
            <div className="secondTextPost">{secondText}</div>
        </div>
      </div>
    )
  }
}

export default ArticleStatic