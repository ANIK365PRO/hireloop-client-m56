'use server';

import { serverMutation } from "../core/server"

export const createSubscription = async (subInfo) => {
    console.log(subInfo)
    return serverMutation('/api/subscriptions', subInfo);
}