import { fetchFromExampleApi } from '@/api/exampleApi';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router'

const exampleQuery = queryOptions({
  queryKey: ['examplePosts'],
  queryFn: () => fetchFromExampleApi(),
  staleTime: 1000 * 60 * 5,
})

export const Route = createFileRoute("/example")({ 
  component: RouteComponent,
  loader: ({context}) => context.queryClient.ensureQueryData(exampleQuery),
})

function RouteComponent() {
  const { data } = useSuspenseQuery(exampleQuery)

  return (
    <div>
      <Link to="/">to index</Link>
        <ul className="list-decimal">
          {data.map(row => 
            <li key={row.id} className="py-2">{row.body}</li>
          )}
        </ul>
=    </div>
  )
}
