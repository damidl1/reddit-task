class RedditHeader extends HTMLElement{

    constructor(){
        super()
        this.attachShadow({mode: 'open'})
        //da recuperare dal local storage (se non ho niente salvato, apro la dialog)
        this.subscriptions =JSON.parse(localStorage.getItem('subreddits')) || ['aww', 'italy', 'pokemon'];
        this.removeMode = false;
    }

    addSubreddits(subreddits){
        const uniqueSubreddits = subreddits.filter(subreddit => !this.subscriptions.includes(subreddit));
        this.subscriptions = this.subscriptions.concat(uniqueSubreddits);
        
        localStorage.setItem('subreddits', JSON.stringify(this.subscriptions));

        this.renderLinks();
    }

    showRemoveMode() {
        this.removeMode = true;
        this.setAttribute('remove-mode', '');
        this.renderLinks();
    }

    removeSubreddit(subreddit) {
        const index = this.subscriptions.indexOf(subreddit);
        if (index !== -1) {
            this.subscriptions.splice(index, 1);
            localStorage.setItem('subreddits', JSON.stringify(this.subscriptions));
            this.renderLinks();
        }
    }

    renderLinks() {
        const links = this.subscriptions
        .map(s => 
            `<div><a href="./?r=${s}">${s}</a>);
        ${this.removeMode ? `<button class="remove-button" data-subreddit="${s}">Rimuovi</button>` : ''}
       </div> 
       `);
       const linksString = links.join('');

        const nav = this.shadowRoot.querySelector('nav');
        nav.innerHTML = linksString;

        if (this.removeMode) {
            const removeButtons = nav.querySelectorAll('.remove-button');
            removeButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const subredditToRemove = event.target.getAttribute('data-subreddit');
                    this.removeSubreddit(subredditToRemove);
                });
            });
        }
    }

    connectedCallback(){
      this.shadowRoot.innerHTML = `<style>
      :host {
        display: block;
    }

    nav {
        display: flex;
        gap: 8px;
    }

    h1 {
        display: flex;
        justify-content: center;
        text-align: center;
        font-size: 50px;
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        color: crimson;
    }

    .header-container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 30px;
    }

    .header-image {
        width: 100px;
        height: auto;
        margin-right: 10px;
    }

    nav a {
        color: #fff;
        text-decoration: none;
        font-size: 18px;
    }

    nav a:hover {
        text-decoration: underline;
    }
        </style>`;

      this.shadowRoot.innerHTML += `
  <div class="header-container">
      <img class="header-image" src="./assets/redditlogo.png" alt="Reddit Logo">
      <h1>Reddit viewer</h1>
  </div>      
        `;
      const links = this.subscriptions.map(
        (s) => `<a href="./?r=${s}">${s}</a>`
      );

      const linksString = links.join("");

      console.log(linksString);

      this.shadowRoot.innerHTML += `<nav>${linksString}</nav>`;

      if (this.hasAttribute("remove-mode")) {
        this.removeMode = true;
        this.renderLinks();
      }
    }

    

}

customElements.define('reddit-header', RedditHeader)

