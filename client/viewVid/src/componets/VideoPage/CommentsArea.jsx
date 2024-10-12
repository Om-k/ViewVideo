import { useEffect, useState } from "react";
import getData from "../../hooks/getData";
import apiClient from "../../services/apiClient";
import "./VideoPage.css"
import { IoMdSend } from "react-icons/io";
import postRequest from "../../services/postDataRequest";

export default function ({videoId}) {
    const [comments, commentsLoading, commentsError,setRender] = getData('/comments/' + videoId.slice(1))
    const [commentInpVal, setCommentInpVal] = useState("")

    const handleSubmit = async () => {
        const path = ("/comments/" + videoId.slice(1)).toString()

        await postRequest(path,{comment: commentInpVal})
        setRender(prevVal => !prevVal)

        setCommentInpVal("")
    }

    return <div className="comments-area">
        <h2>Comments</h2>
        <div className="add-comment-out">
            <input className="add-comment-in" placeholder="Add Comment" value={commentInpVal}
                onChange={(e) => { setCommentInpVal(e.target.value) }} />
            <IoMdSend size={25} className="send-button-icon" onClick={handleSubmit} />
        </div>
        <div className="comments-data">
            {commentsError && <div className="comments-error"></div>}
            {commentsLoading && <div className="comments-loading"></div>}
            {comments &&
                <ul className="comments">
                    {comments.map((comment, index) =>
                        <li key={index} className="comment-single">
                            <div className="comment-card">
                                <img className="comment-owner-image" src={comment.owner.avatar}></img>
                                <div className="comment-ownername-data">
                                    <p className="comment-ownername">{comment.owner.username}</p>
                                    <p>{comment.content}</p>
                                </div>
                            </div>
                        </li>)}
                </ul>
            }
        </div>
    </div>

}