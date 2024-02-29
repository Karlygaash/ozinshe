import { Link, useParams } from "react-router-dom";
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
import { confirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/md-light-indigo/theme.css'

const ProjectDetail = () => {
    const {projectId} = useParams()
    const [nameProject, setNameProject] = useState("")
    const [watchCount, setWatchCount] = useState()
    const [video, setVideo] =useState([])
    const [seasonNumber, setSeasonNumber] = useState()
    const [youtubeLink, setYoutubeLink]= useState("https://www.youtube.com/watch?v=XfL5HLtz8b8")
    const [activeSerial, setActiveSerial] = useState(1)
    const [description, setDescription] = useState("")
    const [producer, setProducer] = useState("")
    const [director, setDirector] = useState("")
    const [screenshots, setScreenshots] = useState([])
    const [year, setYear] = useState()
    const [categories, setCategories] = useState([])
    const [timing, setTiming] = useState()
    const [seriesCount, setSeriesCount] = useState()
    const [image, setImage] = useState()
    const [createdDate, setCreatedDate] = useState()
    const [lastModifiedDate, setLastModifiedDate] = useState()
 
    const getProjectById = () => {
        const token = localStorage.getItem("ozinshe_token")
        axios
            .get(`http://api.ozinshe.com/core/V1/movies/${projectId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                setNameProject(result.data.name)
                setWatchCount(result.data.watchCount)
                setDescription(result.data.description)
                setProducer(result.data.producer)
                setDirector(result.data.director)
                setScreenshots(result.data.screenshots)
                setYear(result.data.year)
                setCategories(result.data.categories)
                setTiming(result.data.timing)
                setSeriesCount(result.data.seriesCount)
                setImage(result.data.poster.link)
                setCreatedDate(result.data.createdDate)
                setLastModifiedDate(result.data.lastModifiedDate)
            })
            .catch(error => {
                console.log(error)
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
                setVideo(result.data[0].videos)
                setSeasonNumber(result.data[0].number)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const deleteProject = () => {
        confirmDialog({
        message: "Вы действительно хотите удалить проект?",
        header: `Удалить "${nameProject}"?`,
        rejectLabel: "Отмена",
        acceptLabel: "Да, удалить"
        // reject: () => rejectFunc()
        })
    }

    const handleClickedSerial = (link, number) => {
        setYoutubeLink("https://www.youtube.com/watch?v="+link)
        setActiveSerial(number)
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
                            <RiDeleteBinLine onClick={e=> deleteProject()} className="project__header-delete-icon"/>
                        </div>
                    </div>
                </div>

                <div>
                    <Youtube youtubeLink={youtubeLink}/>
                    <button className="project__season-number">{seasonNumber} сезон</button>
                    <div className="project__serial-numbers">
                        {video.map(element => (
                            <div key={element.id} className={element.number === activeSerial ? "project__serial-number-active" : "project__serial-number"}>
                                <p onClick={e => handleClickedSerial(element.link, element.number)}>{element.number} серия</p>
                            </div>
                        ))}
                    </div>
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
                        {screenshots.map(element =>(
                            <img src={element.link}/>
                        ))}
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
                        {categories.map(element =>(
                            <p>{element.name}</p>
                        ))}
                    </div>
                </div>
                <div className="description__flex">
                    <img src={BoardIcon} alt=""/>
                    <p>{seriesCount} серии, {timing} мин</p>
                </div>

                <img src={image} alt="" className="description__image"/>
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
                <ConfirmDialog/>
            </div>
        </div>
    </div>
    );
};

export default ProjectDetail;