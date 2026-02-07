export default function NexusImportButton() {
  const importMod = async () => {
    const res = await fetch('http://localhost:3001/api/nexus/import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        gameId: 'subnautica',
        modId: 12345,
      }),
    })

    const data = await res.json()
    alert(data.success ? 'Imported!' : data.error)
  }

  return (
    <button
      onClick={importMod}
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: '#ff79c6',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      Import from Nexus
    </button>
  )
}

