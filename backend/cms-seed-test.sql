-- Simple seed test with schema recreation
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS block_item_fields;
DROP TABLE IF EXISTS block_items;
DROP TABLE IF EXISTS block_fields;
DROP TABLE IF EXISTS website_blocks;
DROP TABLE IF EXISTS block_types;
DROP TABLE IF EXISTS websites;
SET FOREIGN_KEY_CHECKS=1;

CREATE TABLE websites (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  domain VARCHAR(255) UNIQUE
);

CREATE TABLE block_types (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) UNIQUE NOT NULL,
  description VARCHAR(255)
);

CREATE TABLE website_blocks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  website_id INT NOT NULL,
  block_type_id INT NOT NULL,
  sort_order INT DEFAULT 0,
  FOREIGN KEY (website_id) REFERENCES websites(id) ON DELETE CASCADE,
  FOREIGN KEY (block_type_id) REFERENCES block_types(id)
);

CREATE TABLE block_fields (
  id INT PRIMARY KEY AUTO_INCREMENT,
  block_id INT NOT NULL,
  field_name VARCHAR(100) NOT NULL,
  field_value LONGTEXT,
  FOREIGN KEY (block_id) REFERENCES website_blocks(id) ON DELETE CASCADE
);

-- Test data
INSERT INTO websites (name, domain) VALUES ('Souf', 'souf.nl');
INSERT INTO block_types (name, description) VALUES 
  ('hero', 'Hero'),
  ('features', 'Features');

INSERT INTO website_blocks (website_id, block_type_id, sort_order) VALUES (1, 1, 0);
INSERT INTO block_fields (block_id, field_name, field_value) VALUES (1, 'page_title', 'Test');
