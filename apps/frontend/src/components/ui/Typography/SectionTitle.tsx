import Image from "next/image";

interface SectionTitleProps {
	imageSrc?: string;
	title: string;
	description?: string;
}

export const SectionTitle = ({
	imageSrc = "/trimmy-grail-chan-sparkling.webp",
	title,
	description,
}: SectionTitleProps) => {
	return (
		<div>
			<div className="flex flex-col gap-4 justify-center items-center m-auto">
				{imageSrc && <Image src={imageSrc} alt="Icon" height="64" width="64" />}
				<h1
					className={`mb-${description ? "2" : "4"} text-3xl text-hima-dark dark:text-hima-white font-bold`}
				>
					{title}
				</h1>
				{description && <p className="mb-4">{description}</p>}
			</div>
		</div>
	);
};
