class RedditHeader extends HTMLElement{

    constructor(){
        super()
        this.attachShadow({mode: 'open'})
        //da recuperare dal local storage (se non ho niente salvato, apro la dialog)
        this.subscriptions =JSON.parse(localStorage.getItem('subreddits')) || ['aww', 'italy', 'pokemon'];
    }

    addSubreddits(subreddits){
        const uniqueSubreddits = subreddits.filter(subreddit => !this.subscriptions.includes(subreddit));
        this.subscriptions = this.subscriptions.concat(uniqueSubreddits);
        
        localStorage.setItem('subreddits', JSON.stringify(this.subscriptions));

        this.renderLinks();
    }

    renderLinks() {
        const links = this.subscriptions
        .map(s => `<a href="./?r=${s}">${s}</a>`);
        const linksString = links.join('');

        const nav = this.shadowRoot.querySelector('nav');
        nav.innerHTML = linksString;
    }

    connectedCallback(){

        this.shadowRoot.innerHTML = `<style>
            nav{
                display:flex;
                gap: 8px;
            }
        </style>`

        this.shadowRoot.innerHTML += `
            <h1>Reddit viewer</h1>        
        `
        const links = this.subscriptions
        .map(s => `<a href="./?r=${s}">${s}</a>`)

        const linksString = links.join('')

        console.log(linksString);

        this.shadowRoot.innerHTML += `<nav>${linksString}</nav>`
    }

}

customElements.define('reddit-header', RedditHeader)

