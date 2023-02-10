interface inputType {
  domain: string,
  protocol: string,
  apexDomain: string
}

// Helper function to fetch the theme name from the database
export async function fetchThemeName({domain, protocol, apexDomain}: inputType) {
  const response = await fetch(`${protocol}://${apexDomain}/api/site`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(`${domain}.devtestingxyz.store`),
  })

  const {themeName} = await response.json() as {themeName: string}

  return themeName
}