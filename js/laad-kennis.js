function kennisUitleg(onderdeel) {
    const uitleg = document.getElementById("kennis-uitleg-container");

    if (onderdeel === "HTML") {
        uitleg.innerHTML = `
            <h2>HTML – Structuur en inhoud</h2>
            <br>
            <p>
                HTML (HyperText Markup Language) is de fundamentele bouwsteen van elke webpagina. 
                Het zorgt ervoor dat browsers begrijpen welke elementen waar op een pagina moeten staan, 
                zoals titels, paragrafen, afbeeldingen en links.
            </p>
            <p>
                HTML beschrijft de inhoud en de structuur, maar niet hoe iets eruitziet of zich gedraagt. 
                Het is een opmaaktaal die gebruikmaakt van ‘tags’ om verschillende soorten inhoud te onderscheiden. 
                Deze tags geven betekenis aan de inhoud, waardoor zoekmachines en schermlezers de pagina beter kunnen interpreteren.
            </p>
            <p>
                Zonder HTML zou er simpelweg geen inhoud zijn om te tonen, want het vormt het skelet van een website. 
                Het is daarmee onmisbaar voor het creëren van webpagina’s die toegankelijk en begrijpelijk zijn 
                voor gebruikers en machines.
            </p>
        `;
    } else if (onderdeel === "CSS") {
        uitleg.innerHTML = `
            <h2>CSS – Visuele vormgeving</h2>
            <br>
            <p>
                CSS (Cascading Style Sheets) bepaalt hoe de HTML-inhoud eruitziet op een website. 
                Met CSS geef je kleur, lettertypes, afmetingen en lay-out aan elementen zoals tekst, 
                afbeeldingen en knoppen.
            </p>
            <p>
                Het zorgt ervoor dat een website aantrekkelijk en gebruiksvriendelijk is, 
                door structuur en stijl te scheiden van de inhoud. CSS maakt het mogelijk om één stijl 
                toe te passen op meerdere pagina’s, wat consistentie en onderhoudsgemak bevordert.
            </p>
            <p>
                Daarnaast ondersteunt CSS responsief design, waardoor een website zich aanpast aan verschillende 
                schermformaten, van smartphones tot desktops. Met geavanceerde technieken kun je ook animaties 
                en overgangen toevoegen voor een dynamische gebruikerservaring.
            </p>
        `;
    } else if (onderdeel === "JavaScript") {
        uitleg.innerHTML = `
            <h2>JavaScript – Interactiviteit en gedrag</h2>
            <br>
            <p>
                JavaScript is een programmeertaal die websites interactief maakt. Terwijl HTML de inhoud levert 
                en CSS de opmaak, zorgt JavaScript ervoor dat gebruikers kunnen klikken, formulieren invullen, 
                en dat pagina’s dynamisch reageren op acties.
            </p>
            <p>
                JavaScript kan de inhoud van een pagina aanpassen zonder dat deze helemaal opnieuw geladen hoeft te worden. 
                Het wordt veel gebruikt om interactieve elementen te maken, zoals menu’s, sliders en pop-ups.
            </p>
            <p>
                Bovendien kan JavaScript communiceren met servers, waardoor het mogelijk is om data op te halen 
                en bij te werken zonder dat de gebruiker de pagina hoeft te vernieuwen. 
                Zo wordt de gebruikservaring veel vloeiender en moderner.
            </p>
        `;
    }
}
