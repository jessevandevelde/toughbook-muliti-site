import nodemailer from 'nodemailer';
import type { ContactRequest } from './types/contact.interfaces.js';

const escapeHtml = (value: string): string => {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('\'', '&#39;')
    .replaceAll('"', '&quot;');
};

const getDisplayValue = (value: string): string => {
  return value ? escapeHtml(value) : '&mdash;';
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendContactRequest = async (contactRequest: ContactRequest): Promise<void> => {
  const name = escapeHtml(contactRequest.name);
  const email = escapeHtml(contactRequest.email);

  await transporter.sendMail({
    from: `"Toughbook Website" <${process.env.MAIL_USER ?? ''}>`,
    to: process.env.MAIL_TO,
    subject: `Nieuwe offerteaanvraag van ${contactRequest.name}`,
    html: `
      <h2>Nieuwe offerteaanvraag</h2>
      <table cellpadding="8" style="border-collapse:collapse;">
        <tr><td><strong>Naam</strong></td><td>${name}</td></tr>
        <tr><td><strong>Bedrijf</strong></td><td>${getDisplayValue(contactRequest.company)}</td></tr>
        <tr><td><strong>E-mail</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td><strong>Telefoon</strong></td><td>${getDisplayValue(contactRequest.phone)}</td></tr>
        <tr><td><strong>Model</strong></td><td>${getDisplayValue(contactRequest.model)}</td></tr>
        <tr><td><strong>Aantal</strong></td><td>${getDisplayValue(contactRequest.quantity)}</td></tr>
        <tr><td><strong>Bericht</strong></td><td>${escapeHtml(contactRequest.message)}</td></tr>
        <tr><td><strong>Ontvangen op</strong></td><td>${new Date().toLocaleString('nl-NL')}</td></tr>
      </table>
    `,
  });
};
