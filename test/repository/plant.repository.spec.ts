import {PlantRepository} from "#app/repository/plant.repository.js";
import sqlite3, {Database} from "sqlite3";
import {beforeEach, describe, expect, test, vi} from 'vitest';

vi.mock('sqlite3', async (importOriginal) => {
    const Database = vi.fn(class{
        run = vi.fn((sql, params, callback) => callback(null))
        get = vi.fn((sql, params, callback) => callback(null, {id: 1, name: 'test'}))
        all = vi.fn((sql, params, callback) => callback(null, []))
        close = vi.fn((callback) => callback(null))
    });

    return {
        ...(await importOriginal()),
        Database
    };
});

let mockDb: Database;

beforeEach(() => {
    vi.clearAllMocks();
    mockDb = new sqlite3.Database('');
});

describe('PlantRepository', () => {
    test('should create query to get plants native to states', () => {
        const plantRepository = new PlantRepository(mockDb);
        expect(plantRepository.createPlantsNativeToQuery(["Iowa", "Maine"], false))
            .toBe("(UPPER(pd.native_states) like UPPER(\"%Iowa%\") OR UPPER(pd.native_states) like UPPER(\"%Maine%\"))");
    });

    test('should create query to get plants native to states and introduced to states', () => {
        const plantRepository = new PlantRepository(mockDb);
        expect(plantRepository.createPlantsNativeToQuery(["Iowa", "Maine"], true))
            .toBe("(UPPER(pd.native_states) like UPPER(\"%Iowa%\") OR UPPER(pd.introduced_states) like UPPER(\"%Iowa%\") " +
                "OR UPPER(pd.native_states) like UPPER(\"%Maine%\") OR UPPER(pd.introduced_states) like UPPER(\"%Maine%\"))");
    });

    // TODO createPlantsByCharacteristicsQuery test
});
