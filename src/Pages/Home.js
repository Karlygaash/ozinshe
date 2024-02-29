import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate=useNavigate()

    useEffect(() => {
		const token_ = localStorage.getItem("ozinshe_token")

		if (token_) {
			navigate("/projects")
		}else{
            navigate("/login")
        }
	}, [navigate])

    return(<div>

    </div>)
};

export default Home;