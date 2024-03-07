import Register from "../features/auth/Register";
import { Link, NavLink, useNavigate } from 'react-router-dom';


const HomePage = () => {  
    const navigate = useNavigate()
    return(
        <>
       {navigate("/login")}
       </>
    )
}
export default HomePage;
