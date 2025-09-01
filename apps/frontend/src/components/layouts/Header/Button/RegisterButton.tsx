import { Button } from "@components/Button";

import { User } from "@providers/AuthProvider";

import { useNavigate } from "@utils/navigation";

interface RegisterButtonProps {
	user: User | null;
}

export const RegisterButton = ({ user }: RegisterButtonProps) => {
	const router = useNavigate();

	const handleRedirectRegisterAccountPage = () => {
		if (!user) {
			router.navigateTo("/register");
		} else {
			window.location.reload();
		}
	};

	return (
		<Button className="w-24 h-10" onClick={handleRedirectRegisterAccountPage}>
			Register
		</Button>
	);
};
