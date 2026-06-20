import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    'seeker_pro' : 'price_1Tk6JxAJFsEvUVnsJbAD1s0A',
    'seeker_premium' : 'price_1Tk6NqAJFsEvUVnsNT93zcMg',
    'recruiter_growth' : 'price_1Tk6QJAJFsEvUVnskKtAeaJG',
    'recruiter_enterprise' : 'price_1Tk6QJAJFsEvUVnskKtAeaJG',
}