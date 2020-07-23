//Card//////////////////////////////////////////////////////////////////
const cardTemplate = document.createElement("template");
cardTemplate.innerHTML = `
<div>
<style>
p{
    background-color: pink;
}
</style>
<p>heyo</p>
</div>
`;

class Card extends HTMLElement {
    constructor() {
        super();
        console.log("card ding");
        this.attachShadow( { mode: "open" });
        this.shadowRoot.appendChild(cardTemplate.content.cloneNode(true));
    }
}



//Text Card//////////////////////////////////////////////////////////
const textTemplate = document.createElement('template');

textTemplate.innerHTML = `
<div>
    <div class="container container--type-one">
        <header>header</header>
        <div class="story-container">
            <p id="text">Default card text</p>
        </div>
        <div><slot/></div>
        <p>tezst</p>
    </div>
</div>
`;
class TextCard extends Card {
    constructor() {
        super();
        console.log("text card");
        this.shadowRoot.appendChild(textTemplate.content.cloneNode(true));

        this.shadowRoot.querySelector("#text").innerText =
            this.getAttribute("text");
    }

}



window.customElements.define("text-card", TextCard);