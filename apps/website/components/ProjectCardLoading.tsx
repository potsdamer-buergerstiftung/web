const ProjectCard: React.FC = (props) => {
    return (
        <div className="relative block h-96 w-full cursor-pointer overflow-hidden rounded-lg bg-slate-200 animate-pulse">
            <div className="flex-column absolute top-0 bottom-0 left-0 right-0 flex items-end p-8">
                <div className="relative w-full">
                    <div className="w-1/2 bg-slate-300 h-8 rounded-sm" />
                    <div className="relative mt-2 w-full overflow-hidden">
                    <div className="w-1/3 bg-slate-300 h-6 rounded-sm" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
