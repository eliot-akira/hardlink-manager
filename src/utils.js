import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

export const relative = file => path.relative(process.cwd(), file)
export const linkReferencePath = src => path.join(src, '.hardlinks')

export const run = (command, options = {}) => {
  try {
    execSync(command, { stdio: 'inherit', ...options })
  } catch(e) {
    // Error is streamed
  }
}

export const getLinks = src => {
  const filePath = linkReferencePath(src)
  if (!fs.existsSync(filePath)) return []
  try {
    const links = fs.readFileSync(filePath, 'utf8').split("\n")
    return links.filter(l => l ? true : false)
  } catch(e) {
    return []
  }
}

export const setLinks = (src, links) => {
  fs.writeFileSync(
    linkReferencePath(src),
    links
      .filter(l => l ? true : false)
      .join("\n"),
    'utf8'
  )
}

export const emptyLinks = src => {
  const filePath = linkReferencePath(src)
  if (!fs.existsSync(filePath)) return
  run(`rm ${filePath}`)
}