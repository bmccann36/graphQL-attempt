"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// namespace express import express
const express_graphql_1 = __importDefault(require("express-graphql"));
require("morgan");
require("body-parser");
const schema = require('./schema');
const app = express_1.default();
app.use('/graphql', express_graphql_1.default({
    schema,
    graphiql: true
}));
app.listen(4000);
console.log('listening');
//# sourceMappingURL=serve.js.map