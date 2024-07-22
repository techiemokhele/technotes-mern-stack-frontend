const LoadingContentComponent = () => {
    return (
        <div className="flex flex-col justify-center items-center py-5 gap-6 bg-gray-800 rounded">
            <img
                src="https://icons8.com/preloaders/dist/media/hero-preloaders.svg"
                alt="load-content"
                className="w-1/2 h-1/2 object-contain"
            />
            <h2 className="text-md text-orange-500">Please wait while load the data...</h2>
        </div>
    )
}

export default LoadingContentComponent
