import { openImage, totalImage, userImage } from "../../data/imagesData";

const CardCounterComponent = ({ type, count, description }) => {
    const cardType = type;

    const handleCardType = () => {
        switch (cardType) {
            case 'total':
                return 'Total';
            case 'statusOpen':
                return 'Opened';
            case 'statusComplete':
                return 'Completed';
            case 'employeeRole':
                return 'Employees';
            case 'managerRole':
                return 'Managers';
            default:
                return 'Total';
        }
    }

    const handleCardCount = () => {
        switch (cardType) {
            case 'total':
                return count;
            case 'statusOpen':
                return count;
            case 'statusComplete':
                return count;
            case 'employeeRole':
                return count;
            case 'managerRole':
                return count;
            default:
                return count;
        }
    }

    const handleCardImage = () => {
        switch (cardType) {
            case 'total':
                return totalImage;
            case 'statusOpen':
                return openImage;
            case 'statusComplete':
                return openImage;
            case 'employeeRole':
                return userImage;
            case 'managerRole':
                return openImage;
            case 'shareholderRole':
                return userImage;
            default:
                return openImage;
        }
    }

    const welcomeStyle = {
        backgroundImage: `url(${handleCardImage()})`,
    };

    return (
        <div className="greeting-image flex flex-col w-full rounded-md py-2 px-6 gap-3 bg-gray-800" style={welcomeStyle}>
            <p className="text-white font-bold text-3xl">{handleCardCount()}</p>
            <div className="flex flex-col">
                <p className="text-white font-bold">{handleCardType()}</p>
                <p className="text-white text-[10px] font-normal">{description}</p>
            </div>
        </div>
    )
}

export default CardCounterComponent