import React from 'react'
import ReactPlayer from 'react-player/youtube';
const Youtube = ({youtubeLink}) => {
    return(    
        <ReactPlayer url={youtubeLink} className='youtube' width="100%" height="400px"/>
    );
};

export default Youtube;