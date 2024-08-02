import { openImage, totalImage, userImage } from '../../data/imagesData'

const CardCounterComponent = ({ type, count, description }) => {
    const handleCardType = () => {
        switch (type) {
            case 'total':
                return 'Total'
            case 'employeeRole':
                return 'Employees'
            case 'managerRole':
                return 'Managers'
            case 'adminRole':
                return 'Admins'
            default:
                return 'Total'
        }
    }

    const handleCardCount = () => count

    const handleCardImage = () => {
        switch (type) {
            case 'total':
                return totalImage
            case 'employeeRole':
                return userImage
            case 'managerRole':
                return openImage
            case 'adminRole':
                return userImage
            default:
                return openImage
        }
    }

    const welcomeStyle = {
        backgroundImage: `url(${handleCardImage()})`,
    }

    return (
        <div className='greeting-image flex flex-col w-full rounded-md py-2 px-6 gap-3 bg-gray-800' style={welcomeStyle}>
            <p className='text-white font-bold text-3xl'>{handleCardCount()}</p>
            <div className='flex flex-col'>
                <p className='text-white font-bold'>{handleCardType()}</p>
                <p className='text-white text-[10px] font-normal'>{description}</p>
            </div>
        </div>
    )
}

export default CardCounterComponent
