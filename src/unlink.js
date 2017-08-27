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

  const fullSrc = path.resolve(src)

  const links = getLinks(fullSrc).filter(f => f!==fullSrc)


  if (run(`hln -u ${fullSrc}`)) {

    if (links.length<2) {
      log('No more hardlinks')
      if (links.length) log(`Original: ${links[0]}`)
      emptyLinks(fullSrc)
    } else {
      log('Remaining hardlinks:')
      log(links.map(l => `  ${l}`).join("\n"))
      setLinks(fullSrc, links)
    }

  } else {
    log(`Failed to remove hardlink`)
  }

}