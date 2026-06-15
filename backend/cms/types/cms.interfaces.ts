export type {
  ContentBlock as CmsBlock,
  ContentField as CmsField,
  ContentItem as CmsItem,
  ContentItemField as CmsItemField,
  WebsiteContent as CmsWebsite,
} from '../../content/types/content.interfaces.js';

export interface FieldValuePayload {
  fieldValue: string
}

export interface BlockOrderPayload {
  blockIds: number[]
}
