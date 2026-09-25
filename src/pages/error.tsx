import { Component, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

type Props = { children: ReactNode }
type State = { error: Error | null }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error) {
    // Log the error to an error reporting service
    console.error(error)
  }

  reset = () => this.setState({ error: null })

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="flex flex-col items-center gap-6 text-center max-w-md">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <AlertCircle className="h-10 w-10 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold">Something went wrong!</h2>
          <p className="text-muted-foreground">
            An error occurred while rendering this page. Please try again or contact support if the
            problem persists.
          </p>
          <Button onClick={this.reset}>Try again</Button>
        </div>
      </div>
    )
  }
}
