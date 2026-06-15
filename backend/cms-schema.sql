-- CMS Database Schema for Multi-site Content Management
-- Run this in your MySQL database to set up the tables

-- Drop tables if they exist (for clean rebuild)
DROP TABLE IF EXISTS block_item_fields;
DROP TABLE IF EXISTS block_items;
DROP TABLE IF EXISTS block_fields;
DROP TABLE IF EXISTS website_blocks;
DROP TABLE IF EXISTS block_types;
DROP TABLE IF EXISTS websites;

-- Create websites table
CREATE TABLE IF NOT EXISTS websites (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  domain VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create block types table
CREATE TABLE IF NOT EXISTS block_types (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) UNIQUE NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create website blocks table
CREATE TABLE IF NOT EXISTS website_blocks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  website_id INT NOT NULL,
  block_type_id INT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (website_id) REFERENCES websites(id) ON DELETE CASCADE,
  FOREIGN KEY (block_type_id) REFERENCES block_types(id),
  INDEX idx_website_id (website_id),
  INDEX idx_sort_order (sort_order)
);

-- Create block fields table (for block-level data like headings, descriptions)
CREATE TABLE IF NOT EXISTS block_fields (
  id INT PRIMARY KEY AUTO_INCREMENT,
  block_id INT NOT NULL,
  field_name VARCHAR(100) NOT NULL,
  field_value LONGTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (block_id) REFERENCES website_blocks(id) ON DELETE CASCADE,
  INDEX idx_block_id (block_id)
);

-- Create block items table (for repeating items like features, sectors)
CREATE TABLE IF NOT EXISTS block_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  block_id INT NOT NULL,
  item_type VARCHAR(50),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (block_id) REFERENCES website_blocks(id) ON DELETE CASCADE,
  INDEX idx_block_id (block_id),
  INDEX idx_sort_order (sort_order)
);

-- Create block item fields table (for fields within items)
CREATE TABLE IF NOT EXISTS block_item_fields (
  id INT PRIMARY KEY AUTO_INCREMENT,
  block_item_id INT NOT NULL,
  field_name VARCHAR(100) NOT NULL,
  field_value LONGTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (block_item_id) REFERENCES block_items(id) ON DELETE CASCADE,
  INDEX idx_block_item_id (block_item_id)
);
