import Database from "better-sqlite3";
import {Plant, PlantCharacteristic, PlantDistribution} from "../src/app/model/database-types.js";
import {testCharacteristics, testDistributions, testPlants} from "./test-database-data.js";

export const createMockDatabase = () => {
    const mockDatabase: Database.Database = new Database(":memory:");

    mockDatabase.exec(`
        CREATE TABLE plants
        (
            id                     INTEGER PRIMARY KEY,
            symbol                 TEXT    NOT NULL UNIQUE,
            scientific_name        TEXT    NOT NULL,
            common_name            TEXT,
            group_name             TEXT,
            rank_id                INTEGER NOT NULL,
            rank                   TEXT    NOT NULL,
            accepted_id            INTEGER NOT NULL,

            -- Status flags
            has_synonyms           BOOLEAN   DEFAULT FALSE,
            has_subordinate_taxa   BOOLEAN   DEFAULT FALSE,
            has_wildlife           BOOLEAN   DEFAULT FALSE,
            has_wetland_data       BOOLEAN   DEFAULT FALSE,
            has_images             BOOLEAN   DEFAULT FALSE,
            has_related_links      BOOLEAN   DEFAULT FALSE,
            has_legal_statuses     BOOLEAN   DEFAULT FALSE,
            has_noxious_statuses   BOOLEAN   DEFAULT FALSE,
            has_documentation      BOOLEAN   DEFAULT FALSE,
            has_distribution_data  BOOLEAN   DEFAULT FALSE,
            has_invasive_statuses  BOOLEAN   DEFAULT FALSE,
            has_characteristics    BOOLEAN   DEFAULT FALSE,
            has_ethnobotany        BOOLEAN   DEFAULT FALSE,
            has_pollinator         BOOLEAN   DEFAULT FALSE,

            -- Image data
            num_images             INTEGER   DEFAULT 0,
            profile_image_filename TEXT,
            profile_image_url      TEXT,
            image_id               INTEGER   DEFAULT 0,

            plant_location_id      INTEGER   DEFAULT 0,

            -- JSON arrays
            durations              TEXT, -- JSON
            growth_habits          TEXT, -- JSON
            other_common_names     TEXT, -- JSON
            plant_guide_urls       TEXT, -- JSON (now full URLs)
            fact_sheet_urls        TEXT, -- JSON (now full URLs)

            created_at             TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at             TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            data_checksum          TEXT
        )
    `)

    mockDatabase.exec(`
        CREATE TABLE plant_distribution
        (
            plant_id                INTEGER PRIMARY KEY,
            plant_symbol            TEXT NOT NULL,
            native_states           TEXT, -- JSON
            introduced_states       TEXT, -- JSON
            total_native_states     INTEGER DEFAULT 0,
            total_introduced_states INTEGER DEFAULT 0,

            FOREIGN KEY (plant_id) REFERENCES plants (id)
        )
    `)

    mockDatabase.exec(`
        CREATE TABLE plant_characteristics
        (
            id                                INTEGER PRIMARY KEY,
            plant_id                          INTEGER NOT NULL UNIQUE,

            -- Morphology/Physiology
            active_growth_period              TEXT,
            bloat                             TEXT,
            c_n_ratio                         TEXT,
            coppice_potential                 TEXT,
            fall_conspicuous                  TEXT,
            fire_resistant                    TEXT,
            flower_color                      TEXT,
            flower_conspicuous                TEXT,
            foliage_color                     TEXT,
            foliage_porosity_summer           TEXT,
            foliage_porosity_winter           TEXT,
            foliage_texture                   TEXT,
            fruit_seed_color                  TEXT,
            fruit_seed_conspicuous            TEXT,
            growth_form                       TEXT,
            growth_rate                       TEXT,
            height_at_20_years_maximum_feet   TEXT,
            height_mature_feet                TEXT,
            known_allelopath                  TEXT,
            leaf_retention                    TEXT,
            lifespan                          TEXT,
            low_growing_grass                 TEXT,
            nitrogen_fixation                 TEXT,
            resprout_ability                  TEXT,
            shape_and_orientation             TEXT,
            toxicity                          TEXT,

            -- Growth Requirements
            adapted_to_coarse_textured_soils  TEXT,
            adapted_to_fine_textured_soils    TEXT,
            adapted_to_medium_textured_soils  TEXT,
            anaerobic_tolerance               TEXT,
            caco_3_tolerance                  TEXT,
            cold_stratification_required      TEXT,
            drought_tolerance                 TEXT,
            fertility_requirement             TEXT,
            fire_tolerance                    TEXT,
            frost_free_days_minimum           TEXT,
            hedge_tolerance                   TEXT,
            moisture_use                      TEXT,
            ph_maximum                        REAL,
            ph_minimum                        REAL,
            planting_density_per_acre_maximum TEXT,
            planting_density_per_acre_minimum TEXT,
            precipitation_maximum             TEXT,
            precipitation_minimum             TEXT,
            root_depth_minimum                TEXT,
            salinity_tolerance                TEXT,
            shade_tolerance                   TEXT,
            temperature_minimum_f             TEXT,

            -- Reproduction
            bloom_period                      TEXT,
            commercial_availability           TEXT,
            fruit_seed_abundance              TEXT,
            fruit_seed_period_begin           TEXT,
            fruit_seed_period_end             TEXT,
            fruit_seed_persistence            TEXT,
            propagated_by_bare_root           TEXT,
            propagated_by_bulb                TEXT,
            propagated_by_container           TEXT,
            propagated_by_corm                TEXT,
            propagated_by_cuttings            TEXT,
            propagated_by_seed                TEXT,
            propagated_by_sod                 TEXT,
            propagated_by_sprigs              TEXT,
            propagated_by_tubers              TEXT,
            seed_per_pound                    TEXT,
            seed_spread_rate                  TEXT,
            seedling_vigor                    TEXT,
            small_grain                       TEXT,
            vegetative_spread_rate            TEXT,

            -- Suitability/Use
            berry_nut_seed_product            TEXT,
            christmas_tree_product            TEXT,
            fodder_product                    TEXT,
            fuelwood_product                  TEXT,
            lumber_product                    TEXT,
            naval_store_product               TEXT,
            nursery_stock_product             TEXT,
            palatable_browse_animal           TEXT,
            palatable_human                   TEXT,
            post_product                      TEXT,
            pulpwood_product                  TEXT,
            veneer_product                    TEXT,

            FOREIGN KEY (plant_id) REFERENCES plants (id)
        )
    `)

    const insertPlant = mockDatabase.prepare(`INSERT INTO plants (id, symbol,
                                                                  scientific_name, common_name, group_name, rank_id,
                                                                  rank, accepted_id, image_id, num_images,
                                                                  plant_location_id, durations, fact_sheet_urls,
                                                                  growth_habits, other_common_names, plant_guide_urls,
                                                                  profile_image_filename, profile_image_url, updated_at,
                                                                  created_at)
                                              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0)`
    );

    const insertDistribution = mockDatabase.prepare(`INSERT INTO plant_distribution (plant_id, plant_symbol,
                                                                                     native_states, introduced_states,
                                                                                     total_native_states,
                                                                                     total_introduced_states)
                                                     VALUES (?, ?, ?, ?, ?, ?)`
    );

    const insertCharacteristic = mockDatabase.prepare(`INSERT INTO plant_characteristics (id, plant_id,
                                                                                          flower_color)
                                                       VALUES (?, ?, ?)`
    );
    const transaction = mockDatabase
        .transaction((plants: Plant[], distributions: PlantDistribution[], characteristics: PlantCharacteristic[]) => {
            plants.map(plant => {
                insertPlant.run(
                    plant.id,
                    plant.symbol,
                    plant.scientific_name,
                    plant.common_name,
                    plant.group_name,
                    plant.rank_id,
                    plant.rank,
                    plant.accepted_id,
                    plant.image_id,
                    plant.num_images,
                    plant.plant_location_id,
                    plant.durations,
                    plant.fact_sheet_urls,
                    plant.growth_habits,
                    plant.other_common_names,
                    plant.plant_guide_urls,
                    plant.profile_image_filename,
                    plant.profile_image_url
                );
            });
            distributions.map(distribution => {
                insertDistribution.run(distribution.plant_id, distribution.plant_symbol, `[${distribution.native_states?.map(state => `"${state}"`).join(",")}]`,
                    `[${distribution.introduced_states?.map(state => `"${state}"`).join(",")}]`, distribution.total_native_states, distribution.total_introduced_states);
            });
            characteristics.map(characteristic => {
                insertCharacteristic.run(characteristic.id, characteristic.plant_id, characteristic.flower_color);
            });
        });
    transaction(testPlants, testDistributions, testCharacteristics);

    return mockDatabase;
};