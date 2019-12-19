import React, {Component} from 'react';

import axios from 'axios'
import WeatherToday from './WeatherToday';
import RenderPostsPlaces from './RenderPostsPlaces';
import RenderPostsKnowledge from './RenderPostsKnowledge';
import RenderPostsEat from './RenderPostsEat';
import RenderPostsBusiness from './RenderPostsBusiness';
import RenderPostsAll from './RenderPostsAll';
import posts from './posts';

const copyPosts = [...posts];
const apiWeather = 'http://api.openweathermap.org/data/2.5/forecast?q=Kiev,ua&APPID=16610e15b595396f10beff503fec1c30';
let copyPostsForRender = [...copyPosts.splice(0,7)];

const copyPostsSecond = [...posts];
const emptyArr = [];

copyPostsSecond.filter(function(item){
  if (!copyPostsForRender.includes(item)){
    emptyArr.push(item)
  }
})

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      weather: {},
      isLoaded: false,
      arrayRenderPosts: copyPostsForRender,
      buttonMore: true,
      search: '',
      emptyArr: emptyArr,
    }

    this.addMorePosts = this.addMorePosts.bind(this);
    this.handleChance = this.handleChance.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClickBurgerMenu(){
    const menuLeft = document.querySelector(".menuLeft");
    const screenOpacity = document.querySelector(".screenOpacityOff");
    menuLeft.classList.add("activeMenu");
    screenOpacity.classList.add("screenOpacity");
  }

  handleClickBackToWeb(){
    const menuLeft = document.querySelector(".menuLeft");
    const screenOpacity = document.querySelector(".screenOpacityOff");
    const exit = document.querySelector(".exit"); 

    menuLeft.classList.remove("activeMenu");
    screenOpacity.classList.remove("screenOpacity");
    screenOpacity.classList.remove("screenOpacitySearch");
    exit.classList.remove("exitActive");
    const divSearch = document.querySelector(".afterClickSearch");
    divSearch.classList.remove("afterClickSearchActive");
  }
  addMorePosts(){
    let addPosts = this.state.emptyArr.splice(0,4);
    const copy = [...this.state.arrayRenderPosts, ...addPosts];
    this.setState({ arrayRenderPosts: copy});
    if(this.state.emptyArr.length < 1){
      this.setState({ buttonMore: false});
    }
  }

  handleClickExit(){
    const screenOpacity = document.querySelector(".screenOpacityOff");
    screenOpacity.classList.remove("screenOpacity");
    screenOpacity.classList.remove("screenOpacitySearch");
    const exit = document.querySelector(".exit"); 
    exit.classList.remove("exitActive");
    const divSearch = document.querySelector(".afterClickSearch");
    divSearch.classList.remove("afterClickSearchActive");
  }

  hadleClickSearch(){
    const screenOpacity = document.querySelector(".screenOpacityOff");
    screenOpacity.classList.add("screenOpacitySearch");
    const exit = document.querySelector(".exit"); 
    exit.classList.add("exitActive");
    const divSearch = document.querySelector(".afterClickSearch");
    divSearch.classList.add("afterClickSearchActive");
  }

  handleChance(e){
    const {value} = e.target;
    copyPostsForRender = posts.filter(item=>item.mainText.toLowerCase().includes(value.toLowerCase()) || item.secondText.toLowerCase().includes(value.toLowerCase()))
    this.setState({arrayRenderPosts: copyPostsForRender});
  }

  handleSubmit(e){
    e.preventDefault();
    this.handleClickBackToWeb();
    const sections = document.querySelectorAll('section');
    const blockNewsMain = document.querySelector('.blockNewsMain');
    const resultSearchText = document.querySelector('.resultSearchText');
    resultSearchText.style.display = 'block';
    sections.forEach(function(item){
      item.style.display = "none";
    })
    blockNewsMain.style.display = "none";
    this.setState({ buttonMore: false});
  }

  componentDidMount(){
    axios(apiWeather)
    .then(response =>{
        this.setState({
          weather: response.data,
          isLoaded: true,
        })
    })
  }

  componentDidUpdate(){
    const anchors = [].slice.call(document.querySelectorAll('.navMenu')),
    animationTime = 500,
    framesCount = 25;

    anchors.forEach(function(item) {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset - 106;
    
        let scroller = setInterval(function() {
          let scrollBy = coordY / framesCount;
          if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
            window.scrollBy(0, scrollBy);
          } else {
            window.scrollTo(0, coordY);
            clearInterval(scroller);
          }
        }, animationTime / framesCount);
      });
    });
  }

  render(){
    const {isLoaded, buttonMore} = this.state;
    console.log(this.state.arrayRenderPosts)
      return (
        <>
        {!isLoaded ?
        <div>Загружается...</div> :
        <div>
          <div className="screenOpacityOff" onClick={this.handleClickBackToWeb}></div>
          <div className="exit" onClick={this.handleClickExit}>
            <span className="cross"></span>
          </div>
          <div className="menuLeft">
            <span className="flag flagLeft"></span>
              <ul>
                <li className="headMenu">Рубрики</li>
                <li className="pageMenuLeft" onClick={this.handleClickBackToWeb}><a className="navMenu" href="#head1">Место</a></li>
                <li className="pageMenuLeft" onClick={this.handleClickBackToWeb}><a className="navMenu" href="#head2">Бизнес</a></li>
                <li className="pageMenuLeft" onClick={this.handleClickBackToWeb}><a className="navMenu" href="#head3">Еда</a></li>
                <li className="pageMenuLeft" onClick={this.handleClickBackToWeb}><a className="navMenu" href="#head4">Знания</a></li>
              </ul>
          </div>

          <div className="afterClickSearch">
            <form className="divSearchForm" onSubmit={this.handleSubmit}>
              <input type="text" placeholder="Пошук" name="search" className="inputSearch" onChange={this.handleChance}/>
              <button type="submit" className="iconSearch"><i className="fas fa-search"></i></button>
            </form>
          </div>

          <header>
            <div className="overLine">
              <WeatherToday weather={this.state.weather} />
              <div className="mainLogo">
                <a href="#"><img src="img/logoVillage.png" width="240px" alt="mainLogo"/></a>
              </div>
              <div className="mainTextRightLogo">
                <span>Україна</span>
              </div>
              <div>
                <a href="#" className="buttonOpen">Увійти</a>
              </div>
            </div>

            <div className="lineHeader">
              <span className="lineHeaderPart lineHeaderPartLeft"></span>
              <span className="lineHeaderPart lineHeaderPartRight"></span>
            </div>


            <div className="underLine" >
              <div className="burgerMenu" onClick={this.handleClickBurgerMenu}>
                <span className="lineForBurgerMenu"></span>
              </div>
              
              <div className="menu">
                <ul>
                  <li className="pageMenu"><a href="#">Новини</a></li>
                  <li className="pageMenu"><a className="navMenu" href="#head1">Место</a></li>
                  <li className="pageMenu"><a className="navMenu" href="#head2">Бизнес</a></li>
                  <li className="pageMenu"><a className="navMenu" href="#head3">Еда</a></li>
                  <li className="pageMenu"><a className="navMenu" href="#head4">Знания</a></li>
                </ul>
              </div>
              <div className="search" onClick={this.hadleClickSearch}>
                <i className="fas fa-search"></i>
              </div>
            </div>
          </header>

          <main>
            <div className="main">
              <div className="resultSearchText">Результат поиска</div>
              <div><RenderPostsAll posts={this.state.arrayRenderPosts} allPosts={posts} color="#fe6638"/></div> 
            </div>   
            {buttonMore && <button className="yet" onClick={this.addMorePosts}>показати ще</button>}
          </main>

          <section className="places" id="head1">
            <div>
              <div><RenderPostsPlaces posts={posts} color="#68c88c" category="Место"/></div> 
            </div>     
          </section>

          <section className="business" id="head2">

            <div>
              <div><RenderPostsBusiness posts={posts} color="#f3ca62" category="Бизнес"/></div> 
            </div>
          </section>

          <section className="eat" id="head3">
            <div>
              <div><RenderPostsEat posts={posts} color="#fe6638" category="Еда"/></div> 
            </div>
          </section>

          <section className="knowledge" id="head4">
            <div>
              <div><RenderPostsKnowledge posts={posts} color="#a4b023" category="Знания"/></div> 
            </div>
          </section>

          <footer>
            <div className="footer">
              <div className="footerFirstFlex">
                <div className="footerLeft">
                  <div className="footerImg">
                    <a href="#"><img src="img/logoVillage.png" height="30px" alt="logo"/></a>
                  </div>

                  <span className="age18">18+</span>
                </div>
                <div className="footerText">
                  <div className="footerFirstText">
                    <p>© 2019 The Village Україна. © 2017 The Village Україна. Новини твого міста. Люди, місця, події. Новини України.</p>
                    <span className="footerAddText">Прогноз погоди наданий</span>
                    <a href="#">OpenWeatherMap</a>
                  </div>
                  <span className="footerLine"/>
                  <div className="footerLastText">
                    <span>
                      Ми використовуємо cookie, для того щоб збирати статистику та робити контент цікавішим. Також cookie використовуються задля відображення найбільш релевантної реклами. Ви можете детальніше прочитати про 
                      <a href="#" className="footerCookie">cookie-файли</a> 
                      та змінити налаштування вашого браузера.
                      </span>
                  </div>
                </div>
                <div className="footerIcons">
                  <div className="footerDivIcons">
                    <a href="#" id="IconIns"><i className="fab fa-instagram"></i></a>
                    <a href="#" id="IconGoo"><i className="fab fa-google-plus-g"></i></a>
                    <a href="#" id="IconFace"><i className="fab fa-facebook-f"></i></a>
                  </div>
                  <div className="footerDivIcons">
                    <a href="#" id="IconRss"><i className="fas fa-rss"></i></a>
                    <a href="#" id="IconTel"><i className="fab fa-telegram-plane"></i></a>
                    <a href="#" id="IconTwi"><i className="fab fa-twitter"></i></a>
                  </div>

                </div>
              </div>

            
              <div className="footerDivNav">
                <span className="footerLine"/>
                <ul className="footerNav">
                  <li><a href="#">про сайте</a></li>
                  <li><a href="#">контакти</a></li>
                  <li><a href="#">рекламодавцям</a></li>
                  <li><a href="#">для користувачив</a></li>
                  <li><a href="#">вакансии</a></li>
                </ul>
                <span className="footerLine"/>
              </div>

              <div className="footerLogo">
                <div className="footerLogoNoClick">
                  Rederine
                </div>
                <div>
                  <a href="#" className="footerLogoClick"><img src="img/logoVillage.png" height="25px" alt="logo"/></a>
                  <a href="#" className="footerLogoClick"><img src="img/wonder.png" height="15px" alt="logo"/></a>
                </div>
              </div>
            </div>
          </footer>
        </div>}
      </>
      )
  }
}

export default App