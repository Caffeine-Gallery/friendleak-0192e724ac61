import { backend } from "declarations/backend";

document.getElementById('loginBtn').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }

    showLoading();
    try {
        await backend.store(email, password);
        alert('Login successful!');
        loadUsers();
    } catch (e) {
        console.error(e);
        alert('Error during login');
    }
    hideLoading();
});

document.getElementById('createBtn').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }

    showLoading();
    try {
        await backend.store(email, password);
        alert('Account created successfully!');
        loadUsers();
    } catch (e) {
        console.error(e);
        alert('Error creating account');
    }
    hideLoading();
});

async function loadUsers() {
    showLoading();
    try {
        const users = await backend.list();
        const userListContent = document.getElementById('userListContent');
        userListContent.innerHTML = users.map(user => 
            `<div class="user-item">
                <strong>Email:</strong> ${user[0]} 
                <strong>Password:</strong> ${user[1]}
            </div>`
        ).join('');
    } catch (e) {
        console.error(e);
        alert('Error loading users');
    }
    hideLoading();
}

function showLoading() {
    document.getElementById('loading').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// Load users on page load
window.addEventListener('load', loadUsers);
