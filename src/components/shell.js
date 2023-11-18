const template = document.createElement('template')

template.innerHTML = `
<style>
    #main {
        background-color: rgb(255, 255, 255);
    }
    .main-container{
        display:flex;
        flex-direction: column;
    }
    .main-area {
        height: 100%;
        width: 100%;
    }
    #navbar{
        user-select: none;
        display: grid;
        padding: 10px 20px;
        box-sizing: border-box;
        align-items: center;
        font-family: 'Arvo', serif;
        grid-template-columns: repeat(3, 1fr);
    }
    #pages{
        grid-column: 1;
        display: flex;
    }
    .page-button{
        cursor: pointer;
        color: #427274;
        padding: 20px 10px;
        font-size: 18px;
    }
    #logo {
        grid-column: 2;
        justify-self: center;
        font-size: 27px;
        text-wrap: wrap;
        width: 190px;
        line-height: 18px;
        font-weight: 700;
        color: #427274;
    }
    .s-logo-text{
        font-size: 14px;
    }
</style>
    <div class="main-container">
        <div id="navbar">
            <div id="pages"></div>

            <div id="logo"><span class="s-logo-text">The</span> Family Christmas <span class="s-logo-text">2023</span></div>
        </div>
        <div class="main-area"><slot name="main"></div>
    </div>`;

class Element extends HTMLElement {

    static observedAttributes = ["type"];

    constructor () {
        super();
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.buildNavbar()
    }

    async buildNavbar(){
      // Use await to wait for the data to be fetched and converted to JSON

      const response = await fetch('../src/data/navbar-links.json');
      const data = await response.json();

      for(const item of data){
        let div = document.createElement('div');

        div.innerText = item.name
        div.className = 'page-button'
        div.setAttribute('data-link', item.url);
        div.setAttribute('data-element', item.element);
        div.addEventListener('click', event => this.changePage(event))

        this.shadowRoot.querySelector('#pages').append(div)
      }div.setAttribute('data-link', 'wishlist')
    }

    changePage(event){
        let link = event.target.dataset.link
        let element = event.target.dataset.element
        this.dispatchEvent(new CustomEvent('open-page', { bubbles: true, composed: true, detail: { "link": link, "element": element } }))
    }

    connectedCallback() {
        // set eventlisteners here
    }

    disconnectedCallback() {
        // remove eventlisteners here
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'type') {
            this.setTypeBadge(this.getAttribute('type'))
        }
    }
}
window.customElements.define('better-shell', Element);