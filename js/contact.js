document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('#contact-form');

  if (!contactForm) {
    return;
  }

  const fields = {
    fullName: document.querySelector('#full-name'),
    email: document.querySelector('#email'),
    phone: document.querySelector('#phone'),
    message: document.querySelector('#message')
  };

  const messages = {
    fullName: document.querySelector('#full-name-error'),
    email: document.querySelector('#email-error'),
    phone: document.querySelector('#phone-error'),
    message: document.querySelector('#message-error')
  };

  const successMessage = document.querySelector('#success-message');

  function setError(fieldName, message) {
    if (fields[fieldName]) {
      fields[fieldName].setAttribute('aria-invalid', 'true');
    }

    if (messages[fieldName]) {
      messages[fieldName].textContent = message;
    }
  }

  function clearError(fieldName) {
    if (fields[fieldName]) {
      fields[fieldName].setAttribute('aria-invalid', 'false');
    }

    if (messages[fieldName]) {
      messages[fieldName].textContent = '';
    }
  }

  function isValidEmail(emailValue) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(emailValue);
  }

  function validateField(fieldName) {
    const value = (fields[fieldName].value || '').trim();

    if (!value) {
      setError(fieldName, 'This field is required.');
      return false;
    }

    if (fieldName === 'email' && !isValidEmail(value)) {
      setError(fieldName, 'Please enter a valid email address.');
      return false;
    }

    if (fieldName === 'phone' && !/^\d+$/.test(value)) {
      setError(fieldName, 'Phone number should contain digits only, with no spaces or symbols.');
      return false;
    }

    clearError(fieldName);
    return true;
  }

  Object.keys(fields).forEach((fieldName) => {
    fields[fieldName].addEventListener('input', () => {
      validateField(fieldName);
      if (successMessage) {
        successMessage.classList.remove('visible');
      }
    });
  });

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let allValid = true;

    Object.keys(fields).forEach((fieldName) => {
      if (!validateField(fieldName)) {
        allValid = false;
      }
    });

    if (!allValid) {
      return;
    }

    if (successMessage) {
      successMessage.textContent = 'Your message has passed client-side validation. In this static site, real delivery would require a backend or a form service.';
      successMessage.classList.add('visible');
    }

    contactForm.reset();
    Object.keys(fields).forEach((fieldName) => clearError(fieldName));
  });
});
