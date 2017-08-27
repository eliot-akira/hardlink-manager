import path from 'path'
import glob from 'glob'

export default function list() {

  // List all .hardlinks in current folder and descendants
  const currentPath = process.cwd()
  const { log } = console

  const globPath = path.join(currentPath, '**', '.hardlinks')
  const options = {
    ignore: ['**/.git/**', '**/_*/**', `**/node_modules/**`]
  }
  const hardlinks = glob.sync(globPath, options)

  if (!hardlinks.length) {
    log('No hardlinks found')
    return
  }

  hardlinks.forEach(link => {
    const folder = path.relative(currentPath, path.dirname(link))
    log(folder || '.')
  })
}