import Link from "next/link";
import illustration from "../public/homepage_illustration.svg";
import Image from "next/image";

export default function Home() {
	return (
		<div>
			<div className="mx-auto flex justify-between items-center max-w-6xl text-center lg:flex-auto lg:py-32 lg:text-left">
				<div>
					<div className="mb-8">
						<h1 className="font-bold text-5xl">Fa-ti viata mai usoara</h1>
						<h1 className="font-bold text-5xl">cu iNeedMaster</h1>
					</div>
					<div className="mb-12">
						<p>Platforma care conecteaza problemele si solutiile in cateva secunde.</p>
					</div>
					<Link href="#" className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-gray-900 whitespace-no-wrap bg-amber-300 border border-amber-300 rounded-md shadow-sm hover:bg-amber-400 focus:outline-none" data-rounded="rounded-md" data-primary="blue-600" data-primary-reset="{}">
						Solutii in orasul tau
					</Link>
				</div>
				<div>
					<Image
						src={illustration}
						width={500}
						height={500}
						alt="Illustration of a person looking at a list of items on a clipboard"
					/>
				</div>
			</div>
			<div>
				{/* TODO: filtre de cautat + buton de cauta - redirectioneaza catre pagina de search cu filtrele puse */}
			</div>
			<div>
				{/* TODO: lista cu cateva subcategorii */}
			</div>
			<div>
				<p>Cele mai recente anunturi</p>
				{/* TODO: lista cu ultimele anunturi postate */}
			</div>
			<div>
				{/* TODO: footer */}
			</div>
		</div>
	);
}
