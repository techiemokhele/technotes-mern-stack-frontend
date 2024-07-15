import WelcomeBannerComponent from './section/WelcomeBannerComponent'

const PublicComponent = () => {
    function renderScreenContentList() {
        return (
            <>
                <WelcomeBannerComponent />
            </>
        )
    }
    return renderScreenContentList()
}
export default PublicComponent