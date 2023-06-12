"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcryptjs_1 = require("bcryptjs");
var mysql = require("mysql");
// import bcrypt from 'bcrypt';
var bcrypt = require('bcrypt');
// import cors from 'cors';
var cors = require('cors');
var express = require('express');
var nodemailer = require("nodemailer");
var rateLimit = require('express-rate-limit');
var uuid_1 = require("uuid");
var verificationToken = (0, uuid_1.v4)();
// console.log(verificationToken);
var verificationCode = '';
var userEmail = '';
var DataBase = /** @class */ (function () {
    function DataBase() {
        this._connection = mysql.createConnection({
            host: 'YOUR_HOST',
            port: 3306,
            user: 'YOUR_USER_NAME',
            password: 'YOUR_PASSWORD',
            database: 'YOUR_DATABASE_NAME',
        });
        this._connection.connect(function (err) {
            if (err) {
                console.log('Error connecting to Db');
                return;
            }
            else {
                console.log('Connection established');
            }
        });
    }
    Object.defineProperty(DataBase.prototype, "connection", {
        get: function () {
            return this._connection;
        },
        enumerable: false,
        configurable: true
    });
    return DataBase;
}());
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.limiter = rateLimit({
            windowMs: 60 * 1000,
            max: 2,
            message: 'Too many login attempts. Please try again later.',
        });
        this.express = express();
        this.express.use(express.json());
        this._db = new DataBase();
        this.express.use(cors());
        this.express.post('/adduser', function (req, res) { return _this.addUser(req, res); });
        this.express.put('/verify', function (req, res) { return _this.verifyOTP(req, res); });
        this.express.post('/login', this.limiter, function (req, res) { return _this.loginUser(req, res); });
        this.listen(3000);
    }
    App.prototype.addUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, email, password, sql;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                        userEmail = email;
                        sql = 'SELECT * FROM sign_up WHERE email = ?';
                        return [4 /*yield*/, this._db.connection.query(sql, [email], function (err, result) { return __awaiter(_this, void 0, void 0, function () {
                                var hashedPassword, sql_1;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!err) return [3 /*break*/, 1];
                                            return [2 /*return*/, res.json(err)];
                                        case 1:
                                            console.log(email);
                                            if (!(result.length > 0)) return [3 /*break*/, 6];
                                            if (!(result[0].email_verifyed === 1)) return [3 /*break*/, 2];
                                            console.log('Email already exists');
                                            return [2 /*return*/, res.json({ error: true })];
                                        case 2: return [4 /*yield*/, generateVerificationCode()];
                                        case 3:
                                            verificationCode = _a.sent();
                                            return [4 /*yield*/, this._db.connection.query('UPDATE sign_up SET verification_code = ? WHERE email = ?', [verificationCode, email], function (err, result) {
                                                    if (err) {
                                                        console.log(err);
                                                    }
                                                    console.log('Verification code added to database');
                                                })];
                                        case 4:
                                            _a.sent();
                                            // new sendEmail();
                                            // res.json(result);
                                            return [2 /*return*/, res.json({ error: false })];
                                        case 5: return [3 /*break*/, 8];
                                        case 6:
                                            if (!(result.length == 0 || result[0].email_verifyed === 0)) return [3 /*break*/, 8];
                                            return [4 /*yield*/, bcrypt.hashSync(password, 10)];
                                        case 7:
                                            hashedPassword = _a.sent();
                                            sql_1 = 'INSERT INTO sign_up (userName, email, password) VALUES (?, ?, ?)';
                                            // console.log(name);
                                            this._db.connection.query(sql_1, [name, email, hashedPassword], function (err, result) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            if (err) {
                                                                console.log(err);
                                                                return [2 /*return*/, res.json({ error: '.....An error occurred' })];
                                                            }
                                                            return [4 /*yield*/, generateVerificationCode()];
                                                        case 1:
                                                            verificationCode = _a.sent();
                                                            return [4 /*yield*/, this._db.connection.query('UPDATE sign_up SET verification_code = ? WHERE email = ?', [verificationCode, email], function (err, result) {
                                                                    if (err) {
                                                                        console.log(err);
                                                                    }
                                                                    console.log('Verification code added to database');
                                                                })];
                                                        case 2:
                                                            _a.sent();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                            return [2 /*return*/, res.json({ error: false, result: 'User added successfully' })];
                                        case 8: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.verifyOTP = function (reg, res) {
        var _this = this;
        var verifyotp = reg.body.verifyotp;
        // console.log('////////', verifyotp);
        var sql = 'SELECT verification_code FROM sign_up WHERE verification_code = ?';
        this._db.connection.query(sql, [verifyotp], function (err, result) {
            if (err) {
                console.log(err);
                return res.json({ error: 'An error occurred' });
            }
            else {
                if (result.length > 0) {
                    console.log('OTP  exists');
                    var updateSql = 'UPDATE sign_up SET email_verifyed = ? WHERE verification_code = ?';
                    _this._db.connection.query(updateSql, [1, verifyotp], function (err, result) {
                        if (err) {
                            console.log(err);
                        }
                        return res.json({ result: 'Email verified' });
                    });
                }
                else {
                    console.log('Invalid OTP');
                    return res.json({ error: true, result: 'Invalid OTP' });
                }
            }
        });
    };
    App.prototype.loginUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, sql;
            var _this = this;
            return __generator(this, function (_b) {
                _a = req.body, email = _a.email, password = _a.password;
                console.log(email, password);
                sql = 'SELECT * FROM sign_up where email=?';
                this._db.connection.query(sql, [email], function (err, result) { return __awaiter(_this, void 0, void 0, function () {
                    var comparePassword;
                    return __generator(this, function (_a) {
                        if (err) {
                            console.log(err, 'error___________');
                            return [2 /*return*/, res.json({ error: 'An error occurred' })];
                        }
                        else {
                            if ((result.length > 0) && (result[0].email_verifyed === 1)) {
                                comparePassword = (0, bcryptjs_1.compareSync)(password, result[0].password);
                                // console.log(comparePassword);
                                if (comparePassword) {
                                    return [2 /*return*/, res.json({ result: 'Login Successfull' })];
                                }
                                else {
                                    return [2 /*return*/, res.json({ error: 'false' })];
                                }
                            }
                            else {
                                return [2 /*return*/, res.json({ error: 'false' })];
                            }
                        }
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    App.prototype.listen = function (port) {
        this.express.listen(port, function () {
            console.log("Server listening on port ".concat(port));
        });
    };
    return App;
}());
var app = new App();
// const userEmail = app.addUser.userEmail;
var sendEmail = /** @class */ (function () {
    function sendEmail() {
        this.emailMessage = {
            from: 'YOUR_EMAIL',
            to: "".concat(userEmail),
            subject: 'Email Verification',
            html: "\n      <p>Please click the following link to verify your email:</p>\n      <p>".concat(verificationCode, "</p>\n    "),
        };
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'YOUR_EMAIL',
                pass: 'YOUR_PASSWORD',
            },
        });
        this.sendEmail();
    }
    sendEmail.prototype.sendEmail = function () {
        this.transporter.sendMail(this.emailMessage, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent:', info.response);
            }
        });
    };
    return sendEmail;
}());
function generateVerificationCode() {
    var code = Math.floor(100000 + Math.random() * 900000);
    return code.toString();
}
// let sendemail = new sendEmail();
// Create a nodemailer transporter with your email provider's configuration
// Compose the email message
// Send the email
// this.express.get('/verify', (req: Request, res: Response) => {
//   const { token } = req.query;
//   // Retrieve the user record from the database using the verification token
//   // Compare the token with the one stored in the database
//   // If they match, update the user record to mark the email as verified
//   // Example implementation
//   const sql = 'UPDATE sign_up SET email_verified = true WHERE verification_token = ?';
//   this._db.connection.query(sql, [token], (err: any, result: any) => {
//     if (err) {
//       console.log(err);
//       res.status(500).json({ error: 'An error occurred' });
//     } else {
//       res.send('Email verified successfully!');
//     }
//   });
// });
// Handle the query result and potential errors
