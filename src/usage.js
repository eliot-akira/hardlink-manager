
export default function usage() {
  console.log(
`Usage:

  hlnm [source] [destination] - create a hardlink of source directory to destination
  hlnm -u [destination] - unlink destination directory
  hlnm -l - list all hardlinks under current directory

Linked paths are kept in .hardlinks inside the directory`
  )
  process.exit()
}