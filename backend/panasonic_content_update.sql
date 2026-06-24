-- ============================================================
-- Panasonic TOUGHBOOK 33 – Content update voor website ID 4 (NL)
-- Bron: eu.connect.panasonic.com/nl/nl/toughbook/toughbook-33-serie
--
-- Gebruik: voer dit script uit in je MySQL-database.
-- Alle teksten zijn gebaseerd op de officiële Panasonic website.
-- ============================================================

-- ===== HERO BLOCK =====

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'Volledig Rugged 2-in-1'
WHERE bt.name = 'hero_block' AND bf.field_name = 'badge_text' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'TOUGHBOOK 33'
WHERE bt.name = 'hero_block' AND bf.field_name = 'title_line_1' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'Prestaties in'
WHERE bt.name = 'hero_block' AND bf.field_name = 'title_line_2' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'Extreme Omstandigheden'
WHERE bt.name = 'hero_block' AND bf.field_name = 'title_line_3' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'Een volledig robuust 12" QHD 2-in-1 apparaat. MIL-STD-810H gecertificeerd, IP65 beschermd en klaar voor elk terrein — van tablet tot laptop tot voertuiggebaseerde workflow.'
WHERE bt.name = 'hero_block' AND bf.field_name = 'subtitle' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'Offerte aanvragen'
WHERE bt.name = 'hero_block' AND bf.field_name = 'primary_button_text' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = '#offerte'
WHERE bt.name = 'hero_block' AND bf.field_name = 'primary_button_url' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'Bekijk specificaties'
WHERE bt.name = 'hero_block' AND bf.field_name = 'secondary_button_text' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = '#specifications'
WHERE bt.name = 'hero_block' AND bf.field_name = 'secondary_button_url' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = '15u+'
WHERE bt.name = 'hero_block' AND bf.field_name = 'stat_1_value' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'Batterijduur'
WHERE bt.name = 'hero_block' AND bf.field_name = 'stat_1_label' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = '1,54 kg'
WHERE bt.name = 'hero_block' AND bf.field_name = 'stat_2_value' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'Gewicht (tablet)'
WHERE bt.name = 'hero_block' AND bf.field_name = 'stat_2_label' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'IP65'
WHERE bt.name = 'hero_block' AND bf.field_name = 'stat_3_value' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'Waterbestendig'
WHERE bt.name = 'hero_block' AND bf.field_name = 'stat_3_label' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'Gecertificeerd'
WHERE bt.name = 'hero_block' AND bf.field_name = 'card_label' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'MIL-STD-810H'
WHERE bt.name = 'hero_block' AND bf.field_name = 'card_text' AND wb.website_id = 4;


-- ===== FEATURES BLOCK =====

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'Gebouwd voor Extreme Omstandigheden'
WHERE bt.name = 'features_block' AND bf.field_name = 'title' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'De TOUGHBOOK 33 is ontworpen voor professionals die absolute betrouwbaarheid nodig hebben waar andere apparaten falen.'
WHERE bt.name = 'features_block' AND bf.field_name = 'subtitle' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'Vertrouwd door hulpdiensten, defensie en industrie wereldwijd'
WHERE bt.name = 'features_block' AND bf.field_name = 'bottom_badge_text' AND wb.website_id = 4;

-- Feature items (sort_order 1–4)
UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'shield'
WHERE bt.name = 'features_block' AND bi.sort_order = 1 AND bif.field_name = 'icon' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'MIL-STD-810H & IP65'
WHERE bt.name = 'features_block' AND bi.sort_order = 1 AND bif.field_name = 'title' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = '150 cm valweerstand, volledig stof- en waterdicht (IP65), bestand tegen schokken, trillingen en temperaturen van -29°C tot +63°C.'
WHERE bt.name = 'features_block' AND bi.sort_order = 1 AND bif.field_name = 'description' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'monitor'
WHERE bt.name = 'features_block' AND bi.sort_order = 2 AND bif.field_name = 'icon' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = '12" QHD Touchscreen'
WHERE bt.name = 'features_block' AND bi.sort_order = 2 AND bif.field_name = 'title' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = '2160×1440 resolutie met tot 1.200 cd/m² helderheid en antireflectiecoating. Werkt met handschoenen en in de regen dankzij speciale touchmodi.'
WHERE bt.name = 'features_block' AND bi.sort_order = 2 AND bif.field_name = 'description' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'battery'
WHERE bt.name = 'features_block' AND bi.sort_order = 3 AND bif.field_name = 'icon' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Tot 15 uur batterij'
WHERE bt.name = 'features_block' AND bi.sort_order = 3 AND bif.field_name = 'title' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Hot-swappable Li-Ion batterijen zodat je nooit zonder stroom zit. Panasonic garandeert 5 jaar batterijbeschikbaarheid met voorspellende monitoring.'
WHERE bt.name = 'features_block' AND bi.sort_order = 3 AND bif.field_name = 'description' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'zap'
WHERE bt.name = 'features_block' AND bi.sort_order = 4 AND bif.field_name = 'icon' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = '5G & Wi-Fi 6E'
WHERE bt.name = 'features_block' AND bi.sort_order = 4 AND bif.field_name = 'title' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Intel Wi-Fi 6E AX211, Bluetooth 5.3, 4G/5G met eSIM-ondersteuning. Microsoft Secured Core PC met Windows Hello en OPAL SSD-encryptie.'
WHERE bt.name = 'features_block' AND bi.sort_order = 4 AND bif.field_name = 'description' AND wb.website_id = 4;


-- ===== SPECIFICATIONS BLOCK =====

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'Technische Specifications'
WHERE bt.name = 'specifications_block' AND bf.field_name = 'title' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'Alle technische gegevens van de TOUGHBOOK 33 MK4 — het meest geavanceerde rugged 2-in-1 apparaat van Panasonic.'
WHERE bt.name = 'specifications_block' AND bf.field_name = 'subtitle' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = '15u+'
WHERE bt.name = 'specifications_block' AND bf.field_name = 'bottom_stat_1_value' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'Batterijduur'
WHERE bt.name = 'specifications_block' AND bf.field_name = 'bottom_stat_1_label' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'MIL-810H'
WHERE bt.name = 'specifications_block' AND bf.field_name = 'bottom_stat_2_value' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'Militair gecertificeerd'
WHERE bt.name = 'specifications_block' AND bf.field_name = 'bottom_stat_2_label' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'IP65'
WHERE bt.name = 'specifications_block' AND bf.field_name = 'bottom_stat_3_value' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'Stof & waterdicht'
WHERE bt.name = 'specifications_block' AND bf.field_name = 'bottom_stat_3_label' AND wb.website_id = 4;

-- Spec items (sort_order 1–6)
-- Item 1: Processor
UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'cpu'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 1 AND bif.field_name = 'icon' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Processor & Geheugen'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 1 AND bif.field_name = 'title' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Processor'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 1 AND bif.field_name = 'row_1_label' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Intel Core i7-1370P vPro'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 1 AND bif.field_name = 'row_1_value' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'RAM'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 1 AND bif.field_name = 'row_2_label' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = '16 GB DDR4 (max. 32 GB)'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 1 AND bif.field_name = 'row_2_value' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Opslag'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 1 AND bif.field_name = 'row_3_label' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = '512 GB NVMe SSD (OPAL, tot 2 TB)'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 1 AND bif.field_name = 'row_3_value' AND wb.website_id = 4;

-- Item 2: Display
UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'monitor'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 2 AND bif.field_name = 'icon' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Display'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 2 AND bif.field_name = 'title' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Scherm'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 2 AND bif.field_name = 'row_1_label' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = '12" QHD (2160×1440, 3:2)'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 2 AND bif.field_name = 'row_1_value' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Helderheid'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 2 AND bif.field_name = 'row_2_label' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Tot 1.200 cd/m²'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 2 AND bif.field_name = 'row_2_value' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Touch'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 2 AND bif.field_name = 'row_3_label' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = '10-finger capacitief + IP55 digitizer'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 2 AND bif.field_name = 'row_3_value' AND wb.website_id = 4;

-- Item 3: Connectiviteit
UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'wifi'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 3 AND bif.field_name = 'icon' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Connectiviteit'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 3 AND bif.field_name = 'title' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Wi-Fi'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 3 AND bif.field_name = 'row_1_label' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Intel Wi-Fi 6E AX211'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 3 AND bif.field_name = 'row_1_value' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Bluetooth'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 3 AND bif.field_name = 'row_2_label' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = '5.3 + EDR Class 1'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 3 AND bif.field_name = 'row_2_value' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Mobiel'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 3 AND bif.field_name = 'row_3_label' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = '4G / 5G met fysieke SIM + eSIM'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 3 AND bif.field_name = 'row_3_value' AND wb.website_id = 4;

-- Item 4: Batterij
UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'battery'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 4 AND bif.field_name = 'icon' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Batterij'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 4 AND bif.field_name = 'title' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Duur (tablet)'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 4 AND bif.field_name = 'row_1_label' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Tot 15,5 uur'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 4 AND bif.field_name = 'row_1_value' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Duur (2-in-1)'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 4 AND bif.field_name = 'row_2_label' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Tot 15 uur'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 4 AND bif.field_name = 'row_2_value' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Type'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 4 AND bif.field_name = 'row_3_label' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Hot-swappable Li-Ion'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 4 AND bif.field_name = 'row_3_value' AND wb.website_id = 4;

-- Item 5: Robuustheid
UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'shield'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 5 AND bif.field_name = 'icon' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Robuustheid'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 5 AND bif.field_name = 'title' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Norm'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 5 AND bif.field_name = 'row_1_label' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'MIL-STD-810H + IP65'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 5 AND bif.field_name = 'row_1_value' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Valweerstand'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 5 AND bif.field_name = 'row_2_label' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = '150 cm (tablet + toetsenbord)'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 5 AND bif.field_name = 'row_2_value' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Temperatuur'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 5 AND bif.field_name = 'row_3_label' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = '-29°C tot +63°C'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 5 AND bif.field_name = 'row_3_value' AND wb.website_id = 4;

-- Item 6: Gewicht & OS
UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'hard-drive'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 6 AND bif.field_name = 'icon' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Gewicht & Software'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 6 AND bif.field_name = 'title' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Gewicht (tablet)'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 6 AND bif.field_name = 'row_1_label' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Vanaf 1,54 kg'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 6 AND bif.field_name = 'row_1_value' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Gewicht (2-in-1)'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 6 AND bif.field_name = 'row_2_label' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Vanaf 2,81 kg'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 6 AND bif.field_name = 'row_2_value' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Besturingssysteem'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 6 AND bif.field_name = 'row_3_label' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Windows 11 Pro'
WHERE bt.name = 'specifications_block' AND bi.sort_order = 6 AND bif.field_name = 'row_3_value' AND wb.website_id = 4;


-- ===== DOWNLOADS BLOCK =====

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'Product Documentation'
WHERE bt.name = 'downloads_block' AND bf.field_name = 'title' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'Download de officiële TOUGHBOOK 33 documentatie, brochures en technische specificaties.'
WHERE bt.name = 'downloads_block' AND bf.field_name = 'subtitle' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'Op zoek naar meer informatie?'
WHERE bt.name = 'downloads_block' AND bf.field_name = 'cta_title' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'Neem contact op met ons verkoopteam voor persoonlijk advies, een demo of een offerte op maat.'
WHERE bt.name = 'downloads_block' AND bf.field_name = 'cta_text' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'Neem contact op'
WHERE bt.name = 'downloads_block' AND bf.field_name = 'cta_button_text' AND wb.website_id = 4;

-- Download items (sort_order 1–3)
UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Productspecificaties'
WHERE bt.name = 'downloads_block' AND bi.sort_order = 1 AND bif.field_name = 'title' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Volledige technische specificaties van de TOUGHBOOK 33 MK4 inclusief alle configuraties.'
WHERE bt.name = 'downloads_block' AND bi.sort_order = 1 AND bif.field_name = 'description' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'PDF'
WHERE bt.name = 'downloads_block' AND bi.sort_order = 1 AND bif.field_name = 'file_type' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = '2,4 MB'
WHERE bt.name = 'downloads_block' AND bi.sort_order = 1 AND bif.field_name = 'file_size' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Downloaden'
WHERE bt.name = 'downloads_block' AND bi.sort_order = 1 AND bif.field_name = 'button_text' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Productbrochure'
WHERE bt.name = 'downloads_block' AND bi.sort_order = 2 AND bif.field_name = 'title' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Overzicht van alle TOUGHBOOK 33 modellen, configuraties en enterprise-opties.'
WHERE bt.name = 'downloads_block' AND bi.sort_order = 2 AND bif.field_name = 'description' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'PDF'
WHERE bt.name = 'downloads_block' AND bi.sort_order = 2 AND bif.field_name = 'file_type' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = '5,1 MB'
WHERE bt.name = 'downloads_block' AND bi.sort_order = 2 AND bif.field_name = 'file_size' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Downloaden'
WHERE bt.name = 'downloads_block' AND bi.sort_order = 2 AND bif.field_name = 'button_text' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'CAD-bestanden'
WHERE bt.name = 'downloads_block' AND bi.sort_order = 3 AND bif.field_name = 'title' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = '3D CAD-tekeningen voor voertuig- en systeemintegratie van de TOUGHBOOK 33.'
WHERE bt.name = 'downloads_block' AND bi.sort_order = 3 AND bif.field_name = 'description' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'ZIP'
WHERE bt.name = 'downloads_block' AND bi.sort_order = 3 AND bif.field_name = 'file_type' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = '12,8 MB'
WHERE bt.name = 'downloads_block' AND bi.sort_order = 3 AND bif.field_name = 'file_size' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Downloaden'
WHERE bt.name = 'downloads_block' AND bi.sort_order = 3 AND bif.field_name = 'button_text' AND wb.website_id = 4;


-- ===== CTA BLOCK =====

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'Enterprise Computing'
WHERE bt.name = 'cta_block' AND bf.field_name = 'badge_text' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'Klaar voor Prestaties in Extreme Omstandigheden?'
WHERE bt.name = 'cta_block' AND bf.field_name = 'title' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'Ontdek hoe de TOUGHBOOK 33 jouw organisatie versterkt met ongeëvenaarde betrouwbaarheid en prestaties. Vertrouwd door hulpdiensten, defensie en industrie wereldwijd.'
WHERE bt.name = 'cta_block' AND bf.field_name = 'subtitle' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'Offerte aanvragen'
WHERE bt.name = 'cta_block' AND bf.field_name = 'primary_button_text' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = '#offerte'
WHERE bt.name = 'cta_block' AND bf.field_name = 'primary_button_url' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = 'Bekijk galerij'
WHERE bt.name = 'cta_block' AND bf.field_name = 'secondary_button_text' AND wb.website_id = 4;

UPDATE block_fields bf
JOIN website_blocks wb ON wb.id = bf.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bf.field_value = '#gallery-section'
WHERE bt.name = 'cta_block' AND bf.field_name = 'secondary_button_url' AND wb.website_id = 4;

-- CTA benefit items (sort_order 1–3)
UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = '24/7 Support'
WHERE bt.name = 'cta_block' AND bi.sort_order = 1 AND bif.field_name = 'title' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Enterprise-level ondersteuning'
WHERE bt.name = 'cta_block' AND bi.sort_order = 1 AND bif.field_name = 'description' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = '3 Jaar Garantie'
WHERE bt.name = 'cta_block' AND bi.sort_order = 2 AND bif.field_name = 'title' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Standaard bij elk apparaat via ProTect'
WHERE bt.name = 'cta_block' AND bi.sort_order = 2 AND bif.field_name = 'description' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Bulk Kortingen'
WHERE bt.name = 'cta_block' AND bi.sort_order = 3 AND bif.field_name = 'title' AND wb.website_id = 4;

UPDATE block_item_fields bif
JOIN block_items bi ON bi.id = bif.block_item_id
JOIN website_blocks wb ON wb.id = bi.block_id
JOIN block_types bt ON bt.id = wb.block_type_id
SET bif.field_value = 'Voor enterprise bestellingen'
WHERE bt.name = 'cta_block' AND bi.sort_order = 3 AND bif.field_name = 'description' AND wb.website_id = 4;
