export const typeDefs = `#graphql
type Plant {
    id: Int
    symbol: String
    scientificName: String
    commonName: String
    groupName: String
    rankId: Int
    rank: String
    acceptedId: Int
    profileImageFilename: String
    profileImageUrl: String
    plantDistribution: PlantDistribution
    plantCharacteristic: PlantCharacteristic
    durations: String
    growthHabits: String
    otherCommonNames: String
    plantGuideUrls: String
    factSheetUrls: String
}

type PlantCharacteristic {
    id: Int
    plantId: Int
    activeGrowthPeriod: String
    bloat: String
    cNRatio: String
    coppicePotential: String
    fallConspicuous: String
    fireResistant: String
    flowerColor: String
    flowerConspicuous: String
    foliageColor: String
    foliagePorositySummer: String
    foliagePorosityWinter: String
    foliageTexture: String
    fruitSeedColor: String
    fruitSeedConspicuous: String
    growthForm: String
    growthRate: String
    heightAt20YearsMaximumFeet: String
    heightMatureFeet: String
    knownAllelopath: String
    leafRetention: String
    lifespan: String
    lowGrowingGrass: String
    nitrogenFixation: String
    resproutAbility: String
    shapeAndOrientation: String
    toxicity: String
    adaptedToCoarseTexturedSoils: String
    adaptedToFineTexturedSoils: String
    adaptedToMediumTexturedSoils: String
    anaerobicTolerance: String
    caco3Tolerance: String
    coldStratificationRequired: String
    droughtTolerance: String
    fertilityRequirement: String
    fireTolerance: String
    frostFreeDaysMinimum: String
    hedgeTolerance: String
    moistureUse: String
    phMaximum: Float
    phMinimum: Float
    plantingDensityPerAcreMaximum: String
    plantingDensityPerAcreMinimum: String
    precipitationMaximum: String
    precipitationMinimum: String
    rootDepthMinimum: String
    salinityTolerance: String
    shadeTolerance: String
    temperatureMinimumF: String
    bloomPeriod: String
    commercialAvailability: String
    fruitSeedAbundance: String
    fruitSeedPeriodBegin: String
    fruitSeedPeriodEnd: String
    fruitSeedPersistence: String
    propagatedByBareRoot: String
    propagatedByBulb: String
    propagatedByContainer: String
    propagatedByCorm: String
    propagatedByCuttings: String
    propagatedBySeed: String
    propagatedBySod: String
    propagatedBySprigs: String
    propagatedByTubers: String
    seedPerPound: String
    seedSpreadRate: String
    seedlingVigor: String
    smallGrain: String
    vegetativeSpreadRate: String
    berryNutSeedProduct: String
    christmasTreeProduct: String
    fodderProduct: String
    fuelwoodProduct: String
    lumberProduct: String
    navalStoreProduct: String
    nurseryStockProduct: String
    palatableBrowseAnimal: String
    palatableHuman: String
    postProduct: String
    pulpwoodProduct: String
    veneerProduct: String
}

type PlantDistribution {
    #    plantId: Int
    #    plantSymbol: String
    nativeStates: String
    introducedStates: String
    totalNativeStates: Int
    totalIntroducedStates: Int
}

type PlantTaxonomicPath {
    plantId: Int
    kingdom: String
    phylum: String
    className: String
    orderName: String
    family: String
    genus: String
    species: String
    subspecies: String
    variety: String
    form: String
    fullPath: String
}

type PlantsNativeToLocation {
    state: String
    region: String
    nativePlants: [Plant]
    introducedPlants: [Plant]
}

input NativeRequest  {
    statesFilter: [String]
    includeIntroduced: Boolean
}

input CharacteristicsRequest {
    activeGrowthPeriod: String
    bloat: String
    cNRatio: String
    coppicePotential: String
    fallConspicuous: String
    fireResistant: String
    flowerColor: String
    flowerConspicuous: String
    foliageColor: String
    foliagePorositySummer: String
    foliagePorosityWinter: String
    foliageTexture: String
    fruitSeedColor: String
    fruitSeedConspicuous: String
    growthForm: String
    growthRate: String
    heightAt20YearsMaximumFeet: String
    heightMatureFeet: String
    knownAllelopath: String
    leafRetention: String
    lifespan: String
    lowGrowingGrass: String
    nitrogenFixation: String
    resproutAbility: String
    shapeAndOrientation: String
    toxicity: String
    adaptedToCoarseTexturedSoils: String
    adaptedToFineTexturedSoils: String
    adaptedToMediumTexturedSoils: String
    anaerobicTolerance: String
    caco3Tolerance: String
    coldStratificationRequired: String
    droughtTolerance: String
    fertilityRequirement: String
    fireTolerance: String
    frostFreeDaysMinimum: String
    hedgeTolerance: String
    moistureUse: String
    phMaximum: Int
    phMinimum: Int
    plantingDensityPerAcreMaximum: String
    plantingDensityPerAcreMinimum: String
    precipitationMaximum: String
    precipitationMinimum: String
    rootDepthMinimum: String
    salinityTolerance: String
    shadeTolerance: String
    temperatureMinimumF: String
    bloomPeriod: String
    commercialAvailability: String
    fruitSeedAbundance: String
    fruitSeedPeriodBegin: String
    fruitSeedPeriodEnd: String
    fruitSeedPersistence: String
    propagatedByBareRoot: String
    propagatedByBulb: String
    propagatedByContainer: String
    propagatedByCorm: String
    propagatedByCuttings: String
    propagatedBySeed: String
    propagatedBySod: String
    propagatedBySprigs: String
    propagatedByTubers: String
    seedPerPound: String
    seedSpreadRate: String
    seedlingVigor: String
    smallGrain: String
    vegetativeSpreadRate: String
    berryNutSeedProduct: String
    christmasTreeProduct: String
    fodderProduct: String
    fuelwoodProduct: String
    lumberProduct: String
    navalStoreProduct: String
    nurseryStockProduct: String
    palatableBrowseAnimal: String
    palatableHuman: String
    postProduct: String
    pulpwoodProduct: String
    veneerProduct: String
}

type Query {
    plants(
        idsFilter: [String]
        groupNamesFilter: [String]
    ): [Plant]
    plantByName(
        nameFilter: String!
        nameType: String
    ): [Plant]
    plantsByGroupAndDistributionAndCharacteristics(
        groupNamesFilter: [String]
        distributionFilter: NativeRequest
        characteristicsFilter: CharacteristicsRequest
    ): [Plant]
    plantsNativeTo(
        statesFilter: [String]!
        includeIntroduced: Boolean
    ): [Plant]
}
`