export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s().-]{7,20}$/;
const NAME_RE = /^[a-zA-Z\s'.-]{2,80}$/;
const URL_RE = /^https?:\/\/.+/i;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function hasErrors(errors: FieldErrors) {
  return Object.keys(errors).length > 0;
}

export function validateEmail(email: string): string | null {
  const v = email.trim();
  if (!v) return 'Email is required.';
  if (!EMAIL_RE.test(v)) return 'Please enter a valid email address.';
  if (v.length > 254) return 'Email is too long.';
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Password is required.';
  if (password.length < 8) return 'Password must be at least 8 characters.';
  return null;
}

export function validateName(name: string): string | null {
  const v = name.trim();
  if (!v) return 'Name is required.';
  if (v.length < 2) return 'Name must be at least 2 characters.';
  if (v.length > 80) return 'Name is too long.';
  if (!NAME_RE.test(v)) return 'Please enter a valid name (letters only).';
  return null;
}

export function validatePhone(phone: string, required = false): string | null {
  const v = phone.trim();
  if (!v) return required ? 'Phone number is required.' : null;
  const digits = v.replace(/\D/g, '');
  if (digits.length < 7 || digits.length > 15) return 'Please enter a valid phone number.';
  if (!PHONE_RE.test(v)) return 'Please enter a valid phone number.';
  return null;
}

export function validateBudget(budget: string): string | null {
  if (!budget?.trim() || budget === 'Select your Budget') return 'Please select a budget range.';
  return null;
}

export function validateProjectDetails(text: string): string | null {
  const v = text.trim();
  if (!v) return 'Project details are required.';
  if (v.length < 10) return 'Please provide more details (at least 10 characters).';
  if (v.length > 5000) return 'Project details must be under 5000 characters.';
  return null;
}

export function validatePrivacy(accepted: boolean): string | null {
  if (!accepted) return 'You must accept the privacy policy to continue.';
  return null;
}

export function validateContactForm(form: {
  name: string;
  phone: string;
  email: string;
  budget: string;
  project_details: string;
  privacy_accepted: boolean;
}): FieldErrors {
  const errors: FieldErrors = {};
  const nameErr = validateName(form.name);
  if (nameErr) errors.name = nameErr;
  const emailErr = validateEmail(form.email);
  if (emailErr) errors.email = emailErr;
  const phoneErr = validatePhone(form.phone);
  if (phoneErr) errors.phone = phoneErr;
  const budgetErr = validateBudget(form.budget);
  if (budgetErr) errors.budget = budgetErr;
  const detailsErr = validateProjectDetails(form.project_details);
  if (detailsErr) errors.project_details = detailsErr;
  const privacyErr = validatePrivacy(form.privacy_accepted);
  if (privacyErr) errors.privacy_accepted = privacyErr;
  return errors;
}

export function validateLoginForm(email: string, password: string): FieldErrors {
  const errors: FieldErrors = {};
  const emailErr = validateEmail(email);
  if (emailErr) errors.email = emailErr;
  // Login only checks non-empty — strength rules are for creating new passwords
  if (!password.trim()) errors.password = 'Password is required.';
  return errors;
}

export function validateRequired(value: string, label: string, min = 2, max = 500): string | null {
  const v = value?.trim() ?? '';
  if (!v) return `${label} is required.`;
  if (v.length < min) return `${label} must be at least ${min} characters.`;
  if (v.length > max) return `${label} is too long (max ${max} characters).`;
  return null;
}

export function validateOptionalUrl(url: string): string | null {
  const v = url?.trim();
  if (!v) return null;
  if (!URL_RE.test(v)) return 'Please enter a valid URL starting with http:// or https://';
  return null;
}

export function validateSlug(slug: string): string | null {
  const v = slug?.trim();
  if (!v) return null;
  if (!SLUG_RE.test(v)) return 'Slug must be lowercase letters, numbers, and hyphens only.';
  return null;
}

export function validateBlogForm(form: { title: string; content: string; slug?: string; image_url?: string }): FieldErrors {
  const errors: FieldErrors = {};
  const titleErr = validateRequired(form.title, 'Title', 3, 200);
  if (titleErr) errors.title = titleErr;
  const contentErr = validateRequired(form.content, 'Content', 10, 50000);
  if (contentErr) errors.content = contentErr;
  const slugErr = validateSlug(form.slug || '');
  if (slugErr) errors.slug = slugErr;
  const urlErr = validateOptionalUrl(form.image_url || '');
  if (urlErr) errors.image_url = urlErr;
  return errors;
}

export function validateServiceForm(form: { title: string; description: string; slug?: string; image_url?: string }): FieldErrors {
  const errors: FieldErrors = {};
  const titleErr = validateRequired(form.title, 'Title', 3, 200);
  if (titleErr) errors.title = titleErr;
  const descErr = validateRequired(form.description, 'Description', 10, 2000);
  if (descErr) errors.description = descErr;
  const slugErr = validateSlug(form.slug || '');
  if (slugErr) errors.slug = slugErr;
  const urlErr = validateOptionalUrl(form.image_url || '');
  if (urlErr) errors.image_url = urlErr;
  return errors;
}

export function validateCaseStudyForm(form: {
  title: string; client: string; challenge: string; solution: string; slug?: string; image_url?: string;
}): FieldErrors {
  const errors: FieldErrors = {};
  for (const [key, label] of [
    ['title', 'Title'],
    ['client', 'Client'],
    ['challenge', 'Challenge'],
    ['solution', 'Solution'],
  ] as const) {
    const err = validateRequired(form[key], label, 3, 500);
    if (err) errors[key] = err;
  }
  const slugErr = validateSlug(form.slug || '');
  if (slugErr) errors.slug = slugErr;
  const urlErr = validateOptionalUrl(form.image_url || '');
  if (urlErr) errors.image_url = urlErr;
  return errors;
}

export function validateTestimonialForm(form: { name: string; company: string; quote: string }): FieldErrors {
  const errors: FieldErrors = {};
  const nameErr = validateRequired(form.name, 'Name', 2, 100);
  if (nameErr) errors.name = nameErr;
  const companyErr = validateRequired(form.company, 'Company', 2, 150);
  if (companyErr) errors.company = companyErr;
  const quoteErr = validateRequired(form.quote, 'Quote', 10, 2000);
  if (quoteErr) errors.quote = quoteErr;
  return errors;
}

export function validatePortfolioForm(form: { title: string; image_url?: string }): FieldErrors {
  const errors: FieldErrors = {};
  const titleErr = validateRequired(form.title, 'Title', 2, 150);
  if (titleErr) errors.title = titleErr;
  const urlErr = validateOptionalUrl(form.image_url || '');
  if (urlErr) errors.image_url = urlErr;
  return errors;
}

export function validateFaqForm(form: { question: string; answer: string }): FieldErrors {
  const errors: FieldErrors = {};
  const qErr = validateRequired(form.question, 'Question', 5, 500);
  if (qErr) errors.question = qErr;
  const aErr = validateRequired(form.answer, 'Answer', 5, 5000);
  if (aErr) errors.answer = aErr;
  return errors;
}

export function validateProductForm(form: { title: string; description: string; slug?: string; image_url?: string; price?: string }): FieldErrors {
  const errors: FieldErrors = {};
  const titleErr = validateRequired(form.title, 'Title', 3, 200);
  if (titleErr) errors.title = titleErr;
  const descErr = validateRequired(form.description, 'Description', 10, 2000);
  if (descErr) errors.description = descErr;
  const slugErr = validateSlug(form.slug || '');
  if (slugErr) errors.slug = slugErr;
  const urlErr = validateOptionalUrl(form.image_url || '');
  if (urlErr) errors.image_url = urlErr;
  if (form.price?.trim() && form.price.trim().length > 20) errors.price = 'Price is too long.';
  return errors;
}

export function validateToolForm(form: { title: string; description: string; slug?: string }): FieldErrors {
  const errors: FieldErrors = {};
  const titleErr = validateRequired(form.title, 'Title', 3, 200);
  if (titleErr) errors.title = titleErr;
  const descErr = validateRequired(form.description, 'Description', 10, 2000);
  if (descErr) errors.description = descErr;
  const slugErr = validateSlug(form.slug || '');
  if (slugErr) errors.slug = slugErr;
  return errors;
}

export function validateGuidebookForm(form: { title: string; description: string; slug?: string; image_url?: string }): FieldErrors {
  const errors: FieldErrors = {};
  const titleErr = validateRequired(form.title, 'Title', 3, 200);
  if (titleErr) errors.title = titleErr;
  const descErr = validateRequired(form.description, 'Description', 10, 2000);
  if (descErr) errors.description = descErr;
  const slugErr = validateSlug(form.slug || '');
  if (slugErr) errors.slug = slugErr;
  const urlErr = validateOptionalUrl(form.image_url || '');
  if (urlErr) errors.image_url = urlErr;
  return errors;
}

export const fieldClass = (base: string, hasError: boolean) =>
  `${base} ${hasError ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : ''}`;
