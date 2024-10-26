import "./UploadingPage.css"
import Spinner from "../SpinnerData/Spinner"

export default function () {

    return (
        <div>
            <div className="blurr-area">
                <Spinner loaderWidth={0} /> 
                <h2>Uploading</h2>
            </div>
        </div>
    )
}