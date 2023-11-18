import Navigo from 'https://unpkg.com/navigo@7.1.2/lib/navigo.es.js'

export default class PathRouter {
    constructor () {
        let router = new Navigo("/", true, "#!")
        this.path = () => {
          router.on('home', () => {
            this.route = import(`./view/home.js`)
          })
          router.on("wishlist", () => {
            console.log("route home")
            this.route = import('./view/wishlist.js')
          })
          router.on("location", () => {
            this.route = import('./view/location.js')
          })
          router.on("*", () => {
            this.route = import('./view/home.js')
          })
          router.resolve()
      }
    }
    

    connectedCallback() {

    }

    disconnectedCallback() {

    }
}