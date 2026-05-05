import Layout from '../components/Layout'

interface DummyPageProps {
	title: string
}

export default function DummyPage({ title }: DummyPageProps) {
	return (
		<Layout title={title}>
		<div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
			<div className="w-16 h-16 rounded-full bg-[#6c8ee8]/10 flex items-center justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#6c8ee8"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<rect width="18" height="18" x="3" y="3" rx="2" />
					<path d="M3 9h18M9 21V9" />
				</svg>
			</div>
			<h2 className="text-xl font-semibold text-gray-700">{title}</h2>
			<p className="text-sm text-muted-foreground max-w-xs">
				This page is under construction. Content for <strong>{title}</strong> will appear here.
			</p>
		</div>
		</Layout>
	)
}
