export type Plant = {
    id: number
    symbol: string
    scientific_name: string
    common_name?: Nullable<string>
    group_name?: Nullable<string>
    rank_id: number
    rank: string
    accepted_id: number
    has_synonyms?: Nullable<boolean>
    has_subordinate_taxa?: Nullable<boolean>
    has_wildlife?: Nullable<boolean>
    has_wetland_data?: Nullable<boolean>
    has_images?: Nullable<boolean>
    has_related_links?: Nullable<boolean>
    has_legal_statuses?: Nullable<boolean>
    has_noxious_statuses?: Nullable<boolean>
    has_documentation?: Nullable<boolean>
    has_distribution_data?: Nullable<boolean>
    has_invasive_statuses?: Nullable<boolean>
    has_characteristics?: Nullable<boolean>
    has_ethnobotany?: Nullable<boolean>
    has_pollinator?: Nullable<boolean>
    num_images?: Nullable<number>
    profile_image_filename?: Nullable<string>
    profile_image_url?: Nullable<string>
    image_id?: Nullable<number>
    plant_location_id?: Nullable<number>
    durations?: Nullable<string>
    growth_habits?: Nullable<string>
    other_common_names?: Nullable<string>
    plant_guide_urls?: Nullable<string>
    fact_sheet_urls?: Nullable<string>
    created_at?: Nullable<Date>
    updated_at?: Nullable<Date>
    data_checksum?: Nullable<string>
}

export type PlantAncestor = {
    id: number
    plant_id: number
    ancestor_id: number
    ancestor_symbol: string
    ancestor_scientific_name: string
    ancestor_common_name?: Nullable<string>
    ancestor_rank_id: number
    ancestor_rank: string
    ancestor_accepted_id: number
    hierarchy_level: number
}

export type PlantNativeStatus = {
    [key: string]: string | number | undefined
    id: number
    plant_id: number
    region: string
    status: string
    status_type: string
}

export type PlantMapCoordinates = {
    id: number
    plant_id: number
    state_abbr: string
    x_min: number
    y_min: number
    x_max: number
    y_max: number
}

export type PlantCharacteristic = {
    [key: string]: Nullable<string> | number | number | undefined
    id: number
    plant_id: number
    active_growth_period?: Nullable<string>
    bloat?: Nullable<string>
    c_n_ratio?: Nullable<string>
    coppice_potential?: Nullable<string>
    fall_conspicuous?: Nullable<string>
    fire_resistant?: Nullable<string>
    flower_color?: Nullable<string>
    flower_conspicuous?: Nullable<string>
    foliage_color?: Nullable<string>
    foliage_porosity_summer?: Nullable<string>
    foliage_porosity_winter?: Nullable<string>
    foliage_texture?: Nullable<string>
    fruit_seed_color?: Nullable<string>
    fruit_seed_conspicuous?: Nullable<string>
    growth_form?: Nullable<string>
    growth_rate?: Nullable<string>
    height_at_20_years_maximum_feet?: Nullable<string>
    height_mature_feet?: Nullable<string>
    known_allelopath?: Nullable<string>
    leaf_retention?: Nullable<string>
    lifespan?: Nullable<string>
    low_growing_grass?: Nullable<string>
    nitrogen_fixation?: Nullable<string>
    resprout_ability?: Nullable<string>
    shape_and_orientation?: Nullable<string>
    toxicity?: Nullable<string>
    adapted_to_coarse_textured_soils?: Nullable<string>
    adapted_to_fine_textured_soils?: Nullable<string>
    adapted_to_medium_textured_soils?: Nullable<string>
    anaerobic_tolerance?: Nullable<string>
    caco_3_tolerance?: Nullable<string>
    cold_stratification_required?: Nullable<string>
    drought_tolerance?: Nullable<string>
    fertility_requirement?: Nullable<string>
    fire_tolerance?: Nullable<string>
    frost_free_days_minimum?: Nullable<string>
    hedge_tolerance?: Nullable<string>
    moisture_use?: Nullable<string>
    ph_maximum?: Nullable<number>
    ph_minimum?: Nullable<number>
    planting_density_per_acre_maximum?: Nullable<string>
    planting_density_per_acre_minimum?: Nullable<string>
    precipitation_maximum?: Nullable<string>
    precipitation_minimum?: Nullable<string>
    root_depth_minimum?: Nullable<string>
    salinity_tolerance?: Nullable<string>
    shade_tolerance?: Nullable<string>
    temperature_minimum_f?: Nullable<string>
    bloom_period?: Nullable<string>
    commercial_availability?: Nullable<string>
    fruit_seed_abundance?: Nullable<string>
    fruit_seed_period_begin?: Nullable<string>
    fruit_seed_period_end?: Nullable<string>
    fruit_seed_persistence?: Nullable<string>
    propagated_by_bare_root?: Nullable<string>
    propagated_by_bulb?: Nullable<string>
    propagated_by_container?: Nullable<string>
    propagated_by_corm?: Nullable<string>
    propagated_by_cuttings?: Nullable<string>
    propagated_by_seed?: Nullable<string>
    propagated_by_sod?: Nullable<string>
    propagated_by_sprigs?: Nullable<string>
    propagated_by_tubers?: Nullable<string>
    seed_per_pound?: Nullable<string>
    seed_spread_rate?: Nullable<string>
    seedling_vigor?: Nullable<string>
    small_grain?: Nullable<string>
    vegetative_spread_rate?: Nullable<string>
    berry_nut_seed_product?: Nullable<string>
    christmas_tree_product?: Nullable<string>
    fodder_product?: Nullable<string>
    fuelwood_product?: Nullable<string>
    lumber_product?: Nullable<string>
    naval_store_product?: Nullable<string>
    nursery_stock_product?: Nullable<string>
    palatable_browse_animal?: Nullable<string>
    palatable_human?: Nullable<string>
    post_product?: Nullable<string>
    pulpwood_product?: Nullable<string>
    veneer_product?: Nullable<string>
}

export type PlantNote = {
    plant_id: number
    general_notes?: Nullable<string>
    synonym_notes?: Nullable<string>
    subordinate_taxa_notes?: Nullable<string>
    legal_notes?: Nullable<string>
    noxious_notes?: Nullable<string>
    rarity_notes?: Nullable<string>
    wetland_notes?: Nullable<string>
    related_links_notes?: Nullable<string>
    wildlife_notes?: Nullable<string>
    sources_notes?: Nullable<string>
    characteristic_notes?: Nullable<string>
    pollinator_notes?: Nullable<string>
    cultural_notes?: Nullable<string>
    ethnobotany_notes?: Nullable<string>
}

export type State = {
    plant_location_id: number
    plant_location_name: string
    plant_location_category?: Nullable<string>
    county_name?: Nullable<string>
    created_at?: Nullable<Date>
}

export type StatePlant = {
    id: number
    state_location_id: number
    plant_symbol: string
}

export type PlantDistribution = {
    plant_id: number
    plant_symbol: string
    native_states?: string[]
    introduced_states?: string[]
    total_native_states?: Nullable<number>
    total_introduced_states?: Nullable<number>
}

export type PlantTaxonomicPath = {
    plant_id: number
    kingdom?: Nullable<string>
    phylum?: Nullable<string>
    class_name?: Nullable<string>
    order_name?: Nullable<string>
    family?: Nullable<string>
    genus?: Nullable<string>
    species?: Nullable<string>
    subspecies?: Nullable<string>
    variety?: Nullable<string>
    form?: Nullable<string>
    full_path?: Nullable<string>
}