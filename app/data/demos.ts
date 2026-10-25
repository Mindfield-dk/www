export interface Demo {
  name: string
  url: string
  description: string
  tags?: string[]
  // Public GitHub repository, shown as a secondary "Source" link
  repo?: string
}

export const demos: Demo[] = [
  {
    name: 'ModelForge',
    url: 'https://modelforge.mindfield.dk/',
    description: 'A lightweight, scriptable modeling tool for creating and managing enterprise architecture diagrams. Fully compatible with ArchiMate standards.',
    tags: ['archimate']
  },
  {
    name: 'Polaris',
    url: 'https://polaris.mindfield.dk/',
    description: 'An enterprise technology catalog for managing and documenting technology assets within an organization.',
    tags: ['sbom'],
    repo: 'https://github.com/localgod/polaris'
  }
]
