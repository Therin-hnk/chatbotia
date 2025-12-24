import { configure, processCLIArgs, run } from '@japa/runner'
import { assert } from '@japa/assert'
import { apiClient } from '@japa/api-client'
import { expectTypeOf } from '@japa/expect-type'
import dotenv from 'dotenv'
dotenv.config()

processCLIArgs(process.argv.splice(2))
configure({
  files: ['tests/**/*.spec.ts'],
  plugins: [
    assert(),
    apiClient(`http://localhost:${process.env.PORT}`),
    expectTypeOf(),
  ],
})

run()