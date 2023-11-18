import PathRouter from './router.js'
import './components/shell.js'

const template = document.createElement('template')

template.innerHTML = `
  <style include=" shell-styles"></style>
  <better-shell>
    <div id="mainPageContainer" slot="main"></div>
  </better-shell>
`
export class AppMain extends HTMLElement {
  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged',
      },
      route: {
        type: Object,
        notify: true,
      },
    }
  }
  static get observers() {
    return ['_routePageChanged(routeData.page)']
  }  
  animateUnload() {
    const container = this.shadowRoot.querySelector('#mainPageContainer')
    container.classList.add('hidden')
  }

  router(event, selector, url) {
    this.animateUnload()
    history.replaceState({}, `The Family Christmas 2023`, url);
    setTimeout(() => {
      let router = new PathRouter
      router.path()
      if(!selector){return this.changePage('home-view')}
      this.changePage(selector)
    }, 200)
    
  }

  callRouter(event){
    const selector = event.detail.element
    const url = event.detail.link

    this.router(event, selector, url)
  }

  changePage(elementName) {
    const container = this.shadowRoot.querySelector('#mainPageContainer')
    container.innerHTML = ''

    const newPage = document.createElement(elementName)
   
    container.appendChild(newPage)
    container.classList.remove('hidden')
    container.classList.add('visible')
  }

  async ready() {
    super.ready()
  }
  
  constructor(){
    super();
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
  connectedCallback() {
    console.log("Hello")
    this.router()
    window.addEventListener('open-page', event => this.callRouter(event))
  };
  disconnectedCallback() {
  };
}

customElements.define('app-main', AppMain)
