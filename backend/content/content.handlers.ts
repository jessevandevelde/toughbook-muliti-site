import type { Request, Response } from 'express';
import {
  getWebsiteContentByDomain,
  getWebsiteContentById,
  getSharedFooterContent,
  getWebsiteContentTree,
} from './content.service.js';

const badRequestStatus = 400;
const notFoundStatus = 404;
const internalServerErrorStatus = 500;

const preventResponseCaching = (res: Response): void => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Expires', '0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Surrogate-Control', 'no-store');
};

const getRouteParam = (value: string | string[]): string => {
  return Array.isArray(value) ? value[0] : value;
};

export const getAllWebsiteContentHandler = async (_req: Request, res: Response): Promise<void> => {
  preventResponseCaching(res);

  try {
    const websites = await getWebsiteContentTree();

    res.json({
      websites,
    });
  }
  catch (error) {
    console.error('Failed to load website content.');
    console.error(error);

    res.status(internalServerErrorStatus).json({
      message: 'Failed to load website content.',
    });
  }
};

export const getWebsiteContentByIdHandler = async (req: Request, res: Response): Promise<void> => {
  preventResponseCaching(res);

  if (!req.params.websiteId) {
    res.status(badRequestStatus).json({
      message: 'Website id is required.',
    });

    return;
  }

  try {
    const website = await getWebsiteContentById(getRouteParam(req.params.websiteId));

    if (!website) {
      res.status(notFoundStatus).json({
        message: 'Website not found.',
      });

      return;
    }

    res.json({
      website,
    });
  }
  catch (error) {
    console.error('Failed to load website by id.');
    console.error(error);

    res.status(internalServerErrorStatus).json({
      message: 'Failed to load website by id.',
    });
  }
};

export const getWebsiteContentByDomainHandler = async (req: Request, res: Response): Promise<void> => {
  preventResponseCaching(res);

  if (!req.params.domain) {
    res.status(badRequestStatus).json({
      message: 'Domain is required.',
    });

    return;
  }

  try {
    const website = await getWebsiteContentByDomain(getRouteParam(req.params.domain));

    if (!website) {
      res.status(notFoundStatus).json({
        message: 'Website not found.',
      });

      return;
    }

    res.json({
      website,
    });
  }
  catch (error) {
    console.error('Failed to load website by domain.');
    console.error(error);

    res.status(internalServerErrorStatus).json({
      message: 'Failed to load website by domain.',
    });
  }
};

export const getSharedFooterContentHandler = async (_req: Request, res: Response): Promise<void> => {
  preventResponseCaching(res);

  try {
    const website = await getSharedFooterContent();
    const footer = website?.blocks.find(block => block.blockTypeName === 'footer_block');

    if (!website || !footer) {
      res.status(notFoundStatus).json({
        message: 'Shared footer not found.',
      });

      return;
    }

    res.json({
      website,
      footer,
    });
  }
  catch (error) {
    console.error('Failed to load shared footer.');
    console.error(error);

    res.status(internalServerErrorStatus).json({
      message: 'Failed to load shared footer.',
    });
  }
};
