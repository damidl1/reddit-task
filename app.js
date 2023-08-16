// app.js

document.addEventListener('DOMContentLoaded', () => {
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
