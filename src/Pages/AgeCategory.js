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
import DefaultPoster from '../assets/icons/default__poster.png'
import UploadIcon from '../assets/icons/UploadIcon.svg'
import { toast } from "react-toastify"
import { CreateUploadFileService, getAgeCategoryByIdService, postCreateAgeCategoryService,
    getAgeCategoryService, putEditAgeCategoryService, handleDeleteAgeCategoryService } from "../service";

const AgeCategory = () => {
    const [ageCategory, setAgeCategory] = useState([])
    const [visible, setVisible] = useState()
    const [visibleEdit, setVisibleEdit] = useState()
    const [nameCatAge, setNameCatAge] = useState("")
    const [fileId, setFileId] = useState(0)
    const [isTrue, setIsTrue] = useState()
    const [image_src, setImage_src] = useState()
    const [imageURL, setImageURL] = useState();
    const [drag, setDrag] = useState(true)
    const fileReader = new FileReader();
    const [fileIdEdit, setFileIdEdit] = useState(0)
    const [fileIdEditNew, setFileIdEditNew] = useState(0)
    const [linkEdit, setLinkEdit] = useState()
    const [idEdit, setIdEdit] = useState()
    const [nameCatAgeEdit, setNameCatAgeEdit] = useState("")
    const [visibleDelete, setVisibleDelete] = useState()
    const [idDelete, setIdDelete] = useState()

    const handleOnChange = (event) => {
        event.preventDefault();
        if (event.target.files && event.target.files.length) {
          const file = event.target.files[0];
          setImage_src(file);
          fileReader.readAsDataURL(file);
        }
        setDrag(false)

        fileReader.onloadend = () => {
            setImageURL(fileReader.result)
        };
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

    const CreateUploadFile = () => {
        const formDate = new FormData()
        formDate.append("file", image_src)
        CreateUploadFileService(formDate).then(result => setFileId(result.id))
    }

    const CreateUploadFileEdit = () => {
        const formDate = new FormData()
        formDate.append("file", image_src)    
        CreateUploadFileService(formDate).then(result => setFileIdEditNew(result.id))
    }

    const getAgeCategoryById = (id) => {
        getAgeCategoryByIdService(id).then(result => {
            setNameCatAgeEdit(result.name)
            setFileIdEdit(result.fileId)
            setLinkEdit(result.link)
            setIdEdit(result.id)
        })
    }

    const postCreateAgeCategory = () => {
        postCreateAgeCategoryService(fileId, nameCatAge).then(result =>{
            setIsTrue(false)
            setFileId(0)
            toast.success("Успешно создался");
        })
    }

    const getAgeCategory = () => {
        getAgeCategoryService().then(result => setAgeCategory(result))
    }

    const putEditAgeCategory = (file_id) => {
        putEditAgeCategoryService(idEdit, file_id, nameCatAgeEdit).then(result=>{
            setIsTrue(false)
            setFileIdEditNew(0)
            toast.success("Успешно изменился");
        })
    }

    const handleDeleteAgeCategory = () => {
        handleDeleteAgeCategoryService(idDelete).then(result => {
            setIsTrue(false)
            toast.success("Успешно удалились");
        })
    }

    const handleDeleteImage = () => {
        setImage_src()
        setImageURL()
        setDrag(true)
    }

    const getAgeCategoryShow = (id) =>{
        getAgeCategoryById(id)
        setVisibleEdit(true)
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
        setNameCatAge("")
        setVisibleEdit(false)
        setFileIdEditNew()
    } 

    const deleteAgeCategory = (id) => {
        setIdDelete(id)
        setVisibleDelete(true)
    }

    const handleEditAgeCategory = () => {
        if(typeof image_src === 'object'){
            CreateUploadFileEdit()
        }else {
            putEditAgeCategory(fileIdEdit)
        }
        handleCancelButton()
    }

    const handleCreateAgeCategory = () => {
        postCreateAgeCategory()
        setFileId(0)
        handleCancelButton()
    }

    useEffect(()=>{
        getAgeCategory()
        setIsTrue(true)
    }, [isTrue])

    return (
        <div className="section"> 
            <div className="section__header">
                <h1 className="section__header-title">Возрасты<span className="projects__count">{ageCategory.length}</span></h1>
                <button onClick={() => setVisible(true)} className="section__header-button"><img src={PlusIcon} alt="" className="section__header-button-icon"/> Добавить</button>
            </div>
                <Dialog header="Добавить возраст" visible={visible} onHide={() => handleCancelButton()}>
                    <div className="dialog-container"> 
                        <input 
                            value={nameCatAge}    
                            type="text" 
                            placeholder="Название" 
                            className="input"
                            onChange={e=>setNameCatAge(e.target.value)}
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
                <Dialog header="Изменить возраст" visible={visibleEdit} onHide={() => setVisibleEdit(false)}>
                    <div className="dialog-container"> 
                        <input 
                            value={nameCatAgeEdit}    
                            type="text" 
                            placeholder="Название жанра" 
                            className="input"
                            onChange={e=>setNameCatAgeEdit(e.target.value)}
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
                            <p>Перетащите картинку или <span style={{color: '#0052CC'}}> загрузите </span></p>
                            <input
                                className="file__input" 
                                type="file"
                                onChange={handleOnChangeEdit}
                            />
                        </div>
                        }
                        <div className="dialog-button">
                            <button onClick={e=> handleEditAgeCategory()} className="confirm-dialog-accept">Изменить</button>
                            <button onClick={e=> handleCancelButton()} className="confirm-dialog-reject">Отмена</button>
                        </div>
                    </div>
                </Dialog>
                <ConfirmDialog visible={visibleDelete} 
                    onHide={() => setVisibleDelete(false)} 
                    message="Вы действительно хотите удалить жанр?"
                    header="Удалить жанр?" 
                    reject={()=>setVisibleDelete(false)} 
                    accept={() => handleDeleteAgeCategory()}
                    acceptLabel="Да, удалить"
                    rejectLabel="Отмена"
                />
                {fileId > 0 ? (handleCreateAgeCategory(), setFileId(0)) : ""}
                {fileIdEditNew > fileIdEdit ? putEditAgeCategory(fileIdEditNew) : ""}
            <div className="section__project-list">
                {ageCategory.map(element => (
                    <div className="section__project-item" key={element.id}>
                        <div className="jenres__item">
                            <div className="jenres__item-poster">                      
                                <img src={element.link} alt="" className="poster"/>
                                <img src={DefaultPoster} alt="" className="default_poster"/>
                            </div>
                            <h3>
                                {element.name}
                            </h3>
                            <div className="category__footer">
                                <div className="category__movie-count">
                                    <img src={CameraIcon} alt=""/>
                                    {element.movieCount}
                                </div>
                                <div className="category__footer-icons">
                                    <img src={EditIcon} onClick={e=> getAgeCategoryShow(element.id)} alt=""/>
                                    <img src={DeleteIcon} onClick={e => deleteAgeCategory(element.id)} alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <ConfirmDialog/>
        </div>
    );
};

export default AgeCategory;