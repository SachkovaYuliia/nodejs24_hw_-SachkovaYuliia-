const API_URL_BASE = 'http://localhost:3000';

async function getAllUsers() {
    const data = await fetch(API_URL_BASE +'/data').then((r)=> r.json);
    return data;
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('/users')
        .then(response => response.json())
        .then(users => {
            const tableBody = document.getElementById('user-table-body');
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching user data:', error));
});