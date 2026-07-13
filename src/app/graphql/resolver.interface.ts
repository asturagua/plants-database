import {IResolvers} from "@graphql-tools/utils";
import {BaseContext} from "@apollo/server";

export interface ResolverInterface {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getResolvers(): IResolvers<any, BaseContext> | IResolvers<any, BaseContext>[] | undefined;
}