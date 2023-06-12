import { compare, compareSync } from 'bcryptjs';
import express, { Express, Request, Response } from 'express';
import * as mysql from 'mysql';
// import bcrypt from 'bcrypt';
const bcrypt = require('bcrypt');
// import cors from 'cors';
const cors = require('cors');
const express = require('express');
import * as nodemailer from 'nodemailer';
const rateLimit = require('express-rate-limit');



import { v4 as uuidv4 } from 'uuid';
const verificationToken = uuidv4();
// console.log(verificationToken);
let verificationCode = '';
let userEmail = '';

class DataBase {
  private _connection: mysql.Connection;

  constructor() {
    this._connection = mysql.createConnection({
      host: '127.0.0.1',
      port: 3306,
      user: 'thangam',
      password: 'Thasan24',
      database: 'test',
    });

    this._connection.connect((err) => {
      if (err) {
        console.log('Error connecting to Db');
        return;
      } else {
        console.log('Connection established');
      }
    });
  }

  get connection() {
    return this._connection;
  }
}

class App {
  public express: Express;
  private _db: DataBase;

   limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 2, // 5 requests per minute
    message: 'Too many login attempts. Please try again later.',
  });

  constructor() {
    this.express = express();
    this.express.use(express.json());
    this._db = new DataBase();
    this.express.use(cors());

    this.express.post('/adduser', (req: Request, res: Response) => this.addUser(req, res));
    this.express.put('/verify', (req: Request, res: Response) => this.verifyOTP(req, res));
    this.express.post('/login',this.limiter, (req: Request, res: Response) => this.loginUser(req, res));
    this.listen(3000);
  }

  public async addUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    userEmail = email;
    let sql = 'SELECT * FROM sign_up WHERE email = ?';
    await this._db.connection.query(sql, [email], async (err: any, result: any) => {
      if (err) {
        return res.json(err)
      } else {
        console.log(email);
        if (result.length > 0) {
          if (result[0].email_verifyed === 1) {
            console.log('Email already exists');
            return res.json({ error: true });
          } else {
            verificationCode = await generateVerificationCode();
            await this._db.connection.query('UPDATE sign_up SET verification_code = ? WHERE email = ?', [verificationCode, email], (err: any, result: any) => {
              if (err) {
                console.log(err);
              }
              console.log('Verification code added to database');
            });
            // new sendEmail();
            // res.json(result);
            return res.json({ error: false });
          }
        } else {
          if (result.length == 0 || result[0].email_verifyed === 0) {
            const hashedPassword = await bcrypt.hashSync(password, 10);
            let sql = 'INSERT INTO sign_up (userName, email, password) VALUES (?, ?, ?)';
            // console.log(name);
            this._db.connection.query(sql, [name, email, hashedPassword], async (err: any, result: any) => {
              if (err) {
                console.log(err);
                return res.json({ error: '.....An error occurred' });
              }
              verificationCode = await generateVerificationCode();
              await this._db.connection.query('UPDATE sign_up SET verification_code = ? WHERE email = ?', [verificationCode, email], (err: any, result: any) => {
                if (err) {
                  console.log(err);
                }
                console.log('Verification code added to database');
              });
              // new sendEmail();
              // res.json(result);
            });
            return res.json({ error: false, result: 'User added successfully' });
          }
        }
      }
    });
  }

  public verifyOTP(reg: Request, res: Response) {
    const { verifyotp } = reg.body;
    // console.log('////////', verifyotp);
    let sql = 'SELECT verification_code FROM sign_up WHERE verification_code = ?';
    this._db.connection.query(sql, [verifyotp], (err: any, result: any) => {
      if (err) {
        console.log(err);
        return res.json({ error: 'An error occurred' });
      }
      else {
        if (result.length > 0) {
          console.log('OTP  exists');
          let updateSql = 'UPDATE sign_up SET email_verifyed = ? WHERE verification_code = ?';
          this._db.connection.query(updateSql, [1, verifyotp], (err: any, result: any) => {
            if (err) {
              console.log(err);
            }
            return res.json({ result: 'Email verified' });
          });
        } else {
          console.log('Invalid OTP');
          return res.json({ error: true, result: 'Invalid OTP' });
        }
      }
    });
  }

  public async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    console.log(email, password);
    let sql = 'SELECT * FROM sign_up where email=?';
    this._db.connection.query(sql, [email], async (err: any, result: any) => {
      if (err) {
        console.log(err,'error___________');
        return res.json({ error: 'An error occurred' });
      } else {
        if ((result.length > 0) && (result[0].email_verifyed === 1)) {
          const comparePassword = compareSync(password, result[0].password);
          // console.log(comparePassword);
          if (comparePassword) {
            return res.json({ result: 'Login Successfull' });
          } else {
            return res.json({ error: 'false' });
          }
        } else {
          return res.json({ error: 'false' });
        }
      }
    });
  }

  public listen(port: number) {
    this.express.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
}

const app = new App();
// const userEmail = app.addUser.userEmail;

class sendEmail {
  transporter: any;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'thangam.nainar0507@gmail.com',
        pass: 'xlbcpppayugxsamm',
      },
    });
    this.sendEmail();
  }

  emailMessage = {
    from: 'thangam.nainar0507@gmail.com',
    to: `${userEmail}`,
    subject: 'Email Verification',
    html: `
      <p>Please click the following link to verify your email:</p>
      <p>${verificationCode}</p>
    `,
  };
  sendEmail() {
    this.transporter.sendMail(this.emailMessage, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }

}

function generateVerificationCode() {
  const code = Math.floor(100000 + Math.random() * 900000);
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

