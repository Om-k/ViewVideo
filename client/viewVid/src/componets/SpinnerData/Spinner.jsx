export default function ({loaderWidth = 100}) {
    return <div className="loader-area" style={{width: loaderWidth==100 ? '100%' : '5em'}}>
        <span className="loader"></span>
    </div>
}