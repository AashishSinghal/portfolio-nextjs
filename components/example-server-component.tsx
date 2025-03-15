export async function ExampleServerComponent() {
  // Server-side data fetching with proper caching
  const data = await fetchDataWithCache()

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">
        This component fetches data on the server and renders it directly. No client-side JavaScript is sent for this
        component.
      </p>
      <div className="p-3 bg-muted rounded-md">
        <pre className="text-xs overflow-auto">{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  )
}

// Example of data fetching with proper cache control for SSR
async function fetchDataWithCache() {
  // This is just a mock - in a real app, you'd fetch from an actual API
  // The fetch options are important for SSR optimization
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
    // Next.js 15 cache options:
    cache: "force-cache", // Default, equivalent to getStaticProps in pages router
    // For revalidation:
    // next: { revalidate: 60 } // Revalidate every 60 seconds
  })

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

