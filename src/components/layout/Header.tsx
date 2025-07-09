import Image from "next/image";

export default function Header({ onLogoClick }: { onLogoClick?: () => void }) {
	return (
		<div className="w-full bg-black/80 flex items-center px-8 py-1 h-[90px]">
			<div 
				onClick={onLogoClick}
				className="cursor-pointer hover:opacity-80 transition-opacity"
			>
				<img src="https://mindscaperx.com/images/logo.svg" alt="MindscapeRx Logo" className="h-16 w-auto mr-3" />
			</div>
			<span className="text-white text-2xl tracking-tight text-5xl leading-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
				{/* Admin<span className="text-yellow-400"> Panel</span> */}
				Admin Panel
			</span>
			{/* Optionally, add navigation or user info here */}
		</div>
	)
}