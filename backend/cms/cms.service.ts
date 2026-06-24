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

export const updateBlockOrder = async (blockIds: number[]): Promise<void> => {
  const db = await connection;

  await db.beginTransaction();

  try {
    for (const [index, blockId] of blockIds.entries()) {
      await db.query(
        'UPDATE website_blocks SET sort_order = ? WHERE id = ?;',
        [index + 1, blockId],
      );
    }

    await db.commit();
  }
  catch (error) {
    await db.rollback();

    throw error;
  }
};
