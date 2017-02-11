# Hardlink manager

Utility for managing hardlinks on macOS

## Purpose

[`hardlink`](https://github.com/selkhateeb/hardlink) is a useful tool for creating directory hardlinks. However, it can be difficult to remember where all the hardlinks exist for a ceratin directory, if any. Also, there is a risk of removing a hardlinked directory with `rm -rf` and all other linked directories will disappear at once :fire:.

`hardlink-manager` is a wrapper that stores all hardlink locations in a file called `.hardlinks` at the root of the linked directory. When no more hardlinks exist, the file is removed.

This way, it's easy to know if/when a certain directory is hardlinked, and to what locations. The file `.hardlinks` should be added to `.gitignore`.

## Requirement

`hardlink` should be installed and available as command `hln`

```bash
brew install hardlink-osx
```

## Install

```bash
npm install hardlink-manager -g
```

## Usage

Create hardlink

```bash
hlnm [source] [destination]
```

If destination is not specified, the original folder name will be used.

---

Remove hardlink

```bash
hlnm -u [destination]
```
