import PulseLoader from 'react-spinners/PulseLoader'
import { loadingImage, noAccessImage } from '../../data/imagesData'

const LoadingContentComponent = ({ hasNoAccess }) => {
    return (
        <div className="flex flex-col justify-center items-center py-5 gap-6 bg-gray-800 rounded">
            <img
                src={hasNoAccess ? noAccessImage : loadingImage}
                alt="load-content"
                className="w-1/2 h-[400px] object-contain"
            />

            {!hasNoAccess && <PulseLoader color="#fff" />}

            <h2 className="text-md text-orange-500">
                {hasNoAccess ? "You have no access" : "Please wait while load the data..."}
            </h2>
        </div>
    )
}

export default LoadingContentComponent
