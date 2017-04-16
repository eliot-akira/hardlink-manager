import minimist from 'minimist'
import usage from './usage'
import link from './link'
import unlink from './unlink'
import list from './list'

const { _: args, ...options } = minimist(process.argv.slice(2))

if (typeof options.u !== 'undefined') {

  const src = options.u

  if (!src) usage()

  unlink({ src, options })

} else if (typeof options.l !== 'undefined') {

  list()

} else {

  if (!args.length) usage()

  const [src, dest] = args

  link({ src, dest, options })
}
