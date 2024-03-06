import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import { useEffect, useState } from "react";
import '../assets/styles/ProjectDetail.css'
import RightIcon from '../assets/icons/rightIcon.svg'
import { MdOutlineRemoveRedEye } from "react-icons/md";
import "../assets/styles/ConfirmModal.css"
import { FaRegStar } from "react-icons/fa";
import { PiUploadSimpleBold } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
import Youtube from "../components/Youtube";
import IclockIcon from '../assets/icons/iclockIcon.svg'
import BoardIcon from '../assets/icons/boardIcon.svg'
import klavishIcon from '../assets/icons/klaviwIcon.svg';
import Time from 'react-time-format';
import { ConfirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/md-light-indigo/theme.css'
import { getProjectByIdService, getVideoService } from "../service";
import LogoDefault from '../assets/icons/logoDefault.svg'
import { toast } from "react-toastify"

const ProjectDetail = () => {
    const {projectId} = useParams()
    const [nameProject, setNameProject] = useState("")
    const [watchCount, setWatchCount] = useState()
    const [video, setVideo] =useState([])
    const [seasonNumber, setSeasonNumber] = useState(1)
    const [activeSerial, setActiveSerial] = useState(1)
    const [activeSeason, setActiveSeason] = useState(1)
    const [description, setDescription] = useState("")
    const [producer, setProducer] = useState("")
    const [director, setDirector] = useState("")
    const [screenshots, setScreenshots] = useState([])
    const [year, setYear] = useState()
    const [categories, setCategories] = useState([])
    const [timing, setTiming] = useState()
    const [seriesCount, setSeriesCount] = useState()
    const [image, setImage] = useState("")
    const [createdDate, setCreatedDate] = useState()
    const [lastModifiedDate, setLastModifiedDate] = useState()
    const [youtubeLink, setYoutubeLink]= useState()
    const [visibleDelete, setVisibleDelete] = useState()
    const [seasons, setSeasons] = useState([])
    const navigate=useNavigate()
 
    const getProjectById = () => {
        getProjectByIdService(projectId).then(result =>{
            if(result.seriesCount === 0 && result.video !=  null){
                setYoutubeLink("https://www.youtube.com/watch?v=" + result.video.link)
            }
            setNameProject(result.name)
            setWatchCount(result.watchCount)
            setDescription(result.description)
            setProducer(result.producer)
            setDirector(result.director)
            setScreenshots(result.screenshots)
            setYear(result.year)
            setCategories(result.categories)
            setTiming(result.timing)
            setSeriesCount(result.seriesCount)
            if(result.poster !=null){
                setImage(result.poster.link)
            }
            setCreatedDate(result.createdDate)
            setLastModifiedDate(result.lastModifiedDate)
        })
    }

    const deleteProject = () => {
        const token = localStorage.getItem("ozinshe_token")

        axios 
        .delete(`http://api.ozinshe.com/core/V1/movies/${projectId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => {
            console.log(result.data) 
            toast.success("Проект успешно удалился");
            navigate('/projects')
        })
        .catch(error => {
            console.log(error)
            toast.error("Что-то пошло не так");
        })
    }

    const getVideo = () => {
        const token = localStorage.getItem("ozinshe_token")
        axios
            .get(`http://api.ozinshe.com/core/V1/seasons/${projectId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                // console.log(result.data)
                if(result.data[0].number > 0){
                    setSeasons(result.data)
                    setVideo(result.data[0].videos)
                    setSeasonNumber(result.data[0].number)
                    setYoutubeLink("https://www.youtube.com/watch?v=" + result.data[0].videos[0].link)
                }
                console.log(result.data)
                
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleClickedSerial = (link, number) => {
        setYoutubeLink("https://www.youtube.com/watch?v="+link)
        setActiveSerial(number)
    }

    const handleClickedSeason = (number) => {

    }

    useEffect(()=>{
        getProjectById()
        getVideo()
    }, [])

    return(
    <div className="projectDetail">
        <div className="section">
            <div className="section__navigation">
                <Link to="/projects"><p className="last-page">Проекты</p></Link>
                <img src={RightIcon} alt=""/>
                <p className="current-page">{nameProject}</p>
            </div>
            <div className="section__project">
                <div className="project__header">
                    <div className="project__header-title">
                        <h3>{nameProject}</h3>
                        <div className="header-title-views">
                            <MdOutlineRemoveRedEye className="header__title-views-icon"/>
                            <p>{watchCount}</p>
                            <FaRegStar className="header__title-views-icon"/>
                            <p>0</p>
                            <PiUploadSimpleBold className="header__title-views-icon"/>
                            <p>0</p>
                        </div>
                    </div>
                    <div className="project__header-buttons">
                        <Link to={`/projects/${projectId}/edit`}><button>Редактировать</button></Link>
                        <div className="project__header-delete">
                            <RiDeleteBinLine onClick={()=>setVisibleDelete(true)} className="project__header-delete-icon"/>
                        </div>
                    </div>
                </div>

                <div>
                    <Youtube youtubeLink={youtubeLink}/>
                    {/* {seriesCount === 0 ? "" : <button className="project__season-number">{seasonNumber} сезон</button> }
                    <div className="project__serial-numbers">
                    {seriesCount === 0 ? "" : 
                        video.map(element => (
                            <div key={element.id} className={element.number === activeSerial ? "project__serial-number-active" : "project__serial-number"}>
                                <p onClick={e => handleClickedSerial(element.link, element.number)}>{element.number} серия</p>
                            </div>
                        ))
                        }
                    </div> */}
                    {seriesCount === 0 ? "" :
                        seasons.map(element => (
                            <button onClick={e => setActiveSeason(element.number)}
                                className={element.number === activeSeason ? "project__season-number" : "project__season-number-passive"}>
                                {element.number} сезон
                            </button>
                        ))
                    }

                    {seriesCount === 0 ? "" :
                        seasons.map(element => (
                            <div className={element.number === activeSeason ? "project__serial-numbers" : "project__serial-numbers-passive"}>
                                {element.videos.map(index => (
                                    <div key={index.id} className={index.number === activeSerial ? "project__serial-number-active" : "project__serial-number"}>
                                        <p onClick={e => handleClickedSerial(index.link, index.number)}>{index.number} серия</p>
                                    </div>                                        
                                ))}
                            </div>                        
                        ))
                    }   
                </div>

                <div className="project__description">
                    <h2>Описание</h2>
                    <p className="project__description-p">{description}</p>
                    <div className="project__authors"><span>Режиссер:</span><p>{director}</p></div>
                    <div className="project__authors"><span>Продюсер:</span><p>{producer}</p></div>
                    
                </div>
                <div className="project__screenshots">
                    <h2>Скриншоты</h2>
                    <div className="screenshoots__list">
                        {screenshots === null ? "" :
                        screenshots.map(element =>(
                            <img src={element.link}/>
                        ))
                        }
                    </div>
                </div>
            </div>
        </div>
        <div className="section__description">
            <div className="section__description-project">
                <div className="description__flex">
                    <img src={IclockIcon} alt=""/>
                    <p>{year} год</p>
                </div>
                <div className="description__flex serial-type">
                    <img src={klavishIcon} alt=""/>
                    <div>
                        {categories === null ? "" :
                        categories.map(element =>(
                            <p>{element.name}</p>
                        ))
                        }
                    </div>
                </div>
                <div className="description__flex">
                    <img src={BoardIcon} alt=""/>
                    <p>{seriesCount} серии, {timing} мин</p>
                </div>
                {image === "" ? <img src={LogoDefault} alt=""/> :
                <img src={image} alt="" className="description__image"/>
                }
            </div>

            <div className="section__description-time">
                <div className="description__time">
                    Дата добавления:
                    <p><Time value={createdDate} format="DD.MM.YYYY, в HH:mm" /></p>
                </div>
                <div className="description__time">
                    Дата обновления: 
                    <p><Time value={lastModifiedDate} format="DD.MM.YYYY, в HH:mm" /></p>
                </div>
                <ConfirmDialog visible={visibleDelete} 
                    onHide={() => setVisibleDelete(false)} 
                    message="Вы действительно хотите удалить проект?"
                    header="Удалить проект?" 
                    reject={()=>setVisibleDelete(false)} 
                    accept={() => deleteProject()}
                    acceptLabel="Да, удалить"
                    rejectLabel="Отмена"
                />
            </div>
        </div>
    </div>
    );
};

export default ProjectDetail;