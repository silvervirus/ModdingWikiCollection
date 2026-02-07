// components/VersionLink.tsx
import React from 'react'

type VersionLinkProps = {
  version: string
  url: string
}

export default function VersionLink({ version, url }: VersionLinkProps) {
  if (!version || !url) return null

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: '#9fdfff',
        fontWeight: 600,
        textDecoration: 'underline',
        cursor: 'pointer',
      }}
    >
      {version}
    </a>
  )
}

