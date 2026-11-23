'use strict';

const form = document.querySelector('form[name="booking"]');
const start = document.querySelector('#start-date');
const end = document.querySelector('#end-date');
const service = document.querySelector('#service');
const requestedService = new URLSearchParams(location.search).get('service');
if ([...service.options].some(option => option.value && option.value === requestedService)) {
  service.value = requestedService;
}

const today = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Africa/Lagos' }).format(new Date());
start.min = today;
function updateEndDate() {
  end.min = start.value || today;
  end.setCustomValidity(end.value && end.value < end.min ? 'Select an end date on or after the start date.' : '');
}
start.addEventListener('input', updateEndDate);
end.addEventListener('input', updateEndDate);
updateEndDate();

// Netlify removes data-netlify when its build has registered the form.
// On static hosts that leave it intact, prepare an SMS the visitor sends explicitly.
if (form.hasAttribute('data-netlify')) {
  const submit = form.querySelector('button[type="submit"]');
  const fallback = document.querySelector('#booking-text-fallback');
  const preview = document.querySelector('#booking-message');
  const status = document.querySelector('#copy-booking-status');
  const privacy = document.querySelector('#booking-privacy');
  submit.textContent = 'Open text message';
  privacy.textContent = 'This opens your messaging app with the request ready to send. Your dates are subject to availability.';
  form.addEventListener('submit', event => {
    event.preventDefault();
    const fields = new FormData(form);
    if (fields.get('website')) return;
    const lines = [
      'Booking request for Timi Called the Shots',
      'Service: ' + service.selectedOptions[0].textContent,
      'Preferred date: ' + start.value + (end.value ? ' to ' + end.value : ''),
      'Name: ' + fields.get('name'),
      'Email: ' + fields.get('email'),
      'Phone: ' + fields.get('phone'),
      ...(fields.get('location') ? ['Location: ' + fields.get('location')] : []),
      ...(fields.get('budget') ? ['Budget: ' + fields.get('budget')] : []),
      'Brief: ' + fields.get('brief')
    ];
    preview.value = lines.join('\n');
    fallback.hidden = false;
    status.textContent = '';
    const separator = /iPhone|iPad|iPod/.test(navigator.userAgent) ? '&' : '?';
    location.href = 'sms:+2348092323235' + separator + 'body=' + encodeURIComponent(preview.value);
  });
  document.querySelector('#copy-booking').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(preview.value);
      status.textContent = 'Request copied.';
    } catch {
      preview.focus();
      preview.select();
      status.textContent = 'Copy the selected request to send it.';
    }
  });
}
