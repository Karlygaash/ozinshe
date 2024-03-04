import { useEffect, useState } from "react";
import axios from 'axios'
import PlusIcon from '../assets/icons/plusIcon.svg'
import CameraIcon from '../assets/icons/CameraIcon.svg'
import EditIcon from '../assets/icons/edit.svg'
import DeleteIcon from '../assets/icons/delete.svg'
import { ConfirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/md-light-indigo/theme.css'
import { Dialog } from 'primereact/dialog';
import '../assets/styles/Jenres.css'
import UploadIcon from '../assets/icons/UploadIcon.svg'
import DefaultPoster from '../assets/icons/default__poster.png'
import { toast } from "react-toastify"
import { fetchJenres, fetchJenreById, CreateUploadFileService, 
    putEditJenreService, postCreateJenreService, HandleDeleteJenreService } from "../service";

const Jenres = () => {
    const [visible, setVisible] = useState()
    const [visibleEdit, setVisibleEdit] = useState()
    const [jenres, setJenres] = useState([])
    const [nameJenr, setNameJenr] = useState("") 
    const [fileId, setFileId] = useState(0)
    const [isTrue, setIsTrue] = useState()
    const [image_src, setImage_src] = useState()
    const [imageURL, setImageURL] = useState();
    const [drag, setDrag] = useState(true)
    const fileReader = new FileReader();
    const [nameJenreEdit, setNameJenreEdit] = useState("")
    const [fileIdEdit, setFileIdEdit] = useState(0)
    const [fileIdEditNew, setFileIdEditNew] = useState(0)
    const [linkEdit, setLinkEdit] = useState()
    const [idEdit, setIdEdit] = useState()
    const [visibleDelete, setVisibleDelete] = useState()
    const [idDelete, setIdDelete] = useState()

    fileReader.onloadend = () => {
      setImageURL(fileReader.result);
    };
  
    const handleOnChange = (event) => {
      event.preventDefault();
      if (event.target.files && event.target.files.length) {
        const file = event.target.files[0];
        setImage_src(file);
        fileReader.readAsDataURL(file);
      }
      setDrag(false)
    };

    const handleOnChangeEdit = (event) => {
        event.preventDefault();
        if (event.target.files && event.target.files.length) {
          const file = event.target.files[0];
          setImage_src(file);
          fileReader.readAsDataURL(file);
        }
        setDrag(true)

        fileReader.onloadend = () => {
            setLinkEdit(fileReader.result)
        };
      };

    const getJenres = () => {
        fetchJenres().then(result=>{
            setJenres(result)
        })
    }

    const getJenreById = (id) => {
        fetchJenreById(id).then(result => {
            console.log(result)
            setNameJenreEdit(result.name)
            setFileIdEdit(result.fileId)
            setLinkEdit(result.link)
            setIdEdit(result.id)
        })
    }

    const CreateUploadFile = () => {
        const formDate = new FormData()
        formDate.append("file", image_src)

        CreateUploadFileService(formDate).then(result=>{
            setFileId(result.id)
        })
    }

    const CreateUploadFileEdit = () => {
        const formDate = new FormData()
        formDate.append("file", image_src)

        CreateUploadFileService(formDate).then(result=>{
            setFileIdEditNew(result.id)
        })
    }

    const putEditJenre = (file_id) => {
        putEditJenreService(idEdit, file_id, nameJenreEdit).then(result => {
            console.log(result)
            setIsTrue(false)
            setFileIdEditNew(0)
            toast.success("Успешно изменились");  
        })
    }

    const postCreateJenre = () => {
        postCreateJenreService(fileId, nameJenr).then(result => {
            console.log(result)
            setIsTrue(false)
            setFileId(0)
            toast.success("Успешно создался"); 
        })
    }

    const HandleDeleteJenre = () => {
        HandleDeleteJenreService(idDelete).then(result => {
            setIsTrue(false)
            toast.success("Успешно удалились"); 
        })
    }

    const deleteJenres = (id) => {
        setIdDelete(id)
        setVisibleDelete(true)
    }

    const handleDeleteImage = () => {
        setImage_src()
        setImageURL()
        setDrag(true)
    }

    const handleDeleteImageEdit = () => {
        setImage_src()
        setDrag(false)
        setLinkEdit()
    }

    const handleCancelButton = () => {
        setVisible(false)
        setDrag(true)
        setImageURL()
        setImage_src()
        setNameJenr("")
        setVisibleEdit(false)
        setFileIdEditNew()
    } 

    const handleEditJenre = () => {
        if(typeof image_src === 'object'){
            CreateUploadFileEdit()
        }else {
            putEditJenre(fileIdEdit)
        }
        handleCancelButton()
    }

    const handleCreateJenres = () => {
        postCreateJenre()
        setFileId(0)
        handleCancelButton()
    }

    const getJenreShow = (id) =>{
        getJenreById(id)
        setVisibleEdit(true)
    }

    useEffect(()=>{
        getJenres()
        setIsTrue(true)
    }, [isTrue])

    return(
        <div className="section"> 
            <div className="section__header">
                <h1 className="section__header-title">Жанры<span className="projects__count">{jenres.length}</span></h1>
                <button onClick={() => setVisible(true)} className="section__header-button"><img src={PlusIcon} alt="" className="section__header-button-icon"/> Добавить</button>
            </div>
            <Dialog header="Добавить жанр" visible={visible} onHide={() => handleCancelButton()}>
                    <div className="dialog-container"> 
                        <input 
                            value={nameJenr}    
                            type="text" 
                            placeholder="Название жанра" 
                            className="input"
                            onChange={e=>setNameJenr(e.target.value)}
                        />
                        {drag ? 
                        <div className="upload__block">
                            <img src={UploadIcon} alt=""/>
                            <p>Перетащите картинку или <span style={{color: '#0052CC'}}>загрузите </span></p>
                            <input
                                className="file__input" 
                                type="file"
                                onChange={handleOnChange}
                            />
                        </div>
                        :
                        <div className="file-uploader__preview">
                            <button onClick={()=> handleDeleteImage()} className="delete-icon"><img src={DeleteIcon} alt=""/></button>
                            <img
                                src={imageURL}
                                alt="preview"
                                className="file-uploader__image"
                            />    
                        </div>
                        }
                        <div className="dialog-button">
                            <button onClick={()=> CreateUploadFile()} className="confirm-dialog-accept">Добавить</button>
                            <button onClick={() => handleCancelButton()} className="confirm-dialog-reject">Отмена</button>
                        </div>
                    </div>
                </Dialog>
                <Dialog header="Изменить жанр" visible={visibleEdit} onHide={() => setVisibleEdit(false)}>
                    <div className="dialog-container"> 
                        <input 
                            value={nameJenreEdit}    
                            type="text" 
                            placeholder="Название жанра" 
                            className="input"
                            onChange={e=>setNameJenreEdit(e.target.value)}
                        />
                        {drag ? 
                        <div className="file-uploader__preview">
                            <button onClick={()=> handleDeleteImageEdit()} className="delete-icon"><img src={DeleteIcon} alt=""/></button>
                            <img
                                src={linkEdit}
                                alt="preview"
                                className="file-uploader__image"
                            />                       
                        </div>
                        :
                        <div className="upload__block">
                            <img src={UploadIcon} alt=""/>
                            <p>Перетащите картинку или <span style={{color: '#0052CC'}}>загрузите</span></p>
                            <input
                                className="file__input" 
                                type="file"
                                onChange={handleOnChangeEdit}
                            />
                        </div>
                        }
                        <div className="dialog-button">
                            <button onClick={e=> handleEditJenre()} className="confirm-dialog-accept">Изменить</button>
                            <button onClick={e=> handleCancelButton()} className="confirm-dialog-reject">Отмена</button>
                        </div>
                    </div>
                </Dialog>
                <ConfirmDialog visible={visibleDelete} 
                    onHide={() => setVisibleDelete(false)} 
                    message="Вы действительно хотите удалить жанр?"
                    header="Удалить жанр?" 
                    reject={()=>setVisibleDelete(false)} 
                    accept={() => HandleDeleteJenre()}
                    acceptLabel="Да, удалить"
                    rejectLabel="Отмена"
                />
                {fileId > 0 ? (handleCreateJenres(), setFileId(0)) : ""}
                {fileIdEditNew > fileIdEdit ? putEditJenre(fileIdEditNew) : ""}
            <div className="section__project-list">
                {jenres.map(element => (
                    <div className="section__project-item" key={element.id}>
                        <div className="jenres__item">
                            <div className="jenres__item-poster">
                                
                                <img src={element.link} alt="" className="poster"/>
                                <img src={DefaultPoster} alt="" className="default_poster"/>
                            </div>
                            <h3>
                                {element.name.slice(0, 21)}
                                {element.name.length >21 ? '...' : ''}
                            </h3>
                            <div className="category__footer">
                                <div className="category__movie-count">
                                    <img src={CameraIcon} alt=""/>
                                    {element.movieCount}
                                </div>
                                <div className="category__footer-icons">
                                    <img src={EditIcon} onClick={e=> getJenreShow(element.id)} alt=""/>
                                    <img src={DeleteIcon} onClick={e => deleteJenres(element.id)} alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <ConfirmDialog/>
            </div>
        </div>
    )
}

export default Jenres;