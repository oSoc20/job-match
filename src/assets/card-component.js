const template = document.createElement('template');
template.innerHTML = `
<div>
    <div class="container container--type-one">
        <header>header</header>
        <div class="story-container">
            <p id="text">Default card text</p>
        </div>
        <div><slot name="options"/></div>
    </div>
</div>
`;

class TextCard extends HTMLElement {
    constructor() {
        super();
        //this.attachShadow( { mode: "open" });
        this.appendChild(template.content.cloneNode(true));

        this.querySelector("#text").innerText =
            this.getAttribute("text");
    }

}

window.customElements.define("text-card", TextCard);