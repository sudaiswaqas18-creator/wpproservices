const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s().-]{7,20}$/;
const NAME_RE = /^[a-zA-Z\s'.-]{2,80}$/;

export function validateContactPayload(body) {
  const { name, phone, email, budget, project_details, privacy_accepted } = body ?? {};
  const errors = {};

  const n = name?.trim();
  if (!n) errors.name = 'Name is required.';
  else if (n.length < 2) errors.name = 'Name must be at least 2 characters.';
  else if (n.length > 80) errors.name = 'Name is too long.';
  else if (!NAME_RE.test(n)) errors.name = 'Please enter a valid name.';

  const e = email?.trim();
  if (!e) errors.email = 'Email is required.';
  else if (!EMAIL_RE.test(e)) errors.email = 'Please enter a valid email address.';
  else if (e.length > 254) errors.email = 'Email is too long.';

  if (phone?.trim()) {
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 7 || digits.length > 15 || !PHONE_RE.test(phone.trim())) {
      errors.phone = 'Please enter a valid phone number.';
    }
  }

  if (!budget?.trim()) errors.budget = 'Please select a budget range.';

  const details = project_details?.trim();
  if (!details) errors.project_details = 'Project details are required.';
  else if (details.length < 20) errors.project_details = 'Please provide at least 20 characters.';
  else if (details.length > 5000) errors.project_details = 'Project details are too long.';

  if (!privacy_accepted) errors.privacy_accepted = 'You must accept the privacy policy.';

  return errors;
}

export function firstError(errors) {
  const keys = Object.keys(errors);
  return keys.length ? errors[keys[0]] : null;
}
