import {
    fetchDogInfo,
    fetchRandomJoke,
    fetchRandomUser,
    fetchRandomPost
} from './api.js';

/**
 * UI Manipulation and Event Handling
 */

// Helper to show/hide loaders
const setLoader = (cardId, isLoading) => {
    const loader = document.getElementById(`load-${cardId}`);
    if (isLoading) {
        loader.classList.remove('hidden');
    } else {
        loader.classList.add('hidden');
    }
};

// Helper to display error
const renderError = (containerId, error) => {
    const container = document.getElementById(`content-${containerId}`);
    container.innerHTML = `
        <div class="result-box error-msg fadeIn">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <p><strong>Oops! Something went wrong.</strong></p>
            <p style="font-size: 0.8rem; opacity: 0.8;">${error.message}</p>
        </div>
    `;
};

// --- Toast Notification Setup ---
const createToast = (message) => {
    let oldToast = document.querySelector('.toast');
    if (oldToast) oldToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

// --- Dog Finder ---
const handleGetDog = async () => {
    setLoader('dog', true);
    try {
        const data = await fetchDogInfo();
        const container = document.getElementById('content-dog');
        container.innerHTML = `
            <div class="result-box">
                <img src="${data.image}" alt="Random Dog" class="dog-image">
                <div class="breed-badge"><i class="fa-solid fa-tag"></i> ${data.breed}</div>
            </div>
        `;
        
        // Ensure the extra button exists
        let footer = document.querySelector('#card-dog .card-footer');
        if (!document.getElementById('btn-copy-dog')) {
            const copyBtn = document.createElement('button');
            copyBtn.id = 'btn-copy-dog';
            copyBtn.className = 'btn secondary';
            copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Copy Link';
            footer.appendChild(copyBtn);
            
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(data.image)
                    .then(() => createToast('Image link copied!'))
                    .catch(() => createToast('Failed to copy.'));
            });
        }
    } catch (err) {
        renderError('dog', err);
    } finally {
        setLoader('dog', false);
    }
};

// --- Joke Generator ---
const handleGetJoke = async () => {
    setLoader('joke', true);
    try {
        const data = await fetchRandomJoke();
        const container = document.getElementById('content-joke');
        container.innerHTML = `
            <div class="result-box">
                <div class="joke-setup">${data.setup}</div>
                <div class="joke-punchline">${data.punchline}</div>
            </div>
        `;
        
        // Update main button text since it can act as "Next Joke"
        document.getElementById('btn-joke').innerHTML = '<i class="fa-solid fa-bolt"></i> Next Joke';
    } catch (err) {
        renderError('joke', err);
    } finally {
        setLoader('joke', false);
    }
};

// --- Random User ---
const handleGetUser = async () => {
    setLoader('user', true);
    try {
        const data = await fetchRandomUser();
        const container = document.getElementById('content-user');
        container.innerHTML = `
            <div class="result-box user-profile">
                <img src="${data.picture}" alt="User Avatar" class="user-avatar">
                <div class="user-details">
                    <h3>${data.fullName}</h3>
                    <p><i class="fa-solid fa-envelope"></i> ${data.email}</p>
                    <p><i class="fa-solid fa-earth-americas"></i> ${data.country}</p>
                    <p><i class="fa-solid fa-cake-candles"></i> Age: ${data.age} | <i class="fa-solid fa-phone"></i> ${data.phone}</p>
                </div>
            </div>
        `;
        document.getElementById('btn-user').innerHTML = '<i class="fa-solid fa-dice"></i> Next User';
    } catch (err) {
        renderError('user', err);
    } finally {
        setLoader('user', false);
    }
};

// --- JSONPlaceholder ---
const handleGetPost = async () => {
    setLoader('json', true);
    try {
        const data = await fetchRandomPost();
        const container = document.getElementById('content-json');
        container.innerHTML = `
            <div class="result-box json-post">
                <span class="breed-badge" style="margin-bottom: 0.5rem">Post ID: ${data.id}</span>
                <h3>${data.title}</h3>
                <p>${data.body}</p>
            </div>
        `;
        document.getElementById('btn-json').innerHTML = '<i class="fa-solid fa-download"></i> Next Post';
    } catch (err) {
        renderError('json', err);
    } finally {
        setLoader('json', false);
    }
};

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-dog').addEventListener('click', handleGetDog);
    document.getElementById('btn-joke').addEventListener('click', handleGetJoke);
    document.getElementById('btn-user').addEventListener('click', handleGetUser);
    document.getElementById('btn-json').addEventListener('click', handleGetPost);
});
