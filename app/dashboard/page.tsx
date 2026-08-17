import CaseWorkspace from './CaseWorkspace'

export const metadata = {
  title: 'Code Enforcement Case Workspace | My-CoMind',
  description: 'Build an evidence-first code enforcement case from notices, supporting documents, property facts, deadlines, and confirmed case information.',
}

export default function Dashboard() {
  return <main className="appShell"><CaseWorkspace /></main>
}
