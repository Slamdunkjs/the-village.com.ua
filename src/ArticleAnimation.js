import React, {Component} from 'react';

class ArticleAnimation extends Component{
  constructor(props){
    super(props)
      this.state = {
        category: this.props.category, 
        isSuperProject: this.props.isSuperProject, 
        isAnimation: false,
      }
  }
  handleClickToPost(){
    console.log('click to block animation')
  }

  handleClickToCategory(e){
    console.log('click to category')
    e.stopPropagation();
  }

  render(){
    const {category} = this.state;
    const {imgPost, views, mainText, secondText, comments} = this.props;
    
    const commentsRender = (comments > 0) ? 
    (<><i className="fas fa-comment-alt comment"/><span className="count">{comments}</span></>) : null;

    const backgroundImg = {
      background: `url('${imgPost}')`,
      backgroundPositionX: '50%',
    }
    
    return (
      <div className="articleStatic col-4 col-xl-3">
        <div className="onlyContentPosts onlyAnimationPosts" style={backgroundImg} onClick={this.handleClickToPost}>
          <div className="visibility">
            <div className="divForImg">
              <div className="opacity"></div>
            </div>
              <div className="hover hoverAnimation">
                <i className="far fa-eye"></i>
                <span className="count">{views}</span>
                {commentsRender}
              </div>
          </div>

          <div className="content">
            <div className="divSuperCategory divCategory" onClick={this.handleClickToCategory}>
              <span className="categoryPostSlider"><a href="#">{category}</a></span>
            </div>

            <div className="mainTextPostSlider">{mainText}</div>
            <div className="secondTextPostSlider">{secondText}</div>
          </div>

        </div>
      </div>
    )
  }
}

export default ArticleAnimation