  inputs.forEach(input => {
        const eventType = (input.type === 'checkbox' || input.type === 'radio' || input.tagName === 'SELECT') ? 'change' : 'input';
        input.addEventListener(eventType, () => {
            const key = input.name || input.id;
            const errorContainer = input.parentElement.querySelector('.error') || document.querySelector(`.error[for="${key}"]`);
            if (errorContainer) errorContainer.textContent = '';
            input.classList.remove('is-invalid');
        });
    });

    form.addEventListener('submit', function(event) {
        let isValid = true;

        inputs.forEach(input => {
            const regels = input.getAttribute('validate').split('|');
            const waarde = input.value.trim();
            const key = input.name || input.id;
            const errorContainer = input.parentElement.querySelector('.error') || document.querySelector(`.error[for="${key}"]`);
            let foutmelding = '';

            if (errorContainer) errorContainer.textContent = '';
            input.classList.remove('is-invalid');

            regels.forEach(regel => {
                if (foutmelding) return;
                const [type, param] = regel.split(':');

                switch (type) {
                    case 'required':
                        if (
                            (input.type === 'checkbox' && !input.checked) ||
                            (input.type === 'radio' && ![...document.querySelectorAll(`input[name="${input.name}"]`)].some(r => r.checked)) ||
                            (input.tagName === 'SELECT' && input.value === '') ||
                            (waarde === '' && input.type !== 'radio')
                        ) {
                            foutmelding = foutmeldingen[key]?.required || 'Dit veld is verplicht.';
                        }
                        break;

                    case 'min':
                        if (waarde.length < parseInt(param)) {
                            foutmelding = foutmeldingen[key]?.min || `Minimaal ${param} tekens vereist.`;
                        }
                        break;

                    case 'max':
                        if (waarde.length > parseInt(param)) {
                            foutmelding = foutmeldingen[key]?.max || `Maximaal ${param} tekens toegestaan.`;
                        }
                        break;

                    case 'email':
                        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (waarde && !regex.test(waarde)) {
                            foutmelding = foutmeldingen[key]?.email || 'Ongeldig e-mailadres.';
                        }
                        break;

                    case 'match':
                        const andereInput = document.getElementById(param);
                        if (andereInput && waarde !== andereInput.value.trim()) {
                            foutmelding = foutmeldingen[key]?.match || 'Velden komen niet overeen.';
                        }
                        break;

                    case 'past':
                        const geboortedatum = new Date(waarde);
                        const vandaag = new Date();
                        if (geboortedatum >= vandaag) {
                            foutmelding = foutmeldingen[key]?.past || 'De datum moet in het verleden liggen.';
                        }
                        break;

                    case 'noSpaces':
                        if (/\s/.test(waarde)) {
                            foutmelding = foutmeldingen[key]?.noSpaces || 'Geen spaties toegestaan.';
                        }
                        break;

                    case 'postcode':
                        const postcodeRegex = /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/;
                            if (waarde && !postcodeRegex.test(waarde)) {
                            foutmelding = foutmeldingen[key]?.postcode || 'Ongeldige postcode. Gebruik formaat 1234AB of 1234 AB.';
    }
    break;

                }
            });

            if (foutmelding) {
                if (errorContainer) errorContainer.textContent = foutmelding;
                input.classList.add('is-invalid');
                isValid = false;
            }
        });

        const interesseCheckboxes = document.querySelectorAll('input[name="interesses[]"]');
        const interesseChecked = Array.from(interesseCheckboxes).some(cb => cb.checked);
        const interesseError = document.querySelector('.error[for="interesses"]');
        if (interesseError) interesseError.textContent = '';
        if (interesseCheckboxes.length && !interesseChecked) {
            if (interesseError) interesseError.textContent = foutmeldingen.interesses.required;
            isValid = false;
        }

        const genderRadios = document.querySelectorAll('input[name="gender"]');
        const genderChecked = Array.from(genderRadios).some(r => r.checked);
        const genderError = document.querySelector('.error[for="gender"]');
        if (genderError) genderError.textContent = '';
        if (genderRadios.length && !genderChecked) {
            if (genderError) genderError.textContent = foutmeldingen.gender.required;
            isValid = false;
        }

        const birthdayInput = document.getElementById('birthday');
        if (birthdayInput) {
            const birthdayValue = birthdayInput.value;
            const birthdayError = document.querySelector('.error[for="birthday"]');
            if (birthdayError) birthdayError.textContent = '';
            if (!birthdayValue) {
                if (birthdayError) birthdayError.textContent = foutmeldingen.birthday.required;
                birthdayInput.classList.add('is-invalid');
                isValid = false;
            } else if (new Date(birthdayValue) >= new Date()) {
                if (birthdayError) birthdayError.textContent = foutmeldingen.birthday.past;
                birthdayInput.classList.add('is-invalid');
                isValid = false;
            } else {
                birthdayInput.classList.remove('is-invalid');
            }
        }

        if (!isValid) {
            event.preventDefault();
            const firstError = document.querySelector('.error:not(:empty)');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
});