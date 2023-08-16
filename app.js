document.addEventListener('DOMContentLoaded', () => {

    const dialogButton = document.getElementById('dialog-btn');
    dialogButton.addEventListener('click', () => {
        const dialog = document.querySelector('dialog');
        dialog.showModal();
    });


    const submitButton = document.getElementById('submit-button');
    submitButton.addEventListener('click', () => {
        const selectedSubreddits = Array.from(document.querySelectorAll('input[name="subreddit"]:checked'))
            .map(checkbox => checkbox.value);

        if (selectedSubreddits.length > 0) {
            const redditHeader = document.querySelector('reddit-header');
            redditHeader.addSubreddits(selectedSubreddits);
        }
    });
});
