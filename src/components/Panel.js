
const Panel = ({ title, buttons, content }) => {
    return (
        <div className="border rounded-lg drop-shadow-lg mx-2">
            <div className="flex flex-row justify-between items-center px-4 py-4 border-b">
                <h2 className="font-bold text-xl">{title}</h2>
                {buttons}
            </div>
            <div className="px-4 py-4">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    {content}
                </div>
            </div>
        </div>
    )
}

export default Panel;