import { connection } from '../database/connection.js';
import { getWebsiteContentTree } from '../content/content.service.js';
import type { CmsWebsite } from './types/cms.interfaces.js';

export const getCmsTree = async (): Promise<CmsWebsite[]> => {
  return getWebsiteContentTree();
};

export const updateFieldValue = async (
  tableName: 'block_fields' | 'block_item_fields',
  id: string,
  fieldValue: string,
): Promise<void> => {
  const db = await connection;

  await db.query(
    `UPDATE \`${tableName}\` SET field_value = ? WHERE id = ?;`,
    [fieldValue, id],
  );
};
