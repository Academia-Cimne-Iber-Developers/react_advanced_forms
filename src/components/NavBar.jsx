import appLogo from "../assets/infosphere.png";
import NavMenu from "./NavMenu";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function NavBar({ appName }) {
    const { isAuthenticated } = useAuth("state");
    const { logout } = useAuth("actions");
    const navigate = useNavigate();

    return (
        <header>
            <nav
                className={"navbar has-background-dark"}
                role="navigation"
                aria-label="main navigation"
            >
                <div className="navbar-brand">
                    <div className="columns is-vcentered">
                        <Link className="navbar-item column" to="/">
                            <img
                                src={appLogo}
                                alt="App Logo"
                                className="image is-64x64"
                            />
                        </Link>
                        <p className="column">{appName}</p>
                    </div>
                </div>
                <NavMenu
                    items={[
                        { text: "Home", url: "/" },
                        { text: "Songs", url: "/songs" },
                        { text: "Profile", url: "/profile" },
                    ]}
                />
                <button
                    className={`button is-small is-primary`}
                    onClick={
                        isAuthenticated
                            ? () => {
                                  logout();
                              }
                            : () => {
                                  navigate("/login");
                              }
                    }
                >
                    {isAuthenticated ? "Cerrar sesión" : "Iniciar Sesión"}
                </button>
            </nav>
        </header>
    );
}

export default NavBar;
