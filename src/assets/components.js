const cardTemplate = document.createElement("template");
cardTemplate.innerHTML = `
    <style>
    :root {
        --primary-color: #55BAEB;
        --primary-color-dark: #273951;
        --grey: #E7EEF5;

        --font-type: 'Roboto';
        --font-size-lg: 18px;
    }
    *{
        box-sizing: border-box;
    }
    .container {
        margin: 0 auto;
        max-width: 600px;
        width: 100vw;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .container > * {
        width: 100%;
    }

    .container .story-container {
        background-color: var(--grey);
        padding: 30px 20px;
        min-height: 40vh;

        display: flex;
        justify-content:center;
        align-items:center;
        flex-direction: column;
    }

    .container .story-container .story-container__img {
        background-color: var(--primary-color-dark);
        background-size: cover;
        background-position: center;
    }

    .container .option-container {
        margin: auto;
        display: flex;
        justify-content: center;
        width: 50%;
        flex-wrap: wrap;
    }

    .progress-bar {
        height: 14px;
        background-color: var(--grey);
        width: 100%;
    }

    .progress-bar .progress {
        height: 100%;
        background-color: var(--primary-color);
    }

    /* Typography */

    p {
        font-size: var(--font-size-lg);
    }

    .story-container__text, .story-question {
        max-width: 70%;
        font-family: var(--font-type);

        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        text-align: center;

    }

    .story-question {
        margin: 30px 0 0 0;
    }
    </style>
    `;

class Card extends HTMLElement {
    constructor() {
        super();
        this.attachShadow( { mode: "open" });
        this.shadowRoot.appendChild(cardTemplate.content.cloneNode(true));
    }
}



//Text Card//////////////////////////////////////////////////////////
const textTemplate = document.createElement('template');

textTemplate.innerHTML = `
    <div>
        <div class="container container--type-one">
            <status-header></status-header>

            <div class="story-container">
                <p id="text" class="story-container__text">Default card text</p>
            </div>
            <div class="option-container"><slot/></div>
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


//Image Card//////////////////////////////////////////////////////////
const imageTemplate = document.createElement('template');

imageTemplate.innerHTML = `
    <style>
    .story-container--image-template {
        background-color: transparent !important;
    }

    .story-container img {
        width: 275px;
        height: 370px;
        margin: 30px;
        object-fit: cover;
    }

    </style>
    <div>
        <div class="container">
            <status-header></status-header>

            <div class="story-container story-container--image-template">
                <img id="image" src="https://avatars3.githubusercontent.com/u/61460540?s=200&v=4">
            </div>
            <div class="option-container"><slot/></div>
        </div>
    </div>
    `;
class ImageCard extends Card {
    constructor() {
        super();
        console.log("text card");
        this.shadowRoot.appendChild(imageTemplate.content.cloneNode(true));

        this.shadowRoot.querySelector("#image").src =
            this.getAttribute("image");
    }

}









//Full Card///////////////////////////////////////////////////////////

const fullTemplate = document.createElement("template");

fullTemplate.innerHTML = `
    <div>
        <div class="container">
            <status-header></status-header>

            <div class="story-container">
                <img id="image" src="https://avatars3.githubusercontent.com/u/61460540?s=200&v=4">
                <p id="text" class="story-container__text">Default card text</p>
            </div>
            <div class="option-container"><slot/></div>
        </div>
    </div>
    `;

class FullCard extends Card {
    constructor() {
        super();
        this.shadowRoot.appendChild(fullTemplate.content.cloneNode(true));

        this.shadowRoot.querySelector("#image").src =
            this.getAttribute("image");
        this.shadowRoot.querySelector("#text").innerText =
            this.getAttribute("text");
    }
}

const statusTemplate = document.createElement("template");
statusTemplate.innerHTML = `
    <style>
    .progress-bar {
        height: 14px;
        background-color: var(--grey);
        width: 100%;
    }

    .progress-bar .progress {
        height: 100%;
        background-color: var(--primary-color);
    }
    </style>
    <div class="header">
        <div class="progress-bar">
            <div class="progress" style="width:0"></div>
        </div>
    </div>
    `;
class StoryStatus extends HTMLElement {
    constructor(){
        super();
        this.attachShadow( { mode: "open" });
        this.shadowRoot.appendChild(statusTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        console.log("connected callback");
        this.shadowRoot.querySelector(".progress").style.width = this.getStoryProgressInPercentage();
    }

    getStoryProgressInPercentage() {
        let pageId = this.getCurrentPassageId();
        let  storyLenght = window.story.passages.length;
        const progress = (pageId / storyLenght) * 100;
        return `${progress}%`
    }

    getCurrentPassageId() {
        return window.story.history[window.story.history.length - 1];
    }
}
window.customElements.define("status-header", StoryStatus);
window.customElements.define("text-card", TextCard);
window.customElements.define("image-card", ImageCard);
window.customElements.define("full-card", FullCard);