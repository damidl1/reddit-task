document.addEventListener('DOMContentLoaded', () => {

    const dialogButton = document.getElementById('dialog-btn'); 
    const dialog = document.querySelector('dialog');
    const cancelButton = document.getElementById('cancel-button');

    if (localStorage.getItem('showDialog') === 'true' && localStorage.getItem('subreddits') === null) {
        dialog.showModal();
        localStorage.removeItem('showDialog');
    }

    dialog.close();

    cancelButton.addEventListener('click', () => {
        dialog.close();
    });
    
    dialogButton.addEventListener('click', (event) => {
       const openDialog = event.target.getAttribute('data-open-dialog');
        if (openDialog === 'true') {
            dialog.showModal();
        }
    });


    const submitButton = document.getElementById('submit-button');
    submitButton.addEventListener('click', () => {
        localStorage.setItem('showDialog', 'false');

        const selectedSubreddits = Array.from(document.querySelectorAll('input[name="subreddit"]:checked'))
            .map(checkbox => checkbox.value);

        if (selectedSubreddits.length > 0) {
            const redditHeader = document.querySelector('reddit-header');
            redditHeader.addSubreddits(selectedSubreddits);
        }
    });
});

