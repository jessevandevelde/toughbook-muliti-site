import type { Request, Response } from 'express';
import { cmsPage } from './cms.page.js';
import { getCmsTree, updateFieldValue } from './cms.service.js';
import type { FieldValuePayload } from './types/cms.interfaces.js';

const badRequestStatus = 400;
const internalServerErrorStatus = 500;

const hasFieldValue = (value: unknown): value is FieldValuePayload => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }

  return 'fieldValue' in value && typeof value.fieldValue === 'string';
};

const getRouteId = (value: string | string[]): string => {
  return Array.isArray(value) ? value[0] : value;
};

export const getCmsPage = (_req: Request, res: Response): void => {
  res.type('html').send(cmsPage);
};

export const getCmsTreeHandler = async (_req: Request, res: Response): Promise<void> => {
  try {
    const websites = await getCmsTree();

    res.json({
      websites,
    });
  }
  catch (error) {
    console.error('Failed to load CMS tree.');
    console.error(error);

    res.status(internalServerErrorStatus).json({
      message: 'Failed to load CMS tree.',
    });
  }
};

export const updateBlockFieldHandler = async (req: Request, res: Response): Promise<void> => {
  const body: unknown = req.body;

  if (!hasFieldValue(body)) {
    res.status(badRequestStatus).json({
      message: 'Invalid field value.',
    });

    return;
  }

  try {
    await updateFieldValue('block_fields', getRouteId(req.params.id), body.fieldValue);

    res.json({
      message: 'Field updated.',
    });
  }
  catch (error) {
    console.error('Failed to update block field.');
    console.error(error);

    res.status(internalServerErrorStatus).json({
      message: 'Failed to update block field.',
    });
  }
};

export const updateBlockItemFieldHandler = async (req: Request, res: Response): Promise<void> => {
  const body: unknown = req.body;

  if (!hasFieldValue(body)) {
    res.status(badRequestStatus).json({
      message: 'Invalid field value.',
    });

    return;
  }

  try {
    await updateFieldValue('block_item_fields', getRouteId(req.params.id), body.fieldValue);

    res.json({
      message: 'Item field updated.',
    });
  }
  catch (error) {
    console.error('Failed to update item field.');
    console.error(error);

    res.status(internalServerErrorStatus).json({
      message: 'Failed to update item field.',
    });
  }
};
