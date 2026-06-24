import type { Request, Response } from 'express';
import { sendContactRequest } from './contact.service.js';
import type { ContactRequest } from './types/contact.interfaces.js';

const badRequestStatus = 400;
const createdStatus = 201;
const internalServerErrorStatus = 500;

const getBodyField = (body: unknown, key: keyof ContactRequest): string => {
  if (typeof body !== 'object' || body === null || Array.isArray(body) || !(key in body)) {
    return '';
  }

  const value: unknown = Reflect.get(body, key);

  return typeof value === 'string' ? value.trim() : '';
};

const getContactRequest = (body: unknown): ContactRequest => {
  return {
    name: getBodyField(body, 'name'),
    company: getBodyField(body, 'company'),
    email: getBodyField(body, 'email'),
    phone: getBodyField(body, 'phone'),
    message: getBodyField(body, 'message'),
  };
};

export const sendContactRequestHandler = async (req: Request, res: Response): Promise<void> => {
  const contactRequest = getContactRequest(req.body);

  if (!contactRequest.name || !contactRequest.email || !contactRequest.message) {
    res.status(badRequestStatus).json({
      error: 'Naam, e-mail en bericht zijn verplicht.',
    });

    return;
  }

  try {
    await sendContactRequest(contactRequest);

    res.status(createdStatus).json({
      message: 'Je aanvraag is verzonden. We nemen snel contact op!',
    });
  }
  catch (error) {
    console.error('Failed to send contact request.');
    console.error(error);

    res.status(internalServerErrorStatus).json({
      error: 'Verzenden mislukt. Probeer het later opnieuw.',
    });
  }
};
