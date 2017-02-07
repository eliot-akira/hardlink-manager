import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'
import usage from './usage'
import { getLinks, setLinks, run, relative } from './utils'

export default function link({ src, dest, options }) {

  const { log } = console

  if (!dest) {
    const parts = src.split('/')
    if (parts.length < 2) usage()
    dest = parts[parts.length - 1]
  }

  if (dest.indexOf('/') >= 0) {
    const parts = dest.split('/')
    if (parts.length > 1) {
      const parent = parts.slice(0, -1).join('/')
      log('Create parent directory', relative(parent))
      mkdirp.sync(parent)
    }
  }

  if (!fs.existsSync(src)) {
    log(`Source "${src}" doesn't exist`)
    process.exit(1)
  }

  if (fs.existsSync(dest)) {
    log(`Destination "${dest}" already exists`)
    process.exit(1)
  }

  log(`Hardlink: ${src} <-> ${dest}`)

  // Resolve paths, including symbolic links
  src = fs.realpathSync(path.resolve(src))
  dest = path.resolve(dest)


  const links = getLinks(src).filter(f => f!==dest && f!==src)

  links.push(src, dest)

  setLinks(src, links)

  run(`hln ${src} ${dest}`)

  log('Remember: never "rm -rf" a hardlinked directory; use "hlnm -u"')

}