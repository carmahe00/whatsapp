import jwt from 'jsonwebtoken';
import { logging } from '../configs/logger';

export const sign = async (payload: object, expireIn: string, secret: string) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, {
            expiresIn: expireIn
        }, (err, token) => {
            if (err) {
                logging.error(err)
                reject(err)
            }
            else
                resolve(token)
        })
    })
}

export const verify = async (token: string, secret: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, token) => {
            if (err) {
                logging.error(err)
                reject(err)
            }
            else
                resolve(token)
        })
    })
}