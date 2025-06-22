import { ProgressBarRow } from "./components/progressBar/progressBarRow"

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="w-[250px] space-y-2 bg-white p-4 rounded-lg shadow">
        <ProgressBarRow value={100} color="green" />
        <ProgressBarRow value={60} color="yellow" />
        <ProgressBarRow value={20} color="red" />
        <ProgressBarRow value={100} color="gray" />
      </div>
    </div>
  )
}

export default App
