import { useParams } from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';
import RightIcon from '../assets/icons/rightIcon.svg'
import Button from '../assets/icons/Button.svg'
import '../assets/styles/AddProjectStep2.css'
import DeleteIcon from '../assets/icons/deleteIcon.svg'
import { useEffect, useState } from "react";
import YouTubeToAdd from "../components/YouTubeToAdd";
import axios from 'axios'
import { toast } from "react-toastify"
import { getProjectByIdService } from "../service";


const ProjectAddStep2 = () => {
    const {idMovie}= useParams()
    const [movie, setMovie] = useState({})
    const [isTrue, setIsTrue] = useState() 
    const [movieType, setMovieType] = useState("")
    const navigate=useNavigate()
    const [youTubeLink, setYouTubeLink] = useState("")

    const [season, setSeason] = useState([{
        "seasonId" : 1,
        "series" : [
            {"number" : 1,
             "link": ""
            }
        ]
    }])

    const handleAddSeason = (count) => {
        count++;
        season.push({"seasonId": count, "series" : [{"number" : 1, "link" : ""}]})
        setIsTrue(true)
    }

    const handleAddSeries = (seasonId, seriesId) =>{
        seriesId++
        season[seasonId-1].series.push({"number": seriesId, "link" : ""})
        setIsTrue(true)
    }

    const handleRemoveSeries = (seasonId, seriesId) => {
        if(seriesId === 1){
            season.pop()
        }else{
            season[seasonId-1].series.pop()
        }
        setIsTrue(true)
    }

    const updateState = (index, i) => (e)=> {
        season[index].series[i].link=e.target.value;
        setIsTrue(true)
    }

    const handleCreateSeason = () => {
        const token = localStorage.getItem("ozinshe_token")
        movie.video = {
            "link" : youTubeLink
        }

        {movieType === "MOVIE" ? 
        
        axios 
            .put(`http://api.ozinshe.com/core/V1/movies/${idMovie}`, movie, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(result => {
                console.log(result.data)
                navigate(`/projects/add/${idMovie}/step3`)
                toast.success("Успешно");
            })
            .catch(error => {
                console.log(error)
                toast.error("Что-то пошло не так");
            })
        :
        season.map(element => {
            axios
                .post("http://api.ozinshe.com/core/V1/seasons", {
                    "movieId" : idMovie,
                    "number" : element.seasonId,
                    "videos" : element.series
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(result => {
                    console.log(result.data)
                    navigate(`/projects/add/${idMovie}/step3`)
                    toast.success("Успешно");
                })
                .catch(error => {
                    console.log(error)
                    toast.error("Что-то пошло не так");
                })
        })
        }
    }

    const getProjectById = () => {
        getProjectByIdService(idMovie).then(result =>{
            setMovieType(result.movieType)
            setMovie(result)
        })
    }

    useEffect(()=>{
        setIsTrue(false)
        getProjectById()
    }, [season, isTrue])
    
    return(
        <div className="section">
            <div className="section__navigation">
                <Link to="/projects"><p className="last-page">Проекты</p></Link>
                <img src={RightIcon} alt=""/>
                <p className="current-page">Добавить проект</p>
            </div>
            <div className='add__container'>
                <div className='add__container-title'>
                    <Link to="/projects"><img src={Button} alt=""/></Link>
                    <h2>Видео</h2>
                </div>
                <div className="add__container-step2">
                {movieType === "MOVIE" ?
                    <div> 
                        <div className='input-box'>
                            <input 
                                className='input' 
                                type="text" required
                                value={youTubeLink}
                                onChange={(e) => setYouTubeLink(e.target.value)}
                                // onChange={(e)=>setYouTubeLink(e.target.value)}
                            />
                            <div className='labelline'>Ссылка на фильм / Youtube Video ID</div>
                        </div>                    
                        <YouTubeToAdd youtubeLink={"https://www.youtube.com/watch?v=" + youTubeLink} link={youTubeLink}/>
                    </div>
                
                    : 
                    <div>
                    <button onClick={()=>handleAddSeason(season.length)} className="step2__addSeason">Добавить сезон ({season.length})</button>
                    {season.map((e, index)=>(
                    <div key={e.seasonId} className="step2__series">
                        <h2>{e.seasonId} сезон</h2>
                        {e.series.map((j, i)=>(
                            <div key={j.seriesId} className="step2">
                                <div className="step2__input">
                                    <div className='input-box'>
                                        <input 
                                            className='input' 
                                            type="text" required
                                            value={j.link}
                                            onChange={updateState(index, i)}
                                        />
                                        <div className='labelline'>{j.number} серия / Youtube Video Id</div>
                                    </div>
                                    <img onClick={()=>handleRemoveSeries(e.seasonId, e.series.length)} src={DeleteIcon} alt=""/>
                                </div>
                                <YouTubeToAdd youtubeLink={"https://www.youtube.com/watch?v=" + j.link} link={j.link}/>
                            </div>    
                        ))}
                        <p onClick={()=>handleAddSeries(e.seasonId, e.series.length)}>Добавить серию</p>
                    </div>
                    ))}
                    </div>
                    }

                    <div className="footer__buttons">
                        <Link to="/projects"><button className='cancel__button'>Назад</button></Link>
                        <div className='add__container-buttons'>
                            <button onClick={()=>handleCreateSeason()} className='further__button'>Далее</button>
                            <Link to="/projects"><button className='cancel__button'>Отмена</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectAddStep2;