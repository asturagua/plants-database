export type NativeRequest = {
    statesFilter: string[]
    includeIntroduced?: boolean
}

export type PlantNameRequest = {
    nameFilter: string,
    nameType?: string
}

export type PlantRequest = {
    groupNamesFilter?: string[]
    distributionFilter?: NativeRequest
    characteristicsFilter?: CharacteristicsRequest
}

export type CharacteristicsRequest = {
    activeGrowthPeriod?: string
    bloat?: string
    cNRatio?: string
    coppicePotential?: string
    fallConspicuous?: string
    fireResistant?: string
    flowerColor?: string
    flowerConspicuous?: string
    foliageColor?: string
    foliagePorositySummer?: string
    foliagePorosityWinter?: string
    foliageTexture?: string
    fruitSeedColor?: string
    fruitSeedConspicuous?: string
    growthForm?: string
    growthRate?: string
    heightAt20YearsMaximumFeet?: string
    heightMatureFeet?: string
    knownAllelopath?: string
    leafRetention?: string
    lifespan?: string
    lowGrowingGrass?: string
    nitrogenFixation?: string
    resproutAbility?: string
    shapeAndOrientation?: string
    toxicity?: string
    adaptedToCoarseTexturedSoils?: string
    adaptedToFineTexturedSoils?: string
    adaptedToMediumTexturedSoils?: string
    anaerobicTolerance?: string
    caco3Tolerance?: string
    coldStratificationRequired?: string
    droughtTolerance?: string
    fertilityRequirement?: string
    fireTolerance?: string
    frostFreeDaysMinimum?: string
    hedgeTolerance?: string
    moistureUse?: string
    phMaximum?: number
    phMinimum?: number
    plantingDensityPerAcreMaximum?: string
    plantingDensityPerAcreMinimum?: string
    precipitationMaximum?: string
    precipitationMinimum?: string
    rootDepthMinimum?: string
    salinityTolerance?: string
    shadeTolerance?: string
    temperatureMinimumF?: string
    bloomPeriod?: string
    commercialAvailability?: string
    fruitSeedAbundance?: string
    fruitSeedPeriodBegin?: string
    fruitSeedPeriodEnd?: string
    fruitSeedPersistence?: string
    propagatedByBareRoot?: string
    propagatedByBulb?: string
    propagatedByContainer?: string
    propagatedByCorm?: string
    propagatedByCuttings?: string
    propagatedBySeed?: string
    propagatedBySod?: string
    propagatedBySprigs?: string
    propagatedByTubers?: string
    seedPerPound?: string
    seedSpreadRate?: string
    seedlingVigor?: string
    smallGrain?: string
    vegetativeSpreadRate?: string
    berryNutSeedProduct?: string
    christmasTreeProduct?: string
    fodderProduct?: string
    fuelwoodProduct?: string
    lumberProduct?: string
    navalStoreProduct?: string
    nurseryStockProduct?: string
    palatableBrowseAnimal?: string
    palatableHuman?: string
    postProduct?: string
    pulpwoodProduct?: string
    veneerProduct?: string
}