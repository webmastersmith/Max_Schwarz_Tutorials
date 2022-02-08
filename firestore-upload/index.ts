import hyperid from 'hyperid'
import crypto from 'crypto'

// @ts-ignore
// prettier-ignore
export const uuid = (a) => (a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,uuid))

console.time('First Test') //label
console.log(hyperid().uuid) //7620f514-1fd1-4f93-9271-40d6ea3dccb7
console.timeEnd('First Test') //label

console.time('Second Test')
console.log(crypto.randomUUID())
console.timeEnd('Second Test')

console.time('Third Test') //label
console.log(uuid('')) //7620f514-1fd1-4f93-9271-40d6ea3dccb7
console.timeEnd('Third Test')
