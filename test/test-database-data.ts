import {Plant, PlantCharacteristic, PlantDistribution} from "../src/app/model/database-types.js";

export const testPlants: Plant[] = [
    {
        accepted_id: 21313,
        common_name: "INTEGRATION TEST",
        durations: null,
        fact_sheet_urls: null,
        group_name: "Moss",
        growth_habits: null,
        id: 123,
        image_id: 324,
        num_images: 1,
        other_common_names: null,
        plant_guide_urls: null,
        plant_location_id: 54353,
        profile_image_filename: null,
        profile_image_url: null,
        rank: "Species",
        rank_id: 180,
        scientific_name: "TESTIA INTEGRA",
        symbol: "TESTSYM",
    },
    {
        accepted_id: 4234234,
        common_name: "INTEGRATION TEST 2",
        durations: "durers",
        fact_sheet_urls: "test.com",
        group_name: "Dicot",
        growth_habits: "fast",
        id: 124,
        image_id: 324,
        num_images: 1,
        other_common_names: "TEST 2",
        plant_guide_urls: "test-guide.com",
        plant_location_id: 54353,
        profile_image_filename: "test-image.jpg",
        profile_image_url: "test-image.com",
        rank: "Species",
        rank_id: 180,
        scientific_name: "TESTIA INTEGRA 2",
        symbol: "TESTSYM 2",
    },
    {
        accepted_id: 4234234,
        common_name: "Planty plant",
        durations: "durararara",
        fact_sheet_urls: "plant-test.com",
        group_name: "Lichen",
        growth_habits: "slow",
        id: 125,
        image_id: 132,
        num_images: 1,
        other_common_names: "Plant",
        plant_guide_urls: "test-guide.com",
        plant_location_id: 3455,
        profile_image_filename: "mfwdawd.jpg",
        profile_image_url: "dsdffesf.com",
        rank: "Species",
        rank_id: 180,
        scientific_name: "Plantica plantus",
        symbol: "PLPL",
    },
    {
        accepted_id: 4234234,
        common_name: "Rydia Mist",
        durations: "durararara",
        fact_sheet_urls: "ffiv.com/adawdawwa",
        group_name: "Moss",
        growth_habits: "slow",
        id: 126,
        image_id: 435,
        num_images: 1,
        other_common_names: "Green Summoner",
        plant_guide_urls: "ffiv.com/dwadad",
        plant_location_id: 3455,
        profile_image_filename: "ffiv.jpg",
        profile_image_url: "ffiv.com",
        rank: "Species",
        rank_id: 180,
        scientific_name: "Rydia Mistica",
        symbol: "RYMI",
    }
];

export const testDistributions: PlantDistribution[] = [
    {
        plant_id: 123,
        plant_symbol: "TESTSYM",
        native_states: "[\"New_York\", 'Maine', \"New_Jersey\", \"Pennsylvania\"]",
        introduced_states: "[\"Massachusetts\"]",
        total_native_states: 4,
        total_introduced_states: 1
    },
    {
        plant_id: 124,
        plant_symbol: "TESTSYM 2",
        native_states: "['Florida']",
        introduced_states: "[\"California\", \"Texas\", \"Pennsylvania\"]",
        total_native_states: 1,
        total_introduced_states: 3
    },
    {
        plant_id: 126,
        plant_symbol: "TESTSYM 2",
        native_states: "['Maine', 'Vermont']",
        introduced_states: "[]",
        total_native_states: 1,
        total_introduced_states: 3
    }
];

export const testCharacteristics: PlantCharacteristic[] = [
    {
        id: 1,
        plant_id: 123,
        flower_color: "Purple",
    },
    {
        id: 2,
        plant_id: 126,
        flower_color: "Green",
    }
];