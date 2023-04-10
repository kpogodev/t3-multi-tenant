interface inputType {
  protocol: string,
  domain: string,
  apexDomain: string
}

// Helper function to fetch the theme name from the database
export async function fetchThemeName({protocol, domain, apexDomain}: inputType) {
  const response = await fetch(`${protocol}://${apexDomain}/api/site?domain=${domain}`)
  const {themeName} = await response.json() as {themeName: string}

  return themeName
}