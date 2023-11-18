const template = document.createElement('template')

template.innerHTML = `
      <style>
        :host{
          font-family:'Open Sans', sans-serif;
        }
        .header{
          font-family: 'Arvo', serif;
          font-weight: 700;
          font-size: 2rem;
          margin-bottom: 15px;
        }
        .text{
          font-size: 1.189rem;
        }

        .info-container{
          margin: 1em calc(50% - 570px);
          display: flex;
          flex-direction: row;
        }

        .news-list{
          width: 100%;
          border-right: 1px solid gray;
        }
        
        .days-until-christmas-card{
          background-color:#C93F4F;
          height: 200px;
          padding: 20px;
          margin-left: 40px;
          min-width: 200px;
        }
        .duc{
          color: white;
          font-size: 18px;
          font-weight: 500;
        }

        #countdown{
          font-size: 26px;
          color: white;
          text-align: center;
        }

        #news-list{
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          padding: 0 40px;
          gap: 20px;
        }

        .info-card{
          width: calc(50% - 10px);
          margin-bottom: 20px;
        }

        .news-image{
          max-width: 100%;
          height: auto;
          border-bottom: 5px solid #C93F4F;
        }
        .news-header{
          padding: 0 40px 20px;
        }
        #news-header{
          margin: 0;
          font-size: 48px;
          font-family: 'Arvo';
        }
      </style>

      <img src="src/images/christmas_town.svg">

      <div class="info-container">
        <div class="news-list">
            <div class="news-header">
              <h1 id="news-header">Welcome to the family christmas website!</h1>
              <p id="news-header-subtext">Integer ultricies eget urna quis vestibulum. Donec vehicula interdum justo, sit amet lobortis metus posuere rutrum. Nullam in efficitur nisi</p>
            </div>
          <div id="news-list"></div>
        </div>
        <div class="days-until-christmas-card">
          <div class="duc header">Days until Christmas</div>
          <div id="countdown"></div>
          <img style="margin-top: 18px;" src="src/images/santa.svg">
        </div>
      </div>
    `
class HomeView extends HTMLElement {
  static get template() {
    return html
  }
  static get properties() {
    return {
      
    }
  }

  async buildNewsFeed() {
      // Use await to wait for the data to be fetched and converted to JSON
      const response = await fetch('../src/data/home-news.json');
      const data = await response.json();
  
      // This is used so the DOM isn't updated multiple times
      let frag = document.createDocumentFragment();
  
      for (const news of data) {
        let div = document.createElement('div');
        div.className = 'info-card';
        div.innerHTML = `
          <div class="image"><img class="news-image" src="${news.image}"></div>
          <div class="header">${news.header}</div>
          <div class="text">${news.text}</div>
        `;
        // Append the created div to the fragment
        frag.appendChild(div);
      }
  
      // Append the fragment to the DOM
      this.shadowRoot.querySelector('#news-list').appendChild(frag);
  }

  countdownTilChristmas() {
    let now = new Date().getTime();
    let countDownDate = new Date('12-25-2023').getTime();
    let timeleft = countDownDate - now;
        
    let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    this.shadowRoot.querySelector('#countdown').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`
  }

  connectedCallback() {
    // Call initially to get something on the screen
    this.countdownTilChristmas()
    this.buildNewsFeed()

    this.intervalId = setInterval(() => {
      this.countdownTilChristmas();
    }, 999);
  }

  disconnectedCallback() {
    // Clear the interval when the element is removed from the DOM
    clearInterval(this.intervalId);
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}
window.customElements.define('home-view', HomeView)
