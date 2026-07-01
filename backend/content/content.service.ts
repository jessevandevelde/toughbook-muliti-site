import { connection } from '../database/connection.js';
import type {
  BlockFieldRow,
  BlockItemFieldRow,
  BlockItemRow,
  BlockRow,
  WebsiteContent,
  WebsiteRow,
} from './types/content.interfaces.js';

export const getWebsiteContentTree = async (): Promise<WebsiteContent[]> => {
  const db = await connection;

  const [websiteRows] = await db.query<WebsiteRow[]>('SELECT id, name, domain FROM websites ORDER BY id ASC;');

  const [blockRows] = await db.query<BlockRow[]>(
    'SELECT website_blocks.id, website_blocks.website_id AS websiteId, website_blocks.sort_order AS sortOrder, block_types.name AS blockTypeName FROM website_blocks INNER JOIN block_types ON block_types.id = website_blocks.block_type_id ORDER BY website_blocks.website_id ASC, website_blocks.sort_order ASC, website_blocks.id ASC;',
  );

  const [blockFieldRows] = await db.query<BlockFieldRow[]>(
    'SELECT id, block_id AS blockId, field_name AS fieldName, field_value AS fieldValue FROM block_fields ORDER BY block_id ASC, id ASC;',
  );

  const [blockItemRows] = await db.query<BlockItemRow[]>(
    'SELECT id, block_id AS blockId, item_type AS itemType, sort_order AS sortOrder FROM block_items ORDER BY block_id ASC, sort_order ASC, id ASC;',
  );

  const [blockItemFieldRows] = await db.query<BlockItemFieldRow[]>(
    'SELECT id, block_item_id AS blockItemId, field_name AS fieldName, field_value AS fieldValue FROM block_item_fields ORDER BY block_item_id ASC, id ASC;',
  );

  return websiteRows.map((websiteRow) => {
    const websiteBlocks = blockRows
      .filter(blockRow => blockRow.websiteId === websiteRow.id)
      .map((blockRow) => {
        const fields = blockFieldRows
          .filter(fieldRow => fieldRow.blockId === blockRow.id)
          .map(fieldRow => ({
            id: fieldRow.id,
            fieldName: fieldRow.fieldName,
            fieldValue: fieldRow.fieldValue ?? '',
          }));

        const items = blockItemRows
          .filter(itemRow => itemRow.blockId === blockRow.id)
          .map(itemRow => ({
            id: itemRow.id,
            itemType: itemRow.itemType,
            sortOrder: itemRow.sortOrder,
            fields: blockItemFieldRows
              .filter(itemFieldRow => itemFieldRow.blockItemId === itemRow.id)
              .map(itemFieldRow => ({
                id: itemFieldRow.id,
                fieldName: itemFieldRow.fieldName,
                fieldValue: itemFieldRow.fieldValue ?? '',
              })),
          }));

        return {
          id: blockRow.id,
          blockTypeName: blockRow.blockTypeName,
          sortOrder: blockRow.sortOrder,
          fields,
          items,
        };
      });

    return {
      id: websiteRow.id,
      name: websiteRow.name,
      domain: websiteRow.domain ?? '',
      blocks: websiteBlocks,
    };
  });
};

export const getWebsiteContentById = async (websiteId: string): Promise<WebsiteContent | null> => {
  const websites = await getWebsiteContentTree();
  const numericWebsiteId = Number(websiteId);

  return websites.find(website => website.id === numericWebsiteId) ?? null;
};

export const getWebsiteContentByDomain = async (domain: string): Promise<WebsiteContent | null> => {
  const websites = await getWebsiteContentTree();

  return websites.find(website => website.domain === domain) ?? null;
};

export const getSharedFooterContent = async (): Promise<WebsiteContent | null> => {
  return getWebsiteContentByDomain('shared-footer');
};
