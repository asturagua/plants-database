export type Plant = {
    id: bigint
    symbol: string
    scientific_name: string
    common_name?: string
    group_name?: string
    rank_id: bigint
    rank: string
    accepted_id: bigint
    has_synonyms?: boolean
    has_subordinate_taxa?: boolean
    has_wildlife?: boolean
    has_wetland_data?: boolean
    has_images?: boolean
    has_related_links?: boolean
    has_legal_statuses?: boolean
    has_noxious_statuses?: boolean
    has_documentation?: boolean
    has_distribution_data?: boolean
    has_invasive_statuses?: boolean
    has_characteristics?: boolean
    has_ethnobotany?: boolean
    has_pollinator?: boolean
    num_images?: bigint
    profile_image_filename?: string
    profile_image_url?: string
    image_id?: bigint
    plant_location_id?: bigint
    durations?: string
    growth_habits?: string
    other_common_names?: string
    plant_guide_urls?: string
    fact_sheet_urls?: string
    created_at?: Date
    updated_at?: Date
    data_checksum?: string
}

export type PlantAncestor = {
    id: bigint
    plant_id: bigint
    ancestor_id: bigint
    ancestor_symbol: string
    ancestor_scientific_name: string
    ancestor_common_name?: string
    ancestor_rank_id: bigint
    ancestor_rank: string
    ancestor_accepted_id: bigint
    hierarchy_level: bigint
}

export type PlantNativeStatus = {
    id: bigint
    plant_id: bigint
    region: string
    status: string
    status_type: string
}

export type PlantMapCoordinates = {
    id: bigint
    plant_id: bigint
    state_abbr: string
    x_min: number
    y_min: number
    x_max: number
    y_max: number
}

export type PlantCharacteristic = {
    id: bigint
    plant_id: bigint
    active_growth_period?: string
    bloat?: string
    c_n_ratio?: string
    coppice_potential?: string
    fall_conspicuous?: string
    fire_resistant?: string
    flower_color?: string
    flower_conspicuous?: string
    foliage_color?: string
    foliage_porosity_summer?: string
    foliage_porosity_winter?: string
    foliage_texture?: string
    fruit_seed_color?: string
    fruit_seed_conspicuous?: string
    growth_form?: string
    growth_rate?: string
    height_at_20_years_maximum_feet?: string
    height_mature_feet?: string
    known_allelopath?: string
    leaf_retention?: string
    lifespan?: string
    low_growing_grass?: string
    nitrogen_fixation?: string
    resprout_ability?: string
    shape_and_orientation?: string
    toxicity?: string
    adapted_to_coarse_textured_soils?: string
    adapted_to_fine_textured_soils?: string
    adapted_to_medium_textured_soils?: string
    anaerobic_tolerance?: string
    caco_3_tolerance?: string
    cold_stratification_required?: string
    drought_tolerance?: string
    fertility_requirement?: string
    fire_tolerance?: string
    frost_free_days_minimum?: string
    hedge_tolerance?: string
    moisture_use?: string
    ph_maximum?: number
    ph_minimum?: number
    planting_density_per_acre_maximum?: string
    planting_density_per_acre_minimum?: string
    precipitation_maximum?: string
    precipitation_minimum?: string
    root_depth_minimum?: string
    salinity_tolerance?: string
    shade_tolerance?: string
    temperature_minimum_f?: string
    bloom_period?: string
    commercial_availability?: string
    fruit_seed_abundance?: string
    fruit_seed_period_begin?: string
    fruit_seed_period_end?: string
    fruit_seed_persistence?: string
    propagated_by_bare_root?: string
    propagated_by_bulb?: string
    propagated_by_container?: string
    propagated_by_corm?: string
    propagated_by_cuttings?: string
    propagated_by_seed?: string
    propagated_by_sod?: string
    propagated_by_sprigs?: string
    propagated_by_tubers?: string
    seed_per_pound?: string
    seed_spread_rate?: string
    seedling_vigor?: string
    small_grain?: string
    vegetative_spread_rate?: string
    berry_nut_seed_product?: string
    christmas_tree_product?: string
    fodder_product?: string
    fuelwood_product?: string
    lumber_product?: string
    naval_store_product?: string
    nursery_stock_product?: string
    palatable_browse_animal?: string
    palatable_human?: string
    post_product?: string
    pulpwood_product?: string
    veneer_product?: string
}

export type PlantNote = {
    plant_id: bigint
    general_notes?: string
    synonym_notes?: string
    subordinate_taxa_notes?: string
    legal_notes?: string
    noxious_notes?: string
    rarity_notes?: string
    wetland_notes?: string
    related_links_notes?: string
    wildlife_notes?: string
    sources_notes?: string
    characteristic_notes?: string
    pollinator_notes?: string
    cultural_notes?: string
    ethnobotany_notes?: string
}

export type State = {
    plant_location_id: bigint
    plant_location_name: string
    plant_location_category?: string
    county_name?: string
    created_at?: Date
}

export type StatePlant = {
    id: bigint
    state_location_id: bigint
    plant_symbol: string
}

export type PlantDistribution = {
    plant_id: bigint
    plant_symbol: string
    native_states?: string
    introduced_states?: string
    total_native_states?: bigint
    total_introduced_states?: bigint
}

export type PlantTaxonomicPath = {
    plant_id: bigint
    kingdom?: string
    phylum?: string
    class_name?: string
    order_name?: string
    family?: string
    genus?: string
    species?: string
    subspecies?: string
    variety?: string
    form?: string
    full_path?: string
}