import fs from 'fs'
import path from 'path'
import { getLinks, setLinks, emptyLinks, relative, run } from './utils'

export default function({ src, options }) {

  const { log } = console

  if (!fs.existsSync(src)) {
    log(`Directory "${src}" doesn't eixst`)
    process.exit(1)
  }

  log(`Remove hardlink: ${src}`)

  src = path.resolve(src)

  const links = getLinks(src).filter(f => f!==src)

  // No more links
  if (links.length<2) {
    log('No more hardlinks')
    if (links.length) log(`Original: ${links[0]}`)
    emptyLinks(src)
  } else {
    log('Remaining hardlinks:')
    log(links.map(l => `  ${l}`).join("\n"))
    setLinks(src, links)
  }

  run(`hln -u ${src}`)

}