import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import RightIcon from '../assets/icons/rightIcon.svg'
import '../assets/styles/ProjectAdd.css'
import Button from '../assets/icons/Button.svg'
import { useEffect, useState } from 'react';
import axios from 'axios'
import {fetchJenres, getProjectByIdService, fetchCategories,
    getAgeCategoryService} from '../service'
import { TabView, TabPanel } from 'primereact/tabview';
import { MultiSelect } from 'primereact/multiselect';
import YouTubeToAdd from "../components/YouTubeToAdd";
import DeleteIcon from '../assets/icons/deleteIcon.svg'
import UploadIcon from '../assets/icons/UploadIcon.svg'
import { toast } from "react-toastify";

const ProjectEdit = () => {
    const {projectId} = useParams()
    const [activeIndex, setActiveIndex] = useState(0);
    const [jenres, setJenres] = useState([])
    const [categories, setCategories] = useState([])
    const [categoryAges, setCategoryAges] = useState([])
    
    const [description, setDescription] = useState("")
    const [producer, setProducer] = useState("")
    const [director, setDirector] = useState("")
    const [nameProject, setNameProject] = useState("")
    const [year, setYear] = useState()
    const [category, setCategory] = useState([])
    const [timing, setTiming] = useState()
    const [jenr, setJenr] = useState([])
    const [movieType, setMovieType] = useState("")
    const [categoryAge, setCategoryAge] = useState([])
    const [keyWords, setKeyWords] = useState("")
    const [poster, setPoster] = useState("")
    const [screenshots, setScreenshots] = useState([])
    const [drag, setDrag] = useState(false)
    const [imagePoster, setImagePoster] = useState()

    const [youTubeLink, setYouTubeLink] = useState("")
    const [screenshotsNew, setScreenshotsNew] = useState([])

    const [isTrue, setIsTrue] = useState()
    const [season, setSeason]=useState([])
    const [movie, setMovie] = useState({})
    const navigate=useNavigate();
    const [fileIdPoster, setFileIdPoster] = useState(0)
    const [posterId, setPosterId] = useState()
    const [screenshotsDelete, setScreenshotsDelete] = useState([])
    const [uploadFilesMulti, setUploadFilesMulti] = useState([])

    const handleOnChangePoster = (event) => {
        event.preventDefault();
        if (event.target.files && event.target.files.length) {
            setImagePoster(event.target.files[0])
            const file = URL.createObjectURL(event.target.files[0]);
            setPoster(file);
        }
        setDrag(false)
    };

    const handleDeleteImagePoster = () => {
        setPoster()
        setDrag(true)
    }

    const handleOnChangeScreenshots = (event) =>{
        if (event.target.files && event.target.files.length) {
            const file = event.target.files[0];
            screenshotsNew.push(file);
        }
        setIsTrue(true)
    }

    const handleDeleteScreenshotNew = (index) => {   
        screenshotsNew.splice(index, 1)
        setIsTrue(true)
    }

    const getJenres = () => {
        fetchJenres().then(result => setJenres(result))
    }

    const getProjectById = () => {
        getProjectByIdService(projectId).then(result => {
            setMovie(result)
            setCategory(result.categories)
            setCategoryAge(result.categoryAges)
            setDescription(result.description)
            setDirector(result.director)
            setJenr(result.genres)
            setKeyWords(result.keyWords)
            setNameProject(result.name)
            setProducer(result.producer)
            setMovieType(result.movieType)
            setTiming(result.timing)
            setYear(result.year) 
            if(result.poster !=null){  
                setPoster(result.poster.link) 
                setPosterId(result.poster.id)
            }
            setScreenshots(result.screenshots)
            if(result.video != null){
                setYouTubeLink(result.video.link)
            }
        })
    }

    const getCategories = () => {
        fetchCategories().then(result => setCategories(result))
    }

    const getCategorуAges = () => {
        getAgeCategoryService().then(result=>setCategoryAges(result))
    }

    const getSeasonVideo = () => {
        const token = localStorage.getItem("ozinshe_token")
        axios
            .get(`http://api.ozinshe.com/core/V1/seasons/${projectId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                setSeason(result.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleUpdateMovieBase =() => {
        const token = localStorage.getItem("ozinshe_token")
        axios
            .put(`http://api.ozinshe.com/core/V1/movies/${projectId}`,{
                "name" : nameProject,
                director,
                producer,
                timing,
                year,
                movieType,
                description,
                keyWords,
                "categories" : category,
                "genres" : jenr,
                "categoryAges" : categoryAge
            }, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                console.log(result.data)
                toast.success("Успешно изменился")
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleUpdateVideo = () => {
        const token = localStorage.getItem("ozinshe_token")
        movie.video = {
            "link" : youTubeLink
        }

        {movieType === "MOVIE" ? 
        axios 
        .put(`http://api.ozinshe.com/core/V1/movies/${projectId}`, movie, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => {
            console.log(result.data)
            toast.success("Успешно обновился");
        })
        .catch(error => {
            console.log(error)
            toast.error("Что-то пошло не так");
        })
        : 
        season.map(element=>{
        axios
            .delete(`http://api.ozinshe.com/core/V1/seasons/${element.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(result => {
                console.log(result.data)
                
            })
            .catch(error => {
                console.log(error)
                toast.error("Что-то пошло не так");
            })
        })
        season.map(element => {
            axios
                .post(`http://api.ozinshe.com/core/V1/seasons`, element, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(result => {
                    console.log(result.data)
                    toast.success("Успешно изменился")
                    navigate(`/projects/${projectId}`)
                })
                .catch(error => {
                    console.log(error)
                    toast.error("Что-то пошло не так");
                })
        })
        }
    }

    const handleUploadFiles = () => {
        const token = localStorage.getItem("ozinshe_token")

        if(typeof imagePoster === 'object'){
            const formDatePoster = new FormData()
            formDatePoster.append("file", imagePoster)
            console.log(imagePoster)

            axios 
            .post(`http://api.ozinshe.com/core/V1/files/upload`, formDatePoster, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(result => {
                setFileIdPoster(result.data.id)
            })
            .catch(error => {
                console.log(error)
                toast.error("Что-то пошло не так");
            })
        }

        if(screenshotsNew.length>0){
            const formDateArray = new FormData()
            {screenshotsNew.map(element => {
                formDateArray.append('files', element)
            })}

            axios 
            .post(`http://api.ozinshe.com/core/V1/files/upload/multi`, formDateArray, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(result => {
                setUploadFilesMulti(result.data)
            })
            .catch(error => {
                console.log(error)
                toast.error("Что-то пошло не так");
            })
        }
        
        if(screenshotsDelete.length > 0){
            {screenshotsDelete.map(element=>{
                axios 
                .delete(`http://api.ozinshe.com/core/V1/screenshots/${element.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(result => {
                    console.log(result.data)
                    toast.success("Успешно");
                })
                .catch(error => {
                    console.log(error)
                    toast.error("Что-то пошло не так");
                })
            })}
        }
    }

    const handleUpdatePoster = () =>{
        const token = localStorage.getItem("ozinshe_token")

        axios 
        .delete(`http://api.ozinshe.com/core/V1/posters/${posterId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => {  
            console.log(result.data)
            toast.success("Успешно")
        })
        .catch(error => {
            console.log(error)
            toast.error("Что-то пошло не так");
        })

        axios 
        .post(`http://api.ozinshe.com/core/V1/posters`, {
            "movieId" : projectId,
            "fileId" : fileIdPoster
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => {  
            setFileIdPoster(0)
            toast.success("Успешно добавился обложка")
        })
        .catch(error => {
            console.log(error)
            toast.error("Что-то пошло не так");
        })
    }

    const handleUpdateScreenshots = () => {
        const token = localStorage.getItem("ozinshe_token")
        let array = []
        uploadFilesMulti.map(element => {
            array.push({"movieId" : projectId, "fileId" : element.id})
        })

        axios 
        .post(`http://api.ozinshe.com/core/V1/screenshots`, array, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => {
            console.log(result.data)  
            setUploadFilesMulti([])
            toast.success("Успешно добавился скриншоты")
        })
        .catch(error => {
            console.log(error)
            toast.error("Что-то пошло не так");
        })
    }

    const handleAddSeason = (count) => {
        count++;
        const newArray = [...season];
        newArray.push({"number": count, "movieId" : projectId,"videos" : [{"number" : 1, "link" : ""}]})
        setSeason(newArray)
    }

    const updateState = (index, i) => (e)=> {
        const newArray = [...season];
        newArray[index].videos[i].link=e.target.value;
        setSeason(newArray)  
    }

    const handleRemoveSeries = (seasonId, seriesId) => {
        const newArray = [...season];
        if(seriesId === 1){
            newArray.pop()
        }else{
            newArray[seasonId-1].videos.pop()
        }
        setSeason(newArray)
    }

    const handleDeleteScreenshot = (index) => {
        const newArray = [...screenshots]
        let arrayDelete1 = [...screenshotsDelete]
        let arrayDelete2 = (newArray.splice(index, 1))
        let combinedArr = arrayDelete1.concat(arrayDelete2)
        setScreenshotsDelete(combinedArr)
        // newArray.splice(index, 1)
        setScreenshots(newArray)
    }

    const handleAddSeries = (seasonId, seriesId) =>{
        seriesId++
        const newArray = [...season];
        newArray[seasonId-1].videos.push({"number": seriesId, "link" : ""})
        setSeason(newArray)
        // season[seasonId-1].videos.push({"number": seriesId, "link" : ""})
    }

    useEffect(()=>{
        getJenres()
        getCategories()
        getCategorуAges()
        getProjectById()
        getSeasonVideo()
        setIsTrue(false)
    }, [isTrue])

    return(
        <div className="section">
        <div className="section__navigation">
            <Link to="/projects"><p className="last-page">Проекты</p></Link>
            <img src={RightIcon} alt=""/>
            <p className="current-page">Добавить проект</p>
        </div>
        <div className='add__container'>
            <div className='add__container-title'>
                <Link to={`/projects/${projectId}`}><img src={Button} alt=""/></Link>
                <h2>Редактировать "{nameProject}"</h2>
            </div>
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
            <TabPanel header="Основная информация">
            <div className='add__container-form'>
                <div className='input-box'>
                    <input value={nameProject} 
                        onChange={e=>setNameProject(e.target.value)}    
                        className='input' 
                        type="text" 
                        required/>
                    <div className='labelline'> Название проекта</div>
                </div>
                <div className='input__box'>
                    <MultiSelect value={category} onChange={(e) => setCategory(e.value)} options={categories} optionLabel="name" 
                        maxSelectedLabels={4} className="input" />
                    <div className='labelline'>Категория</div>
                </div>
                <div className='input__box'>
                    <MultiSelect value={jenr} onChange={(e) => setJenr(e.value)} options={jenres} optionLabel="name" 
                        maxSelectedLabels={4} className="input" />
                    <div className='labelline'>Жанры</div>
                </div>
                <div className='input-box-grid'>
                    <div className='input__box'>
                        <select className='input' disabled required>
                            <option>{movieType}</option>
                            <option>Сериал</option>
                            <option>Фильм</option>
                        </select>
                        <div className='labelline'>Тип проекта</div>
                    </div>
                    <div className='input__box'>
                        <MultiSelect value={categoryAge} onChange={(e) => setCategoryAge(e.value)} options={categoryAges} optionLabel="name" 
                            maxSelectedLabels={4} className="input" />
                        <div className='labelline'>Возрастная категория</div>
                    </div>
                    <div className='input-box'>
                        <input 
                            value={year}
                            onChange={e=>setYear(e.target.value)}
                            className='input' 
                            type="number" 
                            required/>
                        <div className='labelline'>Год</div>
                    </div>
                    <div className='input-box'>
                        <input 
                            value={timing}
                            onChange={e=>setTiming(e.target.value)}
                            className='input' 
                            type="number" 
                            required/>
                        <div className='labelline'>Хронометраж (мин)</div>
                    </div>
                </div>
                <div className='input-box'>
                    <input 
                        value={keyWords}
                        onChange={e=>setKeyWords(e.target.value)}
                        className='input' 
                        type="text" 
                        required/>
                    <div className='labelline'>Ключевые слова</div>
                </div>
                <div className='textarea-box'>
                    <textarea 
                        value={description}
                        onChange={e=>setDescription(e.target.value)}
                        className='textarea' 
                        required/>
                    <div className='labelline'>Описание</div>
                </div>
                <div className='input-box'>
                    <input 
                        value={director}
                        onChange={e => setDirector(e.target.value)}
                        className='input' 
                        type="text" 
                        required/>
                    <div className='labelline'>Режиссер</div>
                </div>
                <div className='input-box'>
                    <input 
                        value={producer}
                        onChange={e=>setProducer(e.target.value)}
                        className='input' 
                        type="text" 
                        required/>
                    <div className='labelline'>Продюсер</div>
                </div>
                <div className='add__container-buttons'>
                    <button onClick={()=>handleUpdateMovieBase()} className='further__button'>Далее</button>
                    <Link to="/projects"><button className='cancel__button'>Отмена</button></Link>
                </div>
            </div>
            </TabPanel>
                <TabPanel header="Видео">
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
                    <div key={e.id} className="step2__series">
                        <h2>{e.number} сезон</h2>
                        {e.videos.map((j, i)=>(
                            <div key={j.id} className="step2">
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
                                    <img onClick={()=>handleRemoveSeries(e.number, e.videos.length)} src={DeleteIcon} alt=""/>
                                </div>
                                <YouTubeToAdd youtubeLink={"https://www.youtube.com/watch?v=" + j.link} link={j.link}/>
                            </div>    
                        ))}
                        <p onClick={()=>handleAddSeries(e.number, e.videos.length)}>Добавить серию</p>
                    </div>
                    ))}
                    </div>
                    }
                    <div className='add__container-buttons'>
                        <button onClick={()=>handleUpdateVideo()} className='further__button'>Далее</button>
                        <Link to="/projects"><button className='cancel__button'>Отмена</button></Link>
                    </div>
                    </div>

                </TabPanel>
                <TabPanel header="Обложка и скриншоты">
                <div className="add__container-step2">
                    <div className="add__container-cover">
                        <h2>Обложка</h2>
                        <p>Рекомендуется использовать картинки размером не менее 375×550px</p>
                        {drag ? 
                            <div className="upload__block">
                                <img src={UploadIcon} alt=""/>
                                <p>Перетащите картинку или <span style={{color: '#0052CC'}}> загрузите </span></p>
                                <input
                                    className="file__input" 
                                    type="file"
                                    onChange={handleOnChangePoster}
                                />
                            </div>
                            :
                            <div className="poster__image">
                                <div className="file-uploader__preview">
                                    <button onClick={()=> handleDeleteImagePoster()} className="delete-icon"><img src={DeleteIcon} alt=""/></button>
                                    <img
                                        src={poster}
                                        alt="preview"
                                        className="file-uploader__image"
                                    />    
                                </div>
                            </div>
                        }
                    </div>

                    <div className="add__container-screenshots">
                        <h2>Скриншоты</h2>
                        <p>Рекомендуется использовать картинки размером не менее 375×550px</p>   
                        <div className="upload__block">
                            <img src={UploadIcon} alt=""/>
                            <p>Перетащите картинку или <span style={{color: '#0052CC'}}> загрузите </span></p>
                            <input
                                className="file__input" 
                                type="file"
                                onChange={handleOnChangeScreenshots}
                            />
                        </div>  
                    </div>
                    <div className="screenshots__list">
                        {screenshotsNew.map((element, index) => (
                            <div className="screenshots-item">
                                <img 
                                    src={URL.createObjectURL(element)}
                                    alt=""
                                    className="screenshots-image"
                                />
                                <button onClick={()=> handleDeleteScreenshotNew(index)} className="delete-icon"><img src={DeleteIcon} alt=""/></button>
                            </div>
                        ))}
                    </div>
                    <p style={{marginBottom : "20px"}}>Текущие скриншоты</p>
                    <div className="screenshots__list">
                        {screenshots.map((element, index) => (
                            <div className="screenshots-item">
                                <img 
                                    src={element.link}
                                    alt=""
                                    className="screenshots-image"
                                />
                                <button onClick={()=> handleDeleteScreenshot(index)} className="delete-icon"><img src={DeleteIcon} alt=""/></button>
                            </div>
                        ))}
                        {fileIdPoster > 0 ? handleUpdatePoster() : ""}
                        {uploadFilesMulti.length>0 ? handleUpdateScreenshots() : ""}
                    </div>
                    <div className='add__container-buttons'>
                        <button onClick={()=>handleUploadFiles()} className='further__button'>Далее</button>
                        <Link to="/projects"><button className='cancel__button'>Отмена</button></Link>
                    </div>
                    </div>
                </TabPanel>
            </TabView>
        </div>
    </div>
    );
};

export default ProjectEdit;