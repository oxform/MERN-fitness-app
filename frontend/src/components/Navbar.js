import { Link } from 'react-router-dom'
 
const NavBar = () =>{
return (

    <header>
        <div className="navBar-container">
            <Link to= "/">
            <h1>Roo Fitness</h1>
            </Link>
        </div>
    </header>

)
}

export default NavBar;