import type { RowDataPacket } from 'mysql2/promise';

export interface WebsiteRow extends RowDataPacket {
  id: number
  name: string
  domain: string | null
}

export interface BlockRow extends RowDataPacket {
  id: number
  websiteId: number
  blockTypeName: string
  sortOrder: number
}

export interface BlockFieldRow extends RowDataPacket {
  id: number
  blockId: number
  fieldName: string
  fieldValue: string | null
}

export interface BlockItemRow extends RowDataPacket {
  id: number
  blockId: number
  itemType: string
  sortOrder: number
}

export interface BlockItemFieldRow extends RowDataPacket {
  id: number
  blockItemId: number
  fieldName: string
  fieldValue: string | null
}

export interface ContentItemField {
  id: number
  fieldName: string
  fieldValue: string
}

export interface ContentItem {
  id: number
  itemType: string
  sortOrder: number
  fields: ContentItemField[]
}

export interface ContentField {
  id: number
  fieldName: string
  fieldValue: string
}

export interface ContentBlock {
  id: number
  blockTypeName: string
  sortOrder: number
  fields: ContentField[]
  items: ContentItem[]
}

export interface WebsiteContent {
  id: number
  name: string
  domain: string
  blocks: ContentBlock[]
}
