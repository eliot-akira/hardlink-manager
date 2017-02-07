
export default function usage() {
  console.log(
`Usage:

  hlnm [source] [destination] - hard links source directory to destination
  hlnm -u [destination] - unlinks destination directory

Hardlinked paths are kept in .hardlinks for reference`
  )
  process.exit()
}