import useFetch from "../../hooks/useFetch";
import DeleteSongModal from "./DeleteSongModal";
import { useState } from "react";

function SongCard({ song, user_ID }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, isLoading, isError, doFetch } = useFetch();

    return (
        <div className={`card has-background-dark columns my-1 mx-2`}>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className={`title is-4 has-text-white`}>
                            {song.title}
                        </p>
                    </div>
                </div>
                <div className="content">
                    <audio controls>
                        <source src={song.song_file} type="audio/mpeg" />
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                </div>
            </div>
            {song.owner == user_ID ? (
                <div className="column" onClick={() => setIsModalOpen(true)}>
                    <button className="button is-danger">Eliminar</button>
                </div>
            ) : null}
            {isModalOpen ? (
                <DeleteSongModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    song_id={song.id}
                    onDelete={{ data, isLoading, isError, doFetch }}
                />
            ) : null}
        </div>
    );
}

export default SongCard;
