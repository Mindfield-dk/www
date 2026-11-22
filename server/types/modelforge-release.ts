// The manifest ModelForge's release script uploads beside the packages (scripts/release/manifest.mjs in
// localgod/ModelForge): modelforge/latest.json on the download host.
export interface ModelForgeFile {
  platform: 'mac' | 'win' | 'linux'
  arch: string
  kind: 'installer' | 'archive'
  /** Path under the download host's modelforge/ folder, e.g. `0.1.0/ModelForge-0.1.0-mac-universal.dmg`. */
  file: string
  size: number
  sha256: string
}

export interface ModelForgeRelease {
  version: string
  /** The ModelForge commit the packages were built from, which the release's tag names. */
  commit: string
  date: string
  platforms: Record<ModelForgeFile['platform'], ModelForgeFile[]>
}

/** What the page gets: the release with absolute download links, or `release: null` before the first one. */
export interface ModelForgeDownloads {
  release: (Omit<ModelForgeRelease, 'platforms'> & {
    platforms: Record<ModelForgeFile['platform'], (ModelForgeFile & { url: string })[]>
    checksums: string
  }) | null
}
