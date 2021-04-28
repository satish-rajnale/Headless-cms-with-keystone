const dotenv = require("dotenv").config();
const { Keystone } = require('@keystonejs/keystone');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const { PasswordAuthStrategy } = require("@keystonejs/auth-password")



const PROJECT_NAME = 'cms';
const adapterConfig = { mongoUri: process.env.MONGO_URI };




const PostSchema = require("./lists/Post") // includ the file
const UserSchema = require("./lists/User") // includ the file

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  cookieSecret: process.env.COOKIE_SECRET // from .env so that it wont create each time a new cookie
});

//order matters here after defining keystone only
keystone.createList('Post', PostSchema); // here Post is a name you can give and PostSchema is the schema required 
keystone.createList('User', UserSchema); // here Post is a name you can give and PostSchema is the schema required 


const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: "User",
  config: {
    identityField: "email",
    secretField: "password"
  }
})




module.exports = {
  keystone,
  apps: [new GraphQLApp(), new AdminUIApp({
     name: PROJECT_NAME, 
     enableDefaultRoute: true,
     authStrategy})],
};
