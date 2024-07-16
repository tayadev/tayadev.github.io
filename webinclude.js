class WebInclude extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const src = this.getAttribute('src');
    fetch(src)
      .then(response => response.text())
      .then(text => {
        this.shadowRoot.innerHTML = text;
      });
  }
}

customElements.define('web-include', WebInclude);