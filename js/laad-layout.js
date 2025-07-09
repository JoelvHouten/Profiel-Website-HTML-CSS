// Laad de navbar
fetch('../navbar.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('navbar').innerHTML = html;
    })
    .catch(err => {
        console.error('Fout bij het laden van de navbar:', err);
    });

// Laad de footer
fetch('../footer.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('footer').innerHTML = html;
    })
    .catch(err => {
        console.error('Fout bij het laden van de footer:', err);
    });

  