document.addEventListener('DOMContentLoaded', () => {

    const subredditList = document.querySelector('.subreddit-list');
    const dialogButton = document.getElementById('dialog-btn'); 
    const dialog = document.querySelector('dialog');
    const cancelButton = document.getElementById('cancel-button');
    const removeSubredditButton = document.getElementById('removesubreddit-btn');
    const finishRemovingButton = document.getElementById('finish-removing-btn');
    const addSubredditButton = document.getElementById('add-subreddit-button');
    const submitButton = document.getElementById('submit-button');
    const checkboxes = document.querySelectorAll('input[name="subreddit"]');

    function saveCheckboxState(checkbox) {
        const subreddit = checkbox.value;
        localStorage.setItem(`subreddit_${subreddit}`, checkbox.checked ? 'true' : 'false');
    }

    function restoreCheckboxState(checkbox) {
        const subreddit = checkbox.value;
        const isChecked = localStorage.getItem(`subreddit_${subreddit}`) === 'true';
        checkbox.checked = isChecked;
    }

    function addSubreddit(subreddit) {
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="checkbox" name="subreddit" value="${subreddit}">
            <a href="https://www.reddit.com/r/${subreddit}" target="_blank">${subreddit}</a>
        `;
        subredditList.insertBefore(label, subredditList.firstChild);
    }

    removeSubredditButton.addEventListener('click', () => {
        const redditHeader = document.querySelector('reddit-header');
        redditHeader.showRemoveMode();
        removeSubredditButton.classList.add('hide-remove-buttons');
        finishRemovingButton.classList.remove('hide-remove-buttons');
    });

    addSubredditButton.addEventListener('click', () => {
        const newSubredditInput = document.getElementById('new-subreddit-input');
        const newSubreddit = newSubredditInput.value.trim();

        if (newSubreddit !== '') {
            addSubreddit(newSubreddit);
            const savedSubreddits = JSON.parse(localStorage.getItem('subreddits')) || [];
            savedSubreddits.push(newSubreddit);
            localStorage.setItem('subreddits', JSON.stringify(savedSubreddits));
            newSubredditInput.value = '';
        }
    });

    checkboxes.forEach(restoreCheckboxState);

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

    finishRemovingButton.addEventListener('click', () => {
        const redditHeader = document.querySelector('reddit-header');
        redditHeader.removeAttribute('remove-mode');
        removeSubredditButton.classList.remove('hide-remove-buttons');
        finishRemovingButton.classList.add('hide-remove-buttons');
    });

    submitButton.addEventListener('click', () => {
        localStorage.setItem('showDialog', 'false');
        const selectedSubreddits = Array.from(document.querySelectorAll('input[name="subreddit"]:checked'))
            .map(checkbox => checkbox.value);

        selectedSubreddits.forEach(saveCheckboxState);

        if (selectedSubreddits.length > 0) {
            const redditHeader = document.querySelector('reddit-header');
            redditHeader.addSubreddits(selectedSubreddits);
        }
    });

    const savedSubreddits = JSON.parse(localStorage.getItem('subreddits')) || [];
    savedSubreddits.forEach(subreddit => {
        const label = document.createElement('label');
        label.innerHTML = `
        <input type="checkbox" name="subreddit" value="${subreddit}">
        <a href="https://www.reddit.com/r/${subreddit}" target="_blank">${subreddit}</a>
        `
        subredditList.insertBefore(label, subredditList.firstChild);
    });

});
