'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_model_1 = __importDefault(require("./index.model"));
const Schema = index_model_1.default.Schema;
const querySchema = new Schema({
    domainName: { type: String },
    log: { type: String },
}, { timestamps: true });
// const querySchema = new Schema({
//   domainName: {type: String},
//   registryDomainId: {type: String},
//   registrarWhoisServer: {type: String},
//   registrarUrl: {type: String},
//   updatedDate: {type: String},
//   creationDate: {type: String},
//   registryExpirationDate: {type: String},
//   registrar: {type: String},
//   registrarIanaId: {type: String},
//   registrarAbuseContactEmail: {type: String},
//   registrarAbuseContactPhone: {type: String},
//   domainStatus: {type: String},
//   nameServer1: {type: String},
//   nameServer2: {type: String},
//   dnssec: {type: String},
//   urlOfTheIcannWhoisInaccuracyComplaintForm: {type: String},
//   lastUpdateOfWhoisDatabase: {type: String},
// }, { timestamps: true });
const QueryModel = index_model_1.default.model('Query', querySchema);
exports.default = QueryModel;
