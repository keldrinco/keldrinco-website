-- Adds the two fields the redesigned contact form collects.
-- Additive and safe: both columns are nullable, so existing rows and the
-- current API both keep working whether or not this has been applied.
--
-- Run against the shared "Keldrin OS" Supabase project
-- (xorkgbbjpdfpkiflrkeo) before deploying the new form, or the API silently
-- falls back to folding phone/intent into the message body.

alter table public.website_contact_submissions
  add column if not exists phone  text,
  add column if not exists intent text;

comment on column public.website_contact_submissions.phone  is 'Optional phone number from the keldrin.co contact form.';
comment on column public.website_contact_submissions.intent is 'Self-selected reason for reaching out (owner / broker / lender / operator / other).';
