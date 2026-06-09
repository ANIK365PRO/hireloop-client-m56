
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.AUTH_DB_NAME);


export const auth = betterAuth({
  emailAndPassword: { 
   enabled: true, 
 }, 

  database: mongodbAdapter(db, {
    client
  }),

  
  // role base authentication to additional fields. 

  user: {
    additionalFields: {
      role: {
        default: "seeker"
      }
    }
  }
});