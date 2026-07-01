-- Sample CMS Content for Toughbook Website
-- Run this AFTER cms-schema.sql to populate sample content

-- === INSERT WEBSITE ===
INSERT INTO websites (name, domain) VALUES ('Toughbook 40 Dutch', 'toughbook-40-dutch.nl');
SET @website_id = LAST_INSERT_ID();

-- === INSERT BLOCK TYPES ===
INSERT INTO block_types (name, description) VALUES
  ('hero', 'Hero section with main headline, image and CTA'),
  ('features', 'Features block with feature items'),
  ('sectors', 'Sectors block with sector items'),
  ('specs', 'Technical specifications'),
  ('gallery', 'Image gallery'),
  ('cta', 'Call-to-action section'),
  ('testimonials', 'Customer testimonials'),
  ('faq', 'Frequently asked questions'),
  ('spec_sheet_button_block', 'Hero spec sheet download button');

-- Get IDs for block types
SET @block_type_hero_id = 1;
SET @block_type_features_id = 2;
SET @block_type_sectors_id = 3;

-- === HERO BLOCK ===
INSERT INTO website_blocks (website_id, block_type_id, sort_order) 
VALUES (@website_id, @block_type_hero_id, 0);
SET @hero_block_id = LAST_INSERT_ID();

-- Hero block fields
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

-- Hero stats items
INSERT INTO block_items (block_id, item_type, sort_order) VALUES
  (@hero_block_id, 'stat', 0),
  (@hero_block_id, 'stat', 1),
  (@hero_block_id, 'stat', 2),
  (@hero_block_id, 'stat', 3);

SET @stat_1 = LAST_INSERT_ID() - 3;
SET @stat_2 = LAST_INSERT_ID() - 2;
SET @stat_3 = LAST_INSERT_ID() - 1;
SET @stat_4 = LAST_INSERT_ID();

INSERT INTO block_item_fields (block_item_id, field_name, field_value) VALUES
  (@stat_1, 'label', 'Drop Rating'),
  (@stat_1, 'value', '180cm'),
  (@stat_2, 'label', 'Display'),
  (@stat_2, 'value', '1.200 NIT'),
  (@stat_3, 'label', 'Ingress'),
  (@stat_3, 'value', 'IP66'),
  (@stat_4, 'label', 'Thermal'),
  (@stat_4, 'value', '-29° / +63°C');

-- === FEATURES BLOCK ===
INSERT INTO website_blocks (website_id, block_type_id, sort_order) 
VALUES (@website_id, @block_type_features_id, 1);
SET @features_block_id = LAST_INSERT_ID();

-- Features block fields
INSERT INTO block_fields (block_id, field_name, field_value) VALUES
  (@features_block_id, 'heading', 'GEBOUWD VOOR'),
  (@features_block_id, 'heading_accent', 'ZWAARSTE OMSTANDIGHEDEN'),
  (@features_block_id, 'description', 'De Toughbook 40 MK2 combineert militaire robuustheid met enterprise performance. Elk onderdeel is ontworpen om te overleven waar andere laptops falen.');

-- Feature items
INSERT INTO block_items (block_id, item_type, sort_order) VALUES
  (@features_block_id, 'feature', 0),
  (@features_block_id, 'feature', 1),
  (@features_block_id, 'feature', 2),
  (@features_block_id, 'feature', 3),
  (@features_block_id, 'feature', 4),
  (@features_block_id, 'feature', 5);

SET @feature_1 = LAST_INSERT_ID() - 5;
SET @feature_2 = LAST_INSERT_ID() - 4;
SET @feature_3 = LAST_INSERT_ID() - 3;
SET @feature_4 = LAST_INSERT_ID() - 2;
SET @feature_5 = LAST_INSERT_ID() - 1;
SET @feature_6 = LAST_INSERT_ID();

INSERT INTO block_item_fields (block_item_id, field_name, field_value) VALUES
  (@feature_1, 'title', 'MIL-STD-810H Gecertificeerd'),
  (@feature_1, 'description', 'Getest volgens strenge militaire normen. Schokbestendig, trillingbestendig en valbescherming tot 180cm.'),
  (@feature_1, 'icon', '&#9673;'),
  
  (@feature_2, 'title', 'IP66 Waterbestendig'),
  (@feature_2, 'description', 'Volledig beschermd tegen stof en krachtige waterstralen. Operationeel bij extreme weersomstandigheden.'),
  (@feature_2, 'icon', '&#127783;'),
  
  (@feature_3, 'title', '1.200 Nit Display'),
  (@feature_3, 'description', 'Helder leesbaar scherm in direct zonlicht. Touch- en handschoenbediening standaard inbegrepen.'),
  (@feature_3, 'icon', '&#9728;'),
  
  (@feature_4, 'title', 'Hot-Swap Batterij'),
  (@feature_4, 'description', 'Twee hotswap-batterijen voor non-stop operaties. Tot 18 uur autonomie in het veld zonder opladen.'),
  (@feature_4, 'icon', '&#9889;'),
  
  (@feature_5, 'title', 'Modulaire Uitbreidingen'),
  (@feature_5, 'description', 'Configureerbaar met barcode-reader, smartcard, RFID, vingerafdrukscanner en extra I/O-poorten.'),
  (@feature_5, 'icon', '&#128268;'),
  
  (@feature_6, 'title', '5G & Satelliet Klaar'),
  (@feature_6, 'description', 'Ingebouwde 5G LTE-module. Optioneel uitbreidbaar met satellietcommunicatie voor remote operaties.'),
  (@feature_6, 'icon', '&#128246;');

-- === SECTORS BLOCK ===
INSERT INTO website_blocks (website_id, block_type_id, sort_order) 
VALUES (@website_id, @block_type_sectors_id, 2);
SET @sectors_block_id = LAST_INSERT_ID();

-- Sectors block fields
INSERT INTO block_fields (block_id, field_name, field_value) VALUES
  (@sectors_block_id, 'heading', 'INGEZET IN'),
  (@sectors_block_id, 'heading_accent', 'ELKE SECTOR');

-- Sector items
INSERT INTO block_items (block_id, item_type, sort_order) VALUES
  (@sectors_block_id, 'sector', 0),
  (@sectors_block_id, 'sector', 1),
  (@sectors_block_id, 'sector', 2),
  (@sectors_block_id, 'sector', 3),
  (@sectors_block_id, 'sector', 4),
  (@sectors_block_id, 'sector', 5),
  (@sectors_block_id, 'sector', 6),
  (@sectors_block_id, 'sector', 7);

SET @sector_1 = LAST_INSERT_ID() - 7;
SET @sector_2 = LAST_INSERT_ID() - 6;
SET @sector_3 = LAST_INSERT_ID() - 5;
SET @sector_4 = LAST_INSERT_ID() - 4;
SET @sector_5 = LAST_INSERT_ID() - 3;
SET @sector_6 = LAST_INSERT_ID() - 2;
SET @sector_7 = LAST_INSERT_ID() - 1;
SET @sector_8 = LAST_INSERT_ID();

INSERT INTO block_item_fields (block_item_id, field_name, field_value) VALUES
  (@sector_1, 'number', '01'),
  (@sector_1, 'title', 'Defensie & Veiligheid'),
  (@sector_1, 'description', 'Ingezet door krijgsmacht en politie voor veldoperaties, surveillance en commandovoering.'),
  
  (@sector_2, 'number', '02'),
  (@sector_2, 'title', 'Olie & Gas'),
  (@sector_2, 'description', 'Operationeel op offshore-platforms en in explosiegevaarlijke zones (ATEX-gereed).'),
  
  (@sector_3, 'number', '03'),
  (@sector_3, 'title', 'Utilities & Energie'),
  (@sector_3, 'description', 'Voor inspectie van infrastructuur, netbeheer en storingsdiagnose in het veld.'),
  
  (@sector_4, 'number', '04'),
  (@sector_4, 'title', 'Transport & Logistiek'),
  (@sector_4, 'description', 'Betrouwbare data-invoer en tracking in havens, magazijnen en bij last-mile delivery.'),
  
  (@sector_5, 'number', '05'),
  (@sector_5, 'title', 'Brandweer & Hulpverlening'),
  (@sector_5, 'description', 'Hitte- en rook-resistent voor gebruik bij incidenten en rampbestrijding.'),
  
  (@sector_6, 'number', '06'),
  (@sector_6, 'title', 'Industrie & Productie'),
  (@sector_6, 'description', 'Robuuste werkplek voor fabrieks- en productieomgevingen met zware trillingen en vuil.'),
  
  (@sector_7, 'number', '07'),
  (@sector_7, 'title', 'Gezondheidszorg'),
  (@sector_7, 'description', 'Ontsmet-baar chassis voor gebruik in ziekenhuizen, ambulances en militaire medische posten.'),
  
  (@sector_8, 'number', '08'),
  (@sector_8, 'title', 'Mijnbouw & Constructie'),
  (@sector_8, 'description', 'Bedrijfszeker onder extreme druk, stof en temperatuurwisselingen op de werkplaats.');

-- === SPECS BLOCK ===
INSERT INTO website_blocks (website_id, block_type_id, sort_order) 
VALUES (@website_id, 4, 3);
SET @specs_block_id = LAST_INSERT_ID();

-- Specs block fields
INSERT INTO block_fields (block_id, field_name, field_value) VALUES
  (@specs_block_id, 'section_label', '03 // Specificaties'),
  (@specs_block_id, 'title', 'TECHNISCHE'),
  (@specs_block_id, 'title_accent', 'SPECIFICATIES');

-- Spec items (processor, display, robuustheid, connectiviteit)
INSERT INTO block_items (block_id, item_type, sort_order) VALUES
  (@specs_block_id, 'spec', 0),  -- Processor
  (@specs_block_id, 'spec', 1),  -- Cores
  (@specs_block_id, 'spec', 2),  -- RAM
  (@specs_block_id, 'spec', 3),  -- SSD
  (@specs_block_id, 'spec', 4),  -- OS
  (@specs_block_id, 'spec', 5),  -- Display Type
  (@specs_block_id, 'spec', 6),  -- Display Size
  (@specs_block_id, 'spec', 7),  -- Touch
  (@specs_block_id, 'spec', 8),  -- Antireflectie
  (@specs_block_id, 'spec', 9),  -- Certificering
  (@specs_block_id, 'spec', 10), -- IP-klasse
  (@specs_block_id, 'spec', 11), -- Valbestendigheid
  (@specs_block_id, 'spec', 12), -- Temp Operatie
  (@specs_block_id, 'spec', 13), -- Temp Opslag
  (@specs_block_id, 'spec', 14), -- Draadloos
  (@specs_block_id, 'spec', 15), -- Mobiel Internet
  (@specs_block_id, 'spec', 16), -- Batterij
  (@specs_block_id, 'spec', 17), -- Gewicht
  (@specs_block_id, 'spec', 18); -- Poorten

SET @spec_1 = LAST_INSERT_ID() - 18;
SET @spec_2 = LAST_INSERT_ID() - 17;
SET @spec_3 = LAST_INSERT_ID() - 16;
SET @spec_4 = LAST_INSERT_ID() - 15;
SET @spec_5 = LAST_INSERT_ID() - 14;
SET @spec_6 = LAST_INSERT_ID() - 13;
SET @spec_7 = LAST_INSERT_ID() - 12;
SET @spec_8 = LAST_INSERT_ID() - 11;
SET @spec_9 = LAST_INSERT_ID() - 10;
SET @spec_10 = LAST_INSERT_ID() - 9;
SET @spec_11 = LAST_INSERT_ID() - 8;
SET @spec_12 = LAST_INSERT_ID() - 7;
SET @spec_13 = LAST_INSERT_ID() - 6;
SET @spec_14 = LAST_INSERT_ID() - 5;
SET @spec_15 = LAST_INSERT_ID() - 4;
SET @spec_16 = LAST_INSERT_ID() - 3;
SET @spec_17 = LAST_INSERT_ID() - 2;
SET @spec_18 = LAST_INSERT_ID() - 1;
SET @spec_19 = LAST_INSERT_ID();

INSERT INTO block_item_fields (block_item_id, field_name, field_value) VALUES
  (@spec_1, 'label', 'Processor'),
  (@spec_1, 'value', 'Intel Core i7-1360P'),
  (@spec_1, 'category', 'processor'),
  
  (@spec_2, 'label', 'CPU Cores'),
  (@spec_2, 'value', '12-core (P+E)'),
  (@spec_2, 'category', 'processor'),
  
  (@spec_3, 'label', 'RAM'),
  (@spec_3, 'value', '16 GB DDR4 LPDDR4x (tot 32GB)'),
  (@spec_3, 'category', 'processor'),
  
  (@spec_4, 'label', 'SSD'),
  (@spec_4, 'value', '512 GB SSD M.2 NVMe (tot 2TB)'),
  (@spec_4, 'category', 'processor'),
  
  (@spec_5, 'label', 'Besturingssysteem'),
  (@spec_5, 'value', 'Windows 11 Pro / Linux'),
  (@spec_5, 'category', 'processor'),
  
  (@spec_6, 'label', 'Type Display'),
  (@spec_6, 'value', '14" Full HD (1920 x 1080)'),
  (@spec_6, 'category', 'display'),
  
  (@spec_7, 'label', 'Helderheid'),
  (@spec_7, 'value', '1.200 NITS (outdoor readable)'),
  (@spec_7, 'category', 'display'),
  
  (@spec_8, 'label', 'Touch'),
  (@spec_8, 'value', 'Capacitief + Handschoen-mode'),
  (@spec_8, 'category', 'display'),
  
  (@spec_9, 'label', 'Antireflectie'),
  (@spec_9, 'value', 'Ja, incl. ITO-coating'),
  (@spec_9, 'category', 'display'),
  
  (@spec_10, 'label', 'Certificering'),
  (@spec_10, 'value', 'MIL-STD-810H'),
  (@spec_10, 'category', 'rugged'),
  
  (@spec_11, 'label', 'IP-klasse'),
  (@spec_11, 'value', 'IP66 (stof + water)'),
  (@spec_11, 'category', 'rugged'),
  
  (@spec_12, 'label', 'Valbestendigheid'),
  (@spec_12, 'value', '180 cm'),
  (@spec_12, 'category', 'rugged'),
  
  (@spec_13, 'label', 'Temp Operatie'),
  (@spec_13, 'value', '-29°C tot +63°C'),
  (@spec_13, 'category', 'rugged'),
  
  (@spec_14, 'label', 'Temp Opslag'),
  (@spec_14, 'value', '-57°C tot +71°C'),
  (@spec_14, 'category', 'rugged'),
  
  (@spec_15, 'label', 'Draadloos'),
  (@spec_15, 'value', 'Wi-Fi 6E, Bluetooth 5.2'),
  (@spec_15, 'category', 'connectivity'),
  
  (@spec_16, 'label', 'Mobiel Internet'),
  (@spec_16, 'value', '5G Sub-6 GHz'),
  (@spec_16, 'category', 'connectivity'),
  
  (@spec_17, 'label', 'Batterij'),
  (@spec_17, 'value', '2x Hot-Swap (tot 18 uur)'),
  (@spec_17, 'category', 'connectivity'),
  
  (@spec_18, 'label', 'Gewicht'),
  (@spec_18, 'value', 'Vanaf 2,36 kg'),
  (@spec_18, 'category', 'connectivity'),
  
  (@spec_19, 'label', 'Poorten'),
  (@spec_19, 'value', 'USB-A x3, USB-C, HDMI, LAN, SD'),
  (@spec_19, 'category', 'connectivity');

-- === GALLERY BLOCK ===
INSERT INTO website_blocks (website_id, block_type_id, sort_order) 
VALUES (@website_id, 5, 4);
SET @gallery_block_id = LAST_INSERT_ID();

-- Gallery block fields
INSERT INTO block_fields (block_id, field_name, field_value) VALUES
  (@gallery_block_id, 'section_label', '04 // Gallery'),
  (@gallery_block_id, 'title', 'IN HET'),
  (@gallery_block_id, 'title_accent', 'VELD GETEST');

-- Gallery items
INSERT INTO block_items (block_id, item_type, sort_order) VALUES
  (@gallery_block_id, 'image', 0),
  (@gallery_block_id, 'image', 1),
  (@gallery_block_id, 'image', 2),
  (@gallery_block_id, 'image', 3);

SET @gallery_1 = LAST_INSERT_ID() - 3;
SET @gallery_2 = LAST_INSERT_ID() - 2;
SET @gallery_3 = LAST_INSERT_ID() - 1;
SET @gallery_4 = LAST_INSERT_ID();

INSERT INTO block_item_fields (block_item_id, field_name, field_value) VALUES
  (@gallery_1, 'image_url', '../images/toughbook-1.jpg'),
  (@gallery_1, 'alt_text', 'Toughbook 40 MK2 Field'),
  
  (@gallery_2, 'image_url', '../images/toughbook-2.jpg'),
  (@gallery_2, 'alt_text', 'DETAIL // KEYBOARD'),
  
  (@gallery_3, 'image_url', '../images/toughbook-3.jpg'),
  (@gallery_3, 'alt_text', 'DETAIL // PORTS'),
  
  (@gallery_4, 'image_url', '../images/toughbook-4.jpg'),
  (@gallery_4, 'alt_text', 'IN USE // OUTDOOR');

-- === DOWNLOADS BLOCK ===
INSERT INTO website_blocks (website_id, block_type_id, sort_order) 
VALUES (@website_id, 6, 5);
SET @downloads_block_id = LAST_INSERT_ID();

-- Downloads block fields
INSERT INTO block_fields (block_id, field_name, field_value) VALUES
  (@downloads_block_id, 'section_label', '05 // Downloads'),
  (@downloads_block_id, 'title', 'DOCUMENTEN &'),
  (@downloads_block_id, 'title_accent', 'DOWNLOADS');

-- Download items
INSERT INTO block_items (block_id, item_type, sort_order) VALUES
  (@downloads_block_id, 'download', 0),
  (@downloads_block_id, 'download', 1),
  (@downloads_block_id, 'download', 2),
  (@downloads_block_id, 'download', 3),
  (@downloads_block_id, 'download', 4),
  (@downloads_block_id, 'download', 5);

SET @dl_1 = LAST_INSERT_ID() - 5;
SET @dl_2 = LAST_INSERT_ID() - 4;
SET @dl_3 = LAST_INSERT_ID() - 3;
SET @dl_4 = LAST_INSERT_ID() - 2;
SET @dl_5 = LAST_INSERT_ID() - 1;
SET @dl_6 = LAST_INSERT_ID();

INSERT INTO block_item_fields (block_item_id, field_name, field_value) VALUES
  (@dl_1, 'name', 'Productdatasheet'),
  (@dl_1, 'file_type', 'PDF'),
  (@dl_1, 'file_size', '2.4 MB'),
  (@dl_1, 'file_url', '#'),
  
  (@dl_2, 'name', 'Technische Handleiding'),
  (@dl_2, 'file_type', 'PDF'),
  (@dl_2, 'file_size', '8.1 MB'),
  (@dl_2, 'file_url', '#'),
  
  (@dl_3, 'name', 'MIL-STD-810H Certificaat'),
  (@dl_3, 'file_type', 'PDF'),
  (@dl_3, 'file_size', '1.2 MB'),
  (@dl_3, 'file_url', '#'),
  
  (@dl_4, 'name', 'Configuratie Gids'),
  (@dl_4, 'file_type', 'PDF'),
  (@dl_4, 'file_size', '3.7 MB'),
  (@dl_4, 'file_url', '#'),
  
  (@dl_5, 'name', 'CE & Compliancy Docs'),
  (@dl_5, 'file_type', 'ZIP'),
  (@dl_5, 'file_size', '4.0 MB'),
  (@dl_5, 'file_url', '#'),
  
  (@dl_6, 'name', 'Driver Package Win 11'),
  (@dl_6, 'file_type', 'ZIP'),
  (@dl_6, 'file_size', '512 MB'),
  (@dl_6, 'file_url', '#');

-- === CTA BLOCK (Offerte/Contact) ===
INSERT INTO website_blocks (website_id, block_type_id, sort_order) 
VALUES (@website_id, 7, 6);
SET @cta_block_id = LAST_INSERT_ID();

-- CTA block fields
INSERT INTO block_fields (block_id, field_name, field_value) VALUES
  (@cta_block_id, 'title', 'KLAAR VOOR DEPLOYMENT?'),
  (@cta_block_id, 'description', 'Vraag een offerte aan of neem contact op met onze rugged specialist. Onze rugged specialisten reageren binnen 24 uur.'),
  (@cta_block_id, 'cta_text', 'Vraag Offerte Aan →'),
  (@cta_block_id, 'cta_url', 'mailto:info@toughbook.nl');

-- === SPEC SHEET BUTTON BLOCK ===
INSERT INTO website_blocks (website_id, block_type_id, sort_order)
VALUES (@website_id, (SELECT id FROM block_types WHERE name='spec_sheet_button_block'), 8);
SET @spec_sheet_button_block_id = LAST_INSERT_ID();

INSERT INTO block_fields (block_id, field_name, field_value) VALUES
  (@spec_sheet_button_block_id, 'text', 'Download Spec Sheet'),
  (@spec_sheet_button_block_id, 'url', 'https://eu.connect.panasonic.com/sites/default/files/media/document/2022-05/TOUGHBOOK_40_Spec_Sheet_English_May_2022%20%281%29.pdf'),
  (@spec_sheet_button_block_id, 'target', '_blank'),
  (@spec_sheet_button_block_id, 'download', 'true');

-- === FOOTER BLOCK ===
INSERT INTO website_blocks (website_id, block_type_id, sort_order) 
VALUES (@website_id, 8, 7);
SET @footer_block_id = LAST_INSERT_ID();

-- Footer block fields
INSERT INTO block_fields (block_id, field_name, field_value) VALUES
  (@footer_block_id, 'brand', 'TOUGHBOOK'),
  (@footer_block_id, 'brand_accent', '40 MK2'),
  (@footer_block_id, 'copyright', 'PANASONIC CONNECT • ALLE RECHTEN VOORBEHOUDEN');
