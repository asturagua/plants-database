import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import {plantsDatabase} from "./database.js";
import {typeDefs} from "./graphql/type-defs.js";
import {PlantResolversService} from "./graphql/plant-resolvers.service.js";
import {PlantService} from "./plant.service.js";
import {PlantRepository} from "./repository/plant.repository.js";

const plantRepository = new PlantRepository(plantsDatabase)
const plantService = new PlantService(plantRepository)
const resolvers = new PlantResolversService(plantService).getResolvers();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const PORT = 4000;

const {url} = await startStandaloneServer(server, {
    listen: {port: PORT},
})

console.log(`Server started at ${url}`);
