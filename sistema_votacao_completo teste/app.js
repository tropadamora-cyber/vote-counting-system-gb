// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';
let authToken = localStorage.getItem('authToken');
let currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

// DOM Elements
const loginScreen = document.getElementById('loginScreen');
const dashboardScreen = document.getElementById('dashboardScreen');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');
const userDisplay = document.getElementById('userDisplay');
const menuItems = document.querySelectorAll('.menu-item');
const sections = document.querySelectorAll('.section');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (authToken && currentUser.id) {
        showDashboard();
        loadDashboardData();
    } else {
        showLogin();
    }

    // Event listeners
    loginForm.addEventListener('submit', handleLogin);
    logoutBtn.addEventListener('click', handleLogout);
    menuItems.forEach(item => {
        item.addEventListener('click', handleMenuClick);
    });
});

// Login Handler
async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            errorDiv.textContent = data.error || 'Erro ao fazer login';
            errorDiv.style.display = 'block';
            return;
        }

        authToken = data.token;
        currentUser = data.user;
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        showDashboard();
        loadDashboardData();
    } catch (error) {
        errorDiv.textContent = 'Erro de conexão. Tente novamente.';
        errorDiv.style.display = 'block';
    }
}

// Logout Handler
function handleLogout() {
    authToken = null;
    currentUser = {};
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    showLogin();
    loginForm.reset();
}

// Menu Click Handler
function handleMenuClick(e) {
    e.preventDefault();
    const section = e.target.getAttribute('data-section');

    menuItems.forEach(item => item.classList.remove('active'));
    e.target.classList.add('active');

    sections.forEach(s => s.classList.remove('active'));
    document.getElementById(section + 'Section').classList.add('active');

    if (section === 'results') {
        loadCircles();
    }
}

// UI Functions
function showLogin() {
    loginScreen.classList.add('active');
    dashboardScreen.classList.remove('active');
}

function showDashboard() {
    loginScreen.classList.remove('active');
    dashboardScreen.classList.add('active');
    userDisplay.textContent = `${currentUser.name} (${currentUser.role})`;
}

// API Functions
async function apiCall(endpoint, method = 'GET', body = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    if (response.status === 401) {
        handleLogout();
        return null;
    }
    return response.json();
}

// Load Dashboard Data
async function loadDashboardData() {
    try {
        // Load coverage stats
        const stats = await apiCall('/results/coverage/stats');
        if (stats) {
            document.getElementById('totalAssemblies').textContent = stats.totalAssemblies;
            document.getElementById('submittedAssemblies').textContent = stats.submittedAssemblies;
            document.getElementById('verifiedSubmissions').textContent = stats.verifiedSubmissions;
            document.getElementById('coveragePercentage').textContent = stats.coveragePercentage + '%';
        }

        // Load national results
        const results = await apiCall('/results/national');
        if (results) {
            displayNationalResults(results);
        }

        // Load submissions
        const submissions = await apiCall('/submissions');
        if (submissions) {
            displaySubmissions(submissions);
        }

        // Load circles
        const circles = await apiCall('/circles');
        if (circles) {
            displayCircles(circles);
        }

        // Load parties
        const parties = await apiCall('/parties');
        if (parties) {
            displayParties(parties);
        }
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}

// Display Functions
function displayNationalResults(results) {
    const container = document.getElementById('nationalResults');
    if (!results.results || results.results.length === 0) {
        container.innerHTML = '<p>Nenhum resultado disponível ainda.</p>';
        return;
    }

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Partido</th>
                    <th>Votos</th>
                    <th>Percentagem</th>
                </tr>
            </thead>
            <tbody>
    `;

    results.results.forEach(party => {
        html += `
            <tr>
                <td>${party.name}</td>
                <td>${party.totalVotes.toLocaleString()}</td>
                <td>${party.percentage}%</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
        <p style="margin-top: 10px; color: var(--text-light); font-size: 12px;">
            Total de votos: ${results.totalVotes.toLocaleString()} | Submissões verificadas: ${results.submissionsCount}
        </p>
    `;

    container.innerHTML = html;
}

function displaySubmissions(submissions) {
    const container = document.getElementById('submissionsList');
    if (!submissions || submissions.length === 0) {
        container.innerHTML = '<p>Nenhuma submissão disponível.</p>';
        return;
    }

    let html = '';
    submissions.forEach(submission => {
        const statusClass = `status-${submission.status.toLowerCase()}`;
        html += `
            <div class="submission-item">
                <div>
                    <strong>${submission.votingAssembly.name}</strong>
                    <p style="color: var(--text-light); font-size: 12px;">
                        Votantes: ${submission.actualVoters} | Votos Nulos: ${submission.nullVotes}
                    </p>
                </div>
                <span class="status-badge ${statusClass}">${submission.status}</span>
            </div>
        `;
    });

    container.innerHTML = html;
}

function displayCircles(circles) {
    const container = document.getElementById('circlesList');
    const selectContainer = document.getElementById('selectedCircle');

    if (!circles || circles.length === 0) {
        container.innerHTML = '<p>Nenhum círculo disponível.</p>';
        return;
    }

    let html = '';
    let selectHtml = '<option value="">Selecione um círculo...</option>';

    circles.forEach(circle => {
        html += `
            <div class="circle-item">
                <div>
                    <strong>${circle.name}</strong>
                    <p style="color: var(--text-light); font-size: 12px;">
                        Região: ${circle.region} | Deputados: ${circle.deputies}
                    </p>
                </div>
                <span>${circle.votingAssemblies.length} mesas</span>
            </div>
        `;
        selectHtml += `<option value="${circle.id}">${circle.name}</option>`;
    });

    container.innerHTML = html;
    selectContainer.innerHTML = selectHtml;
}

function displayParties(parties) {
    const container = document.getElementById('partiesList');
    if (!parties || parties.length === 0) {
        container.innerHTML = '<p>Nenhum partido disponível.</p>';
        return;
    }

    let html = '';
    parties.forEach(party => {
        html += `
            <div class="party-item">
                <div>
                    <strong>${party.name}</strong>
                    <p style="color: var(--text-light); font-size: 12px;">
                        Sigla: ${party.acronym}
                    </p>
                </div>
                <span>${party.candidates.length} candidatos</span>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Load circles for results section
async function loadCircles() {
    const circles = await apiCall('/circles');
    if (circles) {
        displayCircles(circles);
    }
}

// Load circle results
document.addEventListener('DOMContentLoaded', () => {
    const loadCircleResultsBtn = document.getElementById('loadCircleResults');
    if (loadCircleResultsBtn) {
        loadCircleResultsBtn.addEventListener('click', async () => {
            const circleId = document.getElementById('selectedCircle').value;
            if (!circleId) {
                alert('Por favor, selecione um círculo');
                return;
            }

            const results = await apiCall(`/results/circle/${circleId}`);
            if (results) {
                displayCircleResults(results);
            }
        });
    }
});

function displayCircleResults(results) {
    const container = document.getElementById('circleResults');
    if (!results.results || results.results.length === 0) {
        container.innerHTML = '<p>Nenhum resultado disponível para este círculo.</p>';
        return;
    }

    let html = `
        <h4>${results.circle.name} - ${results.circle.deputies} deputados</h4>
        <table>
            <thead>
                <tr>
                    <th>Partido</th>
                    <th>Votos</th>
                    <th>Percentagem</th>
                </tr>
            </thead>
            <tbody>
    `;

    results.results.forEach(party => {
        html += `
            <tr>
                <td>${party.name}</td>
                <td>${party.totalVotes.toLocaleString()}</td>
                <td>${party.percentage}%</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
        <p style="margin-top: 10px; color: var(--text-light); font-size: 12px;">
            Total de votos: ${results.totalVotes.toLocaleString()} | Submissões: ${results.submissionsCount}
        </p>
    `;

    container.innerHTML = html;
}

// Auto-refresh data every 30 seconds
setInterval(() => {
    if (authToken && currentUser.id) {
        loadDashboardData();
    }
}, 30000);

