import React from 'react'
import ReactPlayer from 'react-player/youtube';
const YouTubeToAdd = ({youtubeLink, link}) => {
    return(    
        <ReactPlayer url={youtubeLink} className={link=== "" ? "youTube-passive" : "youTube"} width="30%" height="150px"/>
    );
};

export default YouTubeToAdd;