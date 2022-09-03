const Post = ({nom, prenom, date_publication, post_text, nb_like, nb_comment}) => {
    return (
        <div className="post">
            <div className="post-header">
                <img src="https://picsum.photos/80" />
                <span>{nom + prenom}</span>
                <span>Le {date_publication}</span>
                <button>Settings</button>
            </div>

            <div className="post-text">
                {post_text}
            </div>

            <hr/>

            <div className="post-footer">
                <button>{nb_like}</button>
                <button>{nb_comment}</button>
            </div>
        </div>  
    );
}
 
export default Post;