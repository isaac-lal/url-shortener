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
