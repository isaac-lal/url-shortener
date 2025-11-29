const urlDatabase = {};
const baseUrl = window.location.origin + '/';

function generateShortCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

function shortenUrl() {
    const longUrl = document.getElementById('longUrl').value.trim();
    
    if (!longUrl) {
        alert('Please enter a URL');
        return;
    }

    try {
        new URL(longUrl);
    } catch (e) {
        alert('Please enter a valid URL (including http:// or https://)');
        return;
    }

    let shortCode = generateShortCode();
    while (urlDatabase[shortCode]) {
        shortCode = generateShortCode();
    }

    urlDatabase[shortCode] = longUrl;

    const shortUrl = baseUrl + shortCode;
    document.getElementById('shortUrlDisplay').value = shortUrl;
    document.getElementById('result').classList.add('show');
    document.getElementById('successMsg').classList.remove('show');

    updateUrlList();
    document.getElementById('longUrl').value = '';
}

function copyToClipboard() {
    const shortUrlInput = document.getElementById('shortUrlDisplay');
    shortUrlInput.select();
    document.execCommand('copy');
    
    const successMsg = document.getElementById('successMsg');
    successMsg.classList.add('show');
    setTimeout(() => {
        successMsg.classList.remove('show');
    }, 2000);
}

function updateUrlList() {
    const urlList = document.getElementById('urlList');
    const entries = Object.entries(urlDatabase);
    
    if (entries.length === 0) {
        urlList.innerHTML = '';
        return;
    }

    let html = '<h2>Your Shortened URLs</h2>';
    entries.reverse().forEach(([code, original]) => {
        const shortUrl = baseUrl + code;
        html += `
            <div class="url-item">
                <div class="url-info">
                    <a href="${original}" target="_blank">${shortUrl}</a>
                    <div class="original-url">→ ${original}</div>
                </div>
            </div>
        `;
    });
    
    urlList.innerHTML = html;
}

document.getElementById('longUrl').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        shortenUrl();
    }
});

window.addEventListener('load', () => {
    const path = window.location.pathname.substring(1);
    if (path && urlDatabase[path]) {
        window.location.href = urlDatabase[path];
    }
});

