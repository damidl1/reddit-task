class RedditList extends HTMLElement{

    constructor(){
        super()
        this.attachShadow({mode: 'open'})

    }

    connectedCallback(){
        const params = this.getParams()
        this.shadowRoot.innerHTML = `<style>
        .card {
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 12px;
            margin: 10px;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
            background-color: #fff;
          }
          
          .card-title {
            font-size: 18px;
            font-weight: bold;
          }
          
          .card-author {
            font-size: 14px;
            color: #666;
            margin-top: 8px;
          }
          
          .card-details {
            margin-top: 10px;
          }
          
          .card-detail {
            font-size: 12px;
            color: #999;
            display: block;
            margin-bottom: 6px;
          }
          
          .card-thumbnail {
            max-width: 100%;
            height: auto;
            margin-top: 10px;
            border-radius: 4px;
          }
        </style>`
        this.shadowRoot.innerHTML += `<div id="post-container">

        </div>`         
        RedditService.getPosts(params.get('r')).then(posts => {
            
            const container = this.shadowRoot.getElementById('post-container');

            // console.log(posts)

            for (let i = 0; i < posts.data.children.length; i++) {
                const post = posts.data.children[i].data;

                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                <span class="card-title">${post.title}</span>
                <span class="card-author">Author: ${post.author}</span>
                <div class="card-details">
                    <span class="card-detail">Created: ${new Date(post.created * 1000).toLocaleString()}</span>
                    <a class="card-detail" href="${post.url}" target="_blank">Vai al post</a>
                    ${post.thumbnail && post.thumbnail !== 'self' && post.thumbnail !== 'default'
                        ? `<img class="card-thumbnail" src="${post.thumbnail}" alt="thumbnail">`
                        : ''}
                </div>
            `;
            container.appendChild(card);
                // const container = this.shadowRoot.getElementById('post-container')
                // container.innerHTML += `
                //     <div>${post.title}</div>                
                // `
                
            }            

        })

        


    }

    getParams() {
        const params = new URLSearchParams(window.location.search);
        console.log(params);
        return params;
    }

}

customElements.define('reddit-list', RedditList)

