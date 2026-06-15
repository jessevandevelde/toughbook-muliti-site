-- Clean CMS Seed Data
SET FOREIGN_KEY_CHECKS=0;
TRUNCATE TABLE block_item_fields;
TRUNCATE TABLE block_items;
TRUNCATE TABLE block_fields;
TRUNCATE TABLE website_blocks;
TRUNCATE TABLE block_types;
TRUNCATE TABLE websites;
SET FOREIGN_KEY_CHECKS=1;

-- INSERT WEBSITE
INSERT INTO websites (name, domain) VALUES ('Souf', 'souf.nl');
SET @website_id = LAST_INSERT_ID();

-- INSERT BLOCK TYPES
INSERT INTO block_types (name, description) VALUES
  ('hero', 'Hero section'),
  ('features', 'Features'),
  ('sectors', 'Sectors'),
  ('specs', 'Specifications'),
  ('gallery', 'Gallery'),
  ('cta', 'Call-to-action'),
  ('testimonials', 'Testimonials'),
  ('footer', 'Footer');

-- === HERO BLOCK ===
INSERT INTO website_blocks (website_id, block_type_id, sort_order) VALUES (@website_id, 1, 0);
SET @hero_block_id = LAST_INSERT_ID();

INSERT INTO block_fields (block_id, field_name, field_value) VALUES
  (@hero_block_id, 'page_title', 'Panasonic Toughbook 40 MK2'),
  (@hero_block_id, 'badge', 'MISSION CRITICAL // MK-2 DEPLOYMENT'),
  (@hero_block_id, 'heading_main', 'ENGINEERED FOR'),
  (@hero_block_id, 'heading_accent', 'EXTREME'),
  (@hero_block_id, 'heading_secondary', 'FRONTIERS'),
  (@hero_block_id, 'description', 'De Panasonic Toughbook 40 MK2 &mdash; het meest veelzijdige 14" volledig robuuste werkstation ooit gebouwd. Voor defensie, industrie en de meest vijandige omstandigheden ter wereld.'),
  (@hero_block_id, 'cta_primary_text', 'Vraag Offerte Aan'),
  (@hero_block_id, 'cta_secondary_text', 'Bekijk Specs'),
  (@hero_block_id, 'image_url', '../images/toughbook-hero.jpg'),
  (@hero_block_id, 'price_old', '€ 4.885,00'),
  (@hero_block_id, 'price_new', '€ 4.640,75');

-- Hero stats
INSERT INTO block_items (block_id, item_type, sort_order) VALUES
  (@hero_block_id, 'stat', 0),
  (@hero_block_id, 'stat', 1),
  (@hero_block_id, 'stat', 2),
  (@hero_block_id, 'stat', 3);

INSERT INTO block_item_fields (block_item_id, field_name, field_value) VALUES
  ((SELECT id FROM block_items WHERE block_id=@hero_block_id AND sort_order=0), 'label', 'Drop Rating'),
  ((SELECT id FROM block_items WHERE block_id=@hero_block_id AND sort_order=0), 'value', '180cm'),
  ((SELECT id FROM block_items WHERE block_id=@hero_block_id AND sort_order=1), 'label', 'Display'),
  ((SELECT id FROM block_items WHERE block_id=@hero_block_id AND sort_order=1), 'value', '1.200 NIT'),
  ((SELECT id FROM block_items WHERE block_id=@hero_block_id AND sort_order=2), 'label', 'Ingress'),
  ((SELECT id FROM block_items WHERE block_id=@hero_block_id AND sort_order=2), 'value', 'IP66'),
  ((SELECT id FROM block_items WHERE block_id=@hero_block_id AND sort_order=3), 'label', 'Thermal'),
  ((SELECT id FROM block_items WHERE block_id=@hero_block_id AND sort_order=3), 'value', '-29° / +63°C');

-- === FEATURES BLOCK ===
INSERT INTO website_blocks (website_id, block_type_id, sort_order) VALUES (@website_id, 2, 1);
SET @features_block_id = LAST_INSERT_ID();

INSERT INTO block_fields (block_id, field_name, field_value) VALUES
  (@features_block_id, 'heading', 'GEBOUWD VOOR'),
  (@features_block_id, 'heading_accent', 'ZWAARSTE OMSTANDIGHEDEN'),
  (@features_block_id, 'description', 'De Toughbook 40 MK2 combineert militaire robuustheid met enterprise performance.');

INSERT INTO block_items (block_id, item_type, sort_order) VALUES
  (@features_block_id, 'feature', 0),
  (@features_block_id, 'feature', 1),
  (@features_block_id, 'feature', 2),
  (@features_block_id, 'feature', 3),
  (@features_block_id, 'feature', 4),
  (@features_block_id, 'feature', 5);

INSERT INTO block_item_fields (block_item_id, field_name, field_value) VALUES
  ((SELECT id FROM block_items WHERE block_id=@features_block_id AND sort_order=0 LIMIT 1), 'title', 'MIL-STD-810H Gecertificeerd'),
  ((SELECT id FROM block_items WHERE block_id=@features_block_id AND sort_order=0 LIMIT 1), 'description', 'Getest volgens strenge militaire normen.'),
  ((SELECT id FROM block_items WHERE block_id=@features_block_id AND sort_order=0 LIMIT 1), 'icon', '✓'),
  ((SELECT id FROM block_items WHERE block_id=@features_block_id AND sort_order=1 LIMIT 1), 'title', 'IP66 Waterbestendig'),
  ((SELECT id FROM block_items WHERE block_id=@features_block_id AND sort_order=1 LIMIT 1), 'description', 'Volledig beschermd tegen stof en water.'),
  ((SELECT id FROM block_items WHERE block_id=@features_block_id AND sort_order=1 LIMIT 1), 'icon', '💧'),
  ((SELECT id FROM block_items WHERE block_id=@features_block_id AND sort_order=2 LIMIT 1), 'title', '1.200 Nit Display'),
  ((SELECT id FROM block_items WHERE block_id=@features_block_id AND sort_order=2 LIMIT 1), 'description', 'Helder leesbaar in direct zonlicht.'),
  ((SELECT id FROM block_items WHERE block_id=@features_block_id AND sort_order=2 LIMIT 1), 'icon', '☀'),
  ((SELECT id FROM block_items WHERE block_id=@features_block_id AND sort_order=3 LIMIT 1), 'title', 'Hot-Swap Batterij'),
  ((SELECT id FROM block_items WHERE block_id=@features_block_id AND sort_order=3 LIMIT 1), 'description', 'Tot 18 uur autonomie in het veld.'),
  ((SELECT id FROM block_items WHERE block_id=@features_block_id AND sort_order=3 LIMIT 1), 'icon', '⚡'),
  ((SELECT id FROM block_items WHERE block_id=@features_block_id AND sort_order=4 LIMIT 1), 'title', 'Modulaire Uitbreidingen'),
  ((SELECT id FROM block_items WHERE block_id=@features_block_id AND sort_order=4 LIMIT 1), 'description', 'Configureerbaar met barcode-reader.'),
  ((SELECT id FROM block_items WHERE block_id=@features_block_id AND sort_order=4 LIMIT 1), 'icon', '🔧'),
  ((SELECT id FROM block_items WHERE block_id=@features_block_id AND sort_order=5 LIMIT 1), 'title', '5G & Satelliet'),
  ((SELECT id FROM block_items WHERE block_id=@features_block_id AND sort_order=5 LIMIT 1), 'description', 'Ingebouwde 5G LTE-module.'),
  ((SELECT id FROM block_items WHERE block_id=@features_block_id AND sort_order=5 LIMIT 1), 'icon', '📡');

-- === SECTORS BLOCK ===
INSERT INTO website_blocks (website_id, block_type_id, sort_order) VALUES (@website_id, 3, 2);
SET @sectors_block_id = LAST_INSERT_ID();

INSERT INTO block_fields (block_id, field_name, field_value) VALUES
  (@sectors_block_id, 'heading', 'INGEZET IN'),
  (@sectors_block_id, 'heading_accent', 'ELKE SECTOR');

INSERT INTO block_items (block_id, item_type, sort_order) VALUES
  (@sectors_block_id, 'sector', 0),
  (@sectors_block_id, 'sector', 1),
  (@sectors_block_id, 'sector', 2),
  (@sectors_block_id, 'sector', 3),
  (@sectors_block_id, 'sector', 4),
  (@sectors_block_id, 'sector', 5),
  (@sectors_block_id, 'sector', 6),
  (@sectors_block_id, 'sector', 7);

INSERT INTO block_item_fields (block_item_id, field_name, field_value) VALUES
  ((SELECT id FROM block_items WHERE block_id=@sectors_block_id AND sort_order=0 LIMIT 1), 'number', '01'),
  ((SELECT id FROM block_items WHERE block_id=@sectors_block_id AND sort_order=0 LIMIT 1), 'title', 'Defensie'),
  ((SELECT id FROM block_items WHERE block_id=@sectors_block_id AND sort_order=0 LIMIT 1), 'description', 'Voor krijgsmacht en politie.'),
  ((SELECT id FROM block_items WHERE block_id=@sectors_block_id AND sort_order=1 LIMIT 1), 'number', '02'),
  ((SELECT id FROM block_items WHERE block_id=@sectors_block_id AND sort_order=1 LIMIT 1), 'title', 'Olie & Gas'),
  ((SELECT id FROM block_items WHERE block_id=@sectors_block_id AND sort_order=1 LIMIT 1), 'description', 'Offshore-platforms.'),
  ((SELECT id FROM block_items WHERE block_id=@sectors_block_id AND sort_order=2 LIMIT 1), 'number', '03'),
  ((SELECT id FROM block_items WHERE block_id=@sectors_block_id AND sort_order=2 LIMIT 1), 'title', 'Utilities'),
  ((SELECT id FROM block_items WHERE block_id=@sectors_block_id AND sort_order=2 LIMIT 1), 'description', 'Netbeheer en inspectie.'),
  ((SELECT id FROM block_items WHERE block_id=@sectors_block_id AND sort_order=3 LIMIT 1), 'number', '04'),
  ((SELECT id FROM block_items WHERE block_id=@sectors_block_id AND sort_order=3 LIMIT 1), 'title', 'Transport'),
  ((SELECT id FROM block_items WHERE block_id=@sectors_block_id AND sort_order=3 LIMIT 1), 'description', 'Logistiek en tracking.'),
  ((SELECT id FROM block_items WHERE block_id=@sectors_block_id AND sort_order=4 LIMIT 1), 'number', '05'),
  ((SELECT id FROM block_items WHERE block_id=@sectors_block_id AND sort_order=4 LIMIT 1), 'title', 'Brandweer'),
  ((SELECT id FROM block_items WHERE block_id=@sectors_block_id AND sort_order=4 LIMIT 1), 'description', 'Ramp- en hulpverlening.'),
  ((SELECT id FROM block_items WHERE block_id=@sectors_block_id AND sort_order=5 LIMIT 1), 'number', '06'),
  ((SELECT id FROM block_items WHERE block_id=@sectors_block_id AND sort_order=5 LIMIT 1), 'title', 'Industrie'),
  ((SELECT id FROM block_items WHERE block_id=@sectors_block_id AND sort_order=5 LIMIT 1), 'description', 'Productie en fabricage.'),
  ((SELECT id FROM block_items WHERE block_id=@sectors_block_id AND sort_order=6 LIMIT 1), 'number', '07'),
  ((SELECT id FROM block_items WHERE block_id=@sectors_block_id AND sort_order=6 LIMIT 1), 'title', 'Gezondheidszorg'),
  ((SELECT id FROM block_items WHERE block_id=@sectors_block_id AND sort_order=6 LIMIT 1), 'description', 'Medische omgevingen.'),
  ((SELECT id FROM block_items WHERE block_id=@sectors_block_id AND sort_order=7 LIMIT 1), 'number', '08'),
  ((SELECT id FROM block_items WHERE block_id=@sectors_block_id AND sort_order=7 LIMIT 1), 'title', 'Mijnbouw'),
  ((SELECT id FROM block_items WHERE block_id=@sectors_block_id AND sort_order=7 LIMIT 1), 'description', 'Constructie en mining.');

-- === SPECS BLOCK ===
INSERT INTO website_blocks (website_id, block_type_id, sort_order) VALUES (@website_id, 4, 3);
SET @specs_block_id = LAST_INSERT_ID();

INSERT INTO block_fields (block_id, field_name, field_value) VALUES
  (@specs_block_id, 'section_label', '03 // Specs'),
  (@specs_block_id, 'title', 'TECHNISCHE'),
  (@specs_block_id, 'title_accent', 'SPECIFICATIES');

INSERT INTO block_items (block_id, item_type, sort_order) VALUES
  (@specs_block_id, 'spec', 0),
  (@specs_block_id, 'spec', 1),
  (@specs_block_id, 'spec', 2),
  (@specs_block_id, 'spec', 3),
  (@specs_block_id, 'spec', 4),
  (@specs_block_id, 'spec', 5),
  (@specs_block_id, 'spec', 6),
  (@specs_block_id, 'spec', 7),
  (@specs_block_id, 'spec', 8),
  (@specs_block_id, 'spec', 9),
  (@specs_block_id, 'spec', 10),
  (@specs_block_id, 'spec', 11),
  (@specs_block_id, 'spec', 12),
  (@specs_block_id, 'spec', 13),
  (@specs_block_id, 'spec', 14),
  (@specs_block_id, 'spec', 15),
  (@specs_block_id, 'spec', 16),
  (@specs_block_id, 'spec', 17),
  (@specs_block_id, 'spec', 18);

INSERT INTO block_item_fields (block_item_id, field_name, field_value) VALUES
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=0 LIMIT 1), 'label', 'Processor'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=0 LIMIT 1), 'value', 'Intel Core i7-1360P'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=0 LIMIT 1), 'category', 'processor'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=1 LIMIT 1), 'label', 'CPU Cores'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=1 LIMIT 1), 'value', '12-core'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=1 LIMIT 1), 'category', 'processor'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=2 LIMIT 1), 'label', 'RAM'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=2 LIMIT 1), 'value', '16 GB DDR4'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=2 LIMIT 1), 'category', 'processor'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=3 LIMIT 1), 'label', 'SSD'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=3 LIMIT 1), 'value', '512 GB NVMe'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=3 LIMIT 1), 'category', 'processor'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=4 LIMIT 1), 'label', 'OS'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=4 LIMIT 1), 'value', 'Windows 11 Pro'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=4 LIMIT 1), 'category', 'processor'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=5 LIMIT 1), 'label', 'Display'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=5 LIMIT 1), 'value', '14" Full HD'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=5 LIMIT 1), 'category', 'display'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=6 LIMIT 1), 'label', 'Helderheid'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=6 LIMIT 1), 'value', '1200 NITS'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=6 LIMIT 1), 'category', 'display'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=7 LIMIT 1), 'label', 'Touch'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=7 LIMIT 1), 'value', 'Ja + Handschoen'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=7 LIMIT 1), 'category', 'display'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=8 LIMIT 1), 'label', 'Certificering'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=8 LIMIT 1), 'value', 'MIL-STD-810H'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=8 LIMIT 1), 'category', 'rugged'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=9 LIMIT 1), 'label', 'IP-klasse'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=9 LIMIT 1), 'value', 'IP66'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=9 LIMIT 1), 'category', 'rugged'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=10 LIMIT 1), 'label', 'Valbestendig'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=10 LIMIT 1), 'value', '180 cm'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=10 LIMIT 1), 'category', 'rugged'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=11 LIMIT 1), 'label', 'Temp Operatie'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=11 LIMIT 1), 'value', '-29°C tot +63°C'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=11 LIMIT 1), 'category', 'rugged'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=12 LIMIT 1), 'label', 'Temp Opslag'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=12 LIMIT 1), 'value', '-57°C tot +71°C'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=12 LIMIT 1), 'category', 'rugged'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=13 LIMIT 1), 'label', 'Draadloos'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=13 LIMIT 1), 'value', 'Wi-Fi 6E'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=13 LIMIT 1), 'category', 'connectivity'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=14 LIMIT 1), 'label', 'Mobiel'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=14 LIMIT 1), 'value', '5G Sub-6'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=14 LIMIT 1), 'category', 'connectivity'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=15 LIMIT 1), 'label', 'Batterij'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=15 LIMIT 1), 'value', '2x Hot-Swap 18h'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=15 LIMIT 1), 'category', 'connectivity'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=16 LIMIT 1), 'label', 'Gewicht'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=16 LIMIT 1), 'value', '2.36 kg'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=16 LIMIT 1), 'category', 'connectivity'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=17 LIMIT 1), 'label', 'Poorten'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=17 LIMIT 1), 'value', 'USB x3, USB-C, HDMI'),
  ((SELECT id FROM block_items WHERE block_id=@specs_block_id AND sort_order=17 LIMIT 1), 'category', 'connectivity');

-- === GALLERY BLOCK ===
INSERT INTO website_blocks (website_id, block_type_id, sort_order) VALUES (@website_id, 5, 4);
SET @gallery_block_id = LAST_INSERT_ID();

INSERT INTO block_fields (block_id, field_name, field_value) VALUES
  (@gallery_block_id, 'section_label', '04 // Gallery'),
  (@gallery_block_id, 'title', 'IN HET'),
  (@gallery_block_id, 'title_accent', 'VELD GETEST');

INSERT INTO block_items (block_id, item_type, sort_order) VALUES
  (@gallery_block_id, 'image', 0),
  (@gallery_block_id, 'image', 1),
  (@gallery_block_id, 'image', 2),
  (@gallery_block_id, 'image', 3);

INSERT INTO block_item_fields (block_item_id, field_name, field_value) VALUES
  ((SELECT id FROM block_items WHERE block_id=@gallery_block_id AND sort_order=0 LIMIT 1), 'image_url', '../images/toughbook-1.jpg'),
  ((SELECT id FROM block_items WHERE block_id=@gallery_block_id AND sort_order=0 LIMIT 1), 'alt_text', 'Field'),
  ((SELECT id FROM block_items WHERE block_id=@gallery_block_id AND sort_order=1 LIMIT 1), 'image_url', '../images/toughbook-2.jpg'),
  ((SELECT id FROM block_items WHERE block_id=@gallery_block_id AND sort_order=1 LIMIT 1), 'alt_text', 'Keyboard'),
  ((SELECT id FROM block_items WHERE block_id=@gallery_block_id AND sort_order=2 LIMIT 1), 'image_url', '../images/toughbook-3.jpg'),
  ((SELECT id FROM block_items WHERE block_id=@gallery_block_id AND sort_order=2 LIMIT 1), 'alt_text', 'Ports'),
  ((SELECT id FROM block_items WHERE block_id=@gallery_block_id AND sort_order=3 LIMIT 1), 'image_url', '../images/toughbook-4.jpg'),
  ((SELECT id FROM block_items WHERE block_id=@gallery_block_id AND sort_order=3 LIMIT 1), 'alt_text', 'Outdoor');

-- === DOWNLOADS BLOCK ===
INSERT INTO website_blocks (website_id, block_type_id, sort_order) VALUES (@website_id, 6, 5);
SET @downloads_block_id = LAST_INSERT_ID();

INSERT INTO block_fields (block_id, field_name, field_value) VALUES
  (@downloads_block_id, 'section_label', '05 // Downloads'),
  (@downloads_block_id, 'title', 'DOCUMENTEN &'),
  (@downloads_block_id, 'title_accent', 'DOWNLOADS');

INSERT INTO block_items (block_id, item_type, sort_order) VALUES
  (@downloads_block_id, 'download', 0),
  (@downloads_block_id, 'download', 1),
  (@downloads_block_id, 'download', 2),
  (@downloads_block_id, 'download', 3),
  (@downloads_block_id, 'download', 4),
  (@downloads_block_id, 'download', 5);

INSERT INTO block_item_fields (block_item_id, field_name, field_value) VALUES
  ((SELECT id FROM block_items WHERE block_id=@downloads_block_id AND sort_order=0 LIMIT 1), 'name', 'Productdatasheet'),
  ((SELECT id FROM block_items WHERE block_id=@downloads_block_id AND sort_order=0 LIMIT 1), 'file_type', 'PDF'),
  ((SELECT id FROM block_items WHERE block_id=@downloads_block_id AND sort_order=0 LIMIT 1), 'file_size', '2.4 MB'),
  ((SELECT id FROM block_items WHERE block_id=@downloads_block_id AND sort_order=1 LIMIT 1), 'name', 'Handleiding'),
  ((SELECT id FROM block_items WHERE block_id=@downloads_block_id AND sort_order=1 LIMIT 1), 'file_type', 'PDF'),
  ((SELECT id FROM block_items WHERE block_id=@downloads_block_id AND sort_order=1 LIMIT 1), 'file_size', '8.1 MB'),
  ((SELECT id FROM block_items WHERE block_id=@downloads_block_id AND sort_order=2 LIMIT 1), 'name', 'Certificaat'),
  ((SELECT id FROM block_items WHERE block_id=@downloads_block_id AND sort_order=2 LIMIT 1), 'file_type', 'PDF'),
  ((SELECT id FROM block_items WHERE block_id=@downloads_block_id AND sort_order=2 LIMIT 1), 'file_size', '1.2 MB'),
  ((SELECT id FROM block_items WHERE block_id=@downloads_block_id AND sort_order=3 LIMIT 1), 'name', 'Configuratie Gids'),
  ((SELECT id FROM block_items WHERE block_id=@downloads_block_id AND sort_order=3 LIMIT 1), 'file_type', 'PDF'),
  ((SELECT id FROM block_items WHERE block_id=@downloads_block_id AND sort_order=3 LIMIT 1), 'file_size', '3.7 MB'),
  ((SELECT id FROM block_items WHERE block_id=@downloads_block_id AND sort_order=4 LIMIT 1), 'name', 'CE Docs'),
  ((SELECT id FROM block_items WHERE block_id=@downloads_block_id AND sort_order=4 LIMIT 1), 'file_type', 'ZIP'),
  ((SELECT id FROM block_items WHERE block_id=@downloads_block_id AND sort_order=4 LIMIT 1), 'file_size', '4.0 MB'),
  ((SELECT id FROM block_items WHERE block_id=@downloads_block_id AND sort_order=5 LIMIT 1), 'name', 'Drivers Win 11'),
  ((SELECT id FROM block_items WHERE block_id=@downloads_block_id AND sort_order=5 LIMIT 1), 'file_type', 'ZIP'),
  ((SELECT id FROM block_items WHERE block_id=@downloads_block_id AND sort_order=5 LIMIT 1), 'file_size', '512 MB');

-- === CTA BLOCK ===
INSERT INTO website_blocks (website_id, block_type_id, sort_order) VALUES (@website_id, 7, 6);
SET @cta_block_id = LAST_INSERT_ID();

INSERT INTO block_fields (block_id, field_name, field_value) VALUES
  (@cta_block_id, 'title', 'KLAAR VOOR DEPLOYMENT?'),
  (@cta_block_id, 'description', 'Vraag een offerte aan of neem contact op. Reageren binnen 24 uur.'),
  (@cta_block_id, 'cta_text', 'Vraag Offerte Aan →'),
  (@cta_block_id, 'cta_url', 'mailto:info@toughbook.nl');

-- === FOOTER BLOCK ===
INSERT INTO website_blocks (website_id, block_type_id, sort_order) VALUES (@website_id, 8, 7);
SET @footer_block_id = LAST_INSERT_ID();

INSERT INTO block_fields (block_id, field_name, field_value) VALUES
  (@footer_block_id, 'brand', 'TOUGHBOOK'),
  (@footer_block_id, 'brand_accent', '40 MK2'),
  (@footer_block_id, 'copyright', 'PANASONIC CONNECT • ALLE RECHTEN VOORBEHOUDEN');
