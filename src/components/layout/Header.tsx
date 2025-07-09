import { MessageSquare } from "lucide-react";

export default function Header() {
	return (
		< div className="bg-white border-b border-gray-200 h-[90px]" >
			<div className="px-6 py-4">
				<div className="flex items-center gap-4">
					<div className="w-8 h-8 bg-[#E9F9FD] rounded-lg flex items-center justify-center">
						<MessageSquare className="w-5 h-5 text-blue-600" />
					</div>
					<div>
						<h1 className="text-2xl font-bold text-gray-900">Welcome to MindScape Admin Dashboard</h1>
						<p className="text-gray-600">Send compassionate, timely messages to support healing journeys</p>
					</div>
				</div>
			</div>
		</div >
	)
}