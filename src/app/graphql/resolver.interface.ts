import {IResolvers} from "@graphql-tools/utils";
import {BaseContext} from "@apollo/server";

export interface ResolverInterface {
    getResolvers(): IResolvers<any, BaseContext> | IResolvers<any, BaseContext>[] | undefined;
}