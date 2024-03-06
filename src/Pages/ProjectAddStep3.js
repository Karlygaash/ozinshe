import { useParams } from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';
import RightIcon from '../assets/icons/rightIcon.svg'
import Button from '../assets/icons/Button.svg'
import '../assets/styles/AddProjectStep3.css'
import DeleteIcon from '../assets/icons/deleteIcon.svg'
import { useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify"
import UploadIcon from '../assets/icons/UploadIcon.svg'
import Success from '../assets/icons/success.svg'
import 'primereact/resources/themes/md-light-indigo/theme.css'
import { Dialog } from 'primereact/dialog';

const ProjectAddStep3 = () => {
    const {idMovie} = useParams();
    const [drag, setDrag] = useState(true)
    const [posterUrl, setPosterUrl] = useState()
    const [isTrue, setIsTrue] = useState(false)
    const [screenshots, setScreenshots] = useState([])
    const [fileIdPoster, setFileIdPoster] = useState(0)
    const [uploadFilesMulti, setUploadFilesMulti] = useState([])
    const [visible, setVisible] = useState()

    const handleOnChangePoster = (event) => {
        event.preventDefault();
        if (event.target.files && event.target.files.length) {
          const file = event.target.files[0];
          setPosterUrl(file);
        }
        setDrag(false)
        setIsTrue(true)
    };

    const handleDeleteImagePoster = () => {
        setPosterUrl()
        setDrag(true)
    }

    const handleCreateImages = () => {
        const token = localStorage.getItem("ozinshe_token")
        const formDate = new FormData()
        const formDateArray = new FormData()

        if(!posterUrl.length === 0){
            alert("Обложка пусто")
            return;
        }if(screenshots.length===0){
            alert("Скриншоты пусто")
            return;
        }

        formDate.append("file", posterUrl)
        {screenshots.map(element => {
            formDateArray.append('files', element)
        })}

        axios 
        .post(`http://api.ozinshe.com/core/V1/files/upload`, formDate, {
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

    const handlePostImages = () => {
        const token = localStorage.getItem("ozinshe_token")

        axios 
        .post(`http://api.ozinshe.com/core/V1/posters`, {
            "movieId" : idMovie,
            "fileId" : fileIdPoster
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => {  
            setVisible(true);
            setFileIdPoster(0)
        })
        .catch(error => {
            console.log(error)
            toast.error("Что-то пошло не так");
        })
        setFileIdPoster(0)
        handleCreateScreenshots()
    }

    const handleCreateScreenshots = () => {
        const token = localStorage.getItem("ozinshe_token")
        let array = []
        uploadFilesMulti.map(element => {
            array.push({"movieId" : idMovie, "fileId" : element.id})
        })

        axios 
        .post(`http://api.ozinshe.com/core/V1/screenshots`, array, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(result => {
            console.log(result.data)
            setUploadFilesMulti("")         
        })
        .catch(error => {
            console.log(error)
            toast.error("Что-то пошло не так");
        })
    }

    const handleOnChangeScreenshots = (event) =>{
        if (event.target.files && event.target.files.length) {
            const file = event.target.files[0];
            screenshots.push(file);
        }
        setIsTrue(true)
    }

    const handleDeleteScreenshot = (index) => {
        screenshots.splice(index, 1)
        setIsTrue(true)
    }

    useEffect(()=>{
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
                    <Link to="/projects"><img src={Button} alt=""/></Link>
                    <h2>Обложка и скриншоты</h2>
                </div>
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
                                        src={URL.createObjectURL(posterUrl)}
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
                        {screenshots.map((element, index) => (
                            <div className="screenshots-item">
                                <img 
                                    src={URL.createObjectURL(element)}
                                    alt=""
                                    className="screenshots-image"
                                />
                                <button onClick={()=> handleDeleteScreenshot(index)} className="delete-icon"><img src={DeleteIcon} alt=""/></button>
                            </div>
                        ))}
                    </div>

                    <div className="footer__buttons">
                        <Link to={`/projects/add/${idMovie}/step2`}><button className='cancel__button'>Назад</button></Link>
                        <div className='add__container-buttons'>
                            <button onClick={()=>handleCreateImages()} className='further__button'>Далее</button>
                            <Link to="/projects"><button className='cancel__button'>Отмена</button></Link>
                        </div>
                    </div>
                    {fileIdPoster>0 ? handlePostImages() : ""}
                    <Dialog header="" visible={visible} onHide={() => setVisible(false)}>
                        <div className="dialog-container"> 
                            <img
                                src={Success}
                                alt=""
                            />
                            <p>Проект добавлен успешно!</p>
                            <div className="dialog-button">
                                <Link to="/projects"><button className="confirm-dialog-accept">Закрыть</button></Link>
                            </div>
                        </div>
                </Dialog>
                </div>
            </div>
        </div>
    )
}

export default ProjectAddStep3;