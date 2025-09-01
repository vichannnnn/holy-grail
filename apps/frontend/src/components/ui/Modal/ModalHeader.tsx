import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

interface ModalHeaderProps {
	imageSrc?: string;
	title: string;
	description?: string;
}

export const ModalHeader = ({ imageSrc = "/flower.png", title, description }: ModalHeaderProps) => {
	return (
		<div>
			<div className="mt-4">
				<button className="absolute top-0 right-0">
					<CloseIcon />
				</button>
			</div>
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
