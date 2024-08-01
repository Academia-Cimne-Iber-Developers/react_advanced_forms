import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

function Profile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [errorUpdating, setErrorUpdating] = useState(false);

    const { token } = useAuth("state");

    const doFetch = async () => {
        setLoadingUpdate(true);
        fetch(
            `${import.meta.env.VITE_API_BASE_URL}users/profiles/${
                userData.user__id
            }/`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({
                    first_name: "Carlos Humberto",
                    last_name: "Santana",
                }),
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudo actualizar el usuario");
                }
                return response.json();
            })
            .then((data) => {
                if (data) {
                    setUserData(data);
                }
            })
            .catch(() => {
                setErrorUpdating(true);
            })
            .finally(() => {
                setLoadingUpdate(false);
            });
    };

    useEffect(() => {
        fetch(
            `${import.meta.env.VITE_API_BASE_URL}users/profiles/profile_data/`,
            {
                method: "GET",
                headers: {
                    Authorization: `Token ${token}`,
                },
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                return response.json();
            })
            .then((data) => {
                setUserData(data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    function handleEditMode() {
        setEditMode(!editMode);
    }

    function handleSubmit(event) {
        event.preventDefault();
        doFetch();
    }

    if (loading) return <p>Cargando perfil...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="card">
            {userData ? (
                <>
                    <div className="card-content">
                        <div className="media">
                            <div className="media-left">
                                <figure className="image is-48x48">
                                    <img
                                        src={
                                            userData.image ||
                                            "https://bulma.io/assets/images/placeholders/96x96.png"
                                        }
                                        alt="Profile image"
                                        style={{ borderRadius: "50%" }}
                                    />
                                </figure>
                            </div>
                            <div className="media-content">
                                <p className="title is-4 pb-2">
                                    {userData.first_name} {userData.last_name}
                                </p>
                                <div
                                    className="subtitle is-6"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <img
                                        src={`${
                                            import.meta.env.VITE_API_BASE_URL
                                        }${userData.state.icon}`}
                                        alt="State icon"
                                        style={{
                                            height: "20px",
                                            marginRight: "5px",
                                            borderRadius: "50%",
                                        }}
                                    />
                                    {userData.state.name}
                                </div>
                            </div>
                            <button
                                className="button is-primary"
                                onClick={handleEditMode}
                            >
                                {!editMode ? "Editar" : "Salir"}
                            </button>
                        </div>

                        <form className="content" onSubmit={handleSubmit}>
                            <div className="field">
                                <label className="label">Email:</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        id="email"
                                        name="email"
                                        value={userData.email}
                                        disabled={!editMode}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">
                                    Fecha de Nacimiento:
                                </label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        id="dob"
                                        name="dob"
                                        value={userData.dob}
                                        disabled={!editMode}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Biografía:</label>
                                <div className="control">
                                    <textarea
                                        className="textarea"
                                        id="bio"
                                        name="bio"
                                        value={userData.bio || "No disponible"}
                                        disabled={!editMode}
                                    />
                                </div>
                            </div>
                            {editMode ? (
                                <div className="field">
                                    <button
                                        className="button is-primary is-fullwidth"
                                        type="submit"
                                    >
                                        Enviar
                                    </button>
                                </div>
                            ) : null}
                        </form>
                    </div>
                </>
            ) : (
                <p className="subtitle">No se encontraron datos del usuario.</p>
            )}
        </div>
    );
}

export default Profile;
