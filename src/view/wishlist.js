const template = document.createElement('template')

template.innerHTML = `
      <style>
        :host{
          font-family:'Open Sans', sans-serif;
        }
      </style>

      <div>
            <div>
                <div>Image Goes Here</div>    
                <div>Dear Santa</div>

      </div>
      `
class WishlistView extends HTMLElement {
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
window.customElements.define('wishlist-view', WishlistView)
