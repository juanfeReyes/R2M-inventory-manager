import { rest } from 'msw'
import {faker} from '@faker-js/faker'

const baseUrl = "http://localhost:3000"

export const handlers = [
    rest.get(`${baseUrl}/package`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(Array.from({length: 20}, () => ({name: faker.name.firstName(), amount: faker.datatype.number()})))
        )
    })
]