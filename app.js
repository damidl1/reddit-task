document.addEventListener('DOMContentLoaded', () => {

    function saveCheckboxState(checkbox) {
        const subreddit = checkbox.value;
        localStorage.setItem(`subreddit_${subreddit}`, checkbox.checked ? 'true' : 'false');
    }

    function restoreCheckboxState(checkbox) {
        const subreddit = checkbox.value;
        const isChecked = localStorage.getItem(`subreddit_${subreddit}`) === 'true';
        checkbox.checked = isChecked;
    }


    const removeSubredditButton = document.getElementById('removesubreddit-btn');
    removeSubredditButton.addEventListener('click', () => {
        const redditHeader = document.querySelector('reddit-header');
        redditHeader.showRemoveMode();
        removeSubredditButton.classList.add('hide-remove-buttons');
        finishRemovingButton.classList.remove('hide-remove-buttons');
    });

    const addSubredditButton = document.getElementById('add-subreddit-button');
    addSubredditButton.addEventListener('click', () => {
        const newSubredditInput = document.getElementById('new-subreddit-input');
        const newSubreddit = newSubredditInput.value.trim();

        if (newSubreddit !== '') {
            const subredditList = document.querySelector('.subreddit-list');
            const label = document.createElement('label');
            label.innerHTML = `
            <input type="checkbox" name="subreddit" value="${newSubreddit}">
            <a href="https://www.reddit.com/r/${newSubreddit}" target="_blank">${newSubreddit}</a>
            `;
            subredditList.insertBefore(label, subredditList.firstChild);
            const savedSubreddits = JSON.parse(localStorage.getItem('subreddits')) || [];
            savedSubreddits.push(newSubreddit);
            localStorage.setItem('subreddits', JSON.stringify(savedSubreddits));
            
            newSubredditInput.value = '';
        }
    });

    // const savedSubreddits = JSON.parse(localStorage.getItem('subreddits')) || [];
    // savedSubreddits.forEach(subreddit => {
    //     const subredditList = document.querySelector('.subreddit-list');
    //     const label = document.createElement('label');
    //     label.innerHTML = `
    //     <input type="checkbox" name="subreddit" value="${newSubreddit}">
    //     <a href="https://www.reddit.com/r/${newSubreddit}" target="_blank">${newSubreddit}</a>
    //     `
    //     subredditList.insertBefore(label, subredditList.firstChild);
    // })

    const dialogButton = document.getElementById('dialog-btn'); 
    const dialog = document.querySelector('dialog');
    const cancelButton = document.getElementById('cancel-button');

    const checkboxes = document.querySelectorAll('input[name="subreddit"]');
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

    const finishRemovingButton = document.getElementById('finish-removing-btn');
    finishRemovingButton.addEventListener('click', () => {
        const redditHeader = document.querySelector('reddit-header');
        redditHeader.removeAttribute('remove-mode');
        removeSubredditButton.classList.remove('hide-remove-buttons');
        finishRemovingButton.classList.add('hide-remove-buttons');

    })



    const submitButton = document.getElementById('submit-button');
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

    const subredditList = document.querySelector('.subreddit-list');
   checkboxes.forEach(restoreCheckboxState);
    const savedSubreddits = JSON.parse(localStorage.getItem('subreddits')) || [];
    savedSubreddits.forEach(subreddit => {
        
        const label = document.createElement('label');
        label.innerHTML = `
        <input type="checkbox" name="subreddit" value="${newSubreddit}">
        <a href="https://www.reddit.com/r/${newSubreddit}" target="_blank">${newSubreddit}</a>
        `
        subredditList.insertBefore(label, subredditList.firstChild);
    })
});

