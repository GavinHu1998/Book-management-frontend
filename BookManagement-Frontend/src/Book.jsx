import { useNavigate } from "react-router-dom";
export function Book({ title, author, description, publicationDate, coverImage, id }) {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/books/${id}`);
    };

    const token = localStorage.getItem("authToken");

    return (
        <div className="h-[250px] p-4 space-x-4 flex bg-white rounded-2xl shadow-lg">
            <img src={coverImage} alt={title} className="h-full object-cover aspect-[2/3] rounded-lg" />
            <div className="h-full w-full flex flex-col justify-between">
                <div className="h-auto w-full">
                    <h1 className="text-xl font-semibold">{title}</h1>
                    <div className="flex justify-start items-center">
                        <h2 className="text-xs text-slate-800">{author}</h2>

                        <div className="text-xs text-slate-800">&nbsp;|&nbsp;</div>
                        <h2 className="text-xs text-slate-800">{publicationDate}</h2>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">{description}</p>
                </div>
                <div className="w-full flex justify-end">
                    <button
                        className="bg-blue-500 px-3 py-2 rounded-md text-white text-sm"
                        onClick={handleEdit} >
                        {token ? "Edit" : "Detail"}
                    </button>
                </div>
            </div>
        </div>
    )
}