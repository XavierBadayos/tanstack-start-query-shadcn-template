import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/")({ 
  component: App,
})

function App() {  
  return (
    <div className="flex min-h-svh p-6">
      <Link to="/example">to example</Link>
      <h1 className="text-lg">Hi</h1>
    </div>
  )
}
