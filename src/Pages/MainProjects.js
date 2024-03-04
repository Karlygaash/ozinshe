import { useEffect, useState } from "react";
import PlusIcon from '../assets/icons/plusIcon.svg'
import EditIcon from '../assets/icons/editIcon.svg'
import DeleteIcon from '../assets/icons/deleteIcon.svg'
import '../assets/styles/MainProjects.css'
import { ConfirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/md-light-indigo/theme.css'
import { Dialog } from 'primereact/dialog';
import UploadIcon from '../assets/icons/UploadIcon.svg'
import DefaultPoster from '../assets/icons/default__poster.png'
import { toast } from "react-toastify"
import { getMainProjectsService, handleDeleteMainProjectService,
    CreateUploadFileService, getMoviesService, postCreateMainMoviesService,
    putEditMainProjectService} from "../service";

const MainProjects = () => {
    const [projects, setProjects] = useState([])
    const [visible, setVisible] = useState()
    const [visibleDelete, setVisibleDelete] = useState()
    const [visibleEdit, setVisibleEdit] = useState()
    const [movies, setMovies] = useState([])
    const [isTrue, setIsTrue] = useState()
    const [image_src, setImage_src] = useState()
    const [imageURL, setImageURL] = useState();
    const [drag, setDrag] = useState(true)
    const fileReader = new FileReader();
    const [fileId, setFileId] = useState(0)
    const [movieId, setMovieId] = useState()
    const [sortOrder, setSortOrder] = useState()
    const [idDelete, setIdDelete] = useState()

    const [idEdit, setIdEdit] = useState()
    const [nameEdit, setNameEdit] = useState("")
    const [movieidEdit, setMovieIdEdit] = useState()
    const [sortOrderEdit, setSortOrderEdit] = useState()
    const [linkEdit, setLinkEdit] = useState()
    const [fileIdEdit, setFileIdEdit] = useState(0)
    const [fileIdEditNew, setFileIdEditNew] = useState(0)

    const sortOrders=[]
    for(let i =1; i<=10;i++){
        sortOrders.push(i)
    }
    
    const handleOnChange = (event) => {
        event.preventDefault();
        if (event.target.files && event.target.files.length) {
          const file = event.target.files[0];
          setImage_src(file);
          fileReader.readAsDataURL(file);
        }
        setDrag(false)

        fileReader.onloadend = () => {
            setImageURL(fileReader.result);
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

    const getMainProjects = () => {
        getMainProjectsService().then(result => {
            setProjects(result)
        })
    }
    
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

    const handleDeleteMainProject = () => {
        handleDeleteMainProjectService(idDelete).then(result => {
            setIsTrue(false)
            toast.success("Успешно удален!");
        })
    }

    const getMovies = () => {
        getMoviesService().then(result => setMovies(result))
    }

    const postCreateMainMovies = () => {
        postCreateMainMoviesService(fileId, movieId, sortOrder).then(result => {
            console.log(result)
            setIsTrue(false)
            setFileId(0)
            toast.success("Успешно создался");  
        })
    }

    const putEditMainProject = (file_id) => {
        putEditMainProjectService(idEdit, file_id, movieidEdit,sortOrderEdit).then(result=>{
            console.log(result)
            setIsTrue(false)
            setFileIdEditNew(0)
            toast.success("Успешно изменились"); 
        })
    }

    const handleDeleteImage = () => {
        setImage_src()
        setImageURL()
        setDrag(true)
    }

    const deleteProject = (id) => {
        setIdDelete(id)
        setVisibleDelete(true)
    }

    const handleCancelButton = () => {
        setVisible(false)
        setDrag(true)
        setImageURL()
        setImage_src()
        setVisibleEdit(false)
        setFileIdEditNew()
    } 

    const getMainProjectShow = (id, movieId, name, sortOrder, fileId, linkEdit) => {
        setIdEdit(id)
        setMovieIdEdit(movieId)
        setNameEdit(name)
        setSortOrderEdit(sortOrder)
        setFileIdEdit(fileId)
        setLinkEdit(linkEdit)
        setVisibleEdit(true)
        
    }

    const handleDeleteImageEdit = () => {
        setImage_src()
        setDrag(false)
        setLinkEdit()
    }

    const handleEditMainProject = () => {
        if(typeof image_src === 'object'){
            CreateUploadFileEdit()
        }else {
            putEditMainProject(fileIdEdit)
        }
        handleCancelButton()
    }

    const handleCreateMainMovies = () => {
        postCreateMainMovies()
        setFileId(0)
        handleCancelButton()
    }

    useEffect(()=> {
        getMainProjects()
        getMovies()
        setIsTrue(true)
    }, [isTrue])

    return(
        <div className="section">
            <div className="section__header">
                <h1 className="section__header-title">Проекты на главной<span className="projects__count">{projects.length}</span></h1>
                <button onClick={e=> setVisible(true)} className="section__header-button"><img src={PlusIcon} alt="" className="section__header-button-icon"/> Добавить</button>
            </div>
                <Dialog header="Добавить проект на главную" visible={visible} onHide={() => handleCancelButton(false)}>
                    <div className="dialog-container"> 
                        <div className='input-box'>
                            <select className='input' required onChange={e=>setMovieId(e.target.value)}>
                                <option value=""></option>
                                {movies.map(element => (
                                    <option value={element.id}>{element.name}</option>
                                ))}
                            </select>
                            <div className='labelline'>Выберите проект</div>
                        </div>
                        <div className='input-box'>
                            <select className='input' required onChange={e=>setSortOrder(e.target.value)}>
                                <option value=""></option>
                                {sortOrders.map(element => (
                                    <option value={element}>{element}</option>
                                ))}
                            </select>
                            <div className='labelline'>Выберите очередность</div>
                        </div>
                        {drag ? 
                        <div className="upload__block">
                            <img src={UploadIcon} alt=""/>
                            <p>Перетащите картинку или <span style={{color: '#0052CC'}}> загрузите </span></p>
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
                <Dialog header="Изменить проект на главную" visible={visibleEdit} onHide={() => setVisibleEdit(false)}>
                    <div className="dialog-container"> 
                        <div className='input-box'>
                            <select className='input' required onChange={e=>setMovieIdEdit(e.target.value)}>
                                <option value={movieidEdit}>{nameEdit}</option>
                                {movies.map(element => (
                                    <option value={element.id}>{element.name}</option>
                                ))}
                            </select>
                            <div className='labelline'>Выберите проект</div>
                        </div>
                        <div className='input-box'>
                            <select className='input' required onChange={e=>setSortOrderEdit(e.target.value)}>
                                <option value={sortOrderEdit}>{sortOrderEdit}</option>
                                {sortOrders.map(element => (
                                    <option value={element}>{element}</option>
                                ))}
                            </select>
                            <div className='labelline'>Выберите очередность</div>
                        </div>
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
                            <button onClick={e=> handleEditMainProject()} className="confirm-dialog-accept">Изменить</button>
                            <button onClick={e=> handleCancelButton()} className="confirm-dialog-reject">Отмена</button>
                        </div>
                    </div>
                </Dialog>
                {fileId > 0 ? (handleCreateMainMovies(), setFileId(0)) : ""}
                {fileIdEditNew > fileIdEdit ? putEditMainProject(fileIdEditNew) : ""}
            <div className="section__mainproject-list">
                {projects.map(element =>(
                    <div key={element.id} className="section__project-item">
                        <img src={element.link} className="project__poster-image"/>
                        <h4 className="project__title">
                            {element.movie.name}
                        </h4>
                        <ul className="main_project-categories-list">
                            {element.movie.categories.map(e => (
                                <li>{e.name}</li>
                            ))}
                        </ul>
                        <div className="project__footer">
                            <div className="project__watch-count">
                                Проект на главной #{element.sortOrder}
                            </div>
                            <div className="project__buttons">
                                <img className="project__button" onClick={e=> getMainProjectShow(element.id, element.movie.id, element.movie.name, element.sortOrder, element.fileId, element.link)}src={EditIcon} alt=""/>
                                <img className="project__button" onClick={()=>deleteProject(element.id)} src={DeleteIcon} alt=""/>
                            </div>
                        </div>
                    </div>
                ))}
                <ConfirmDialog visible={visibleDelete} 
                    onHide={() => setVisibleDelete(false)} 
                    message="Вы действительно хотите удалить из главной?"
                    header="Удалить проект из главной?" 
                    reject={()=>setVisibleDelete(false)} 
                    accept={() => handleDeleteMainProject()}
                    rejectLabel="Отмена"
                    acceptLabel="Да, удалить"
                />
            </div>
        </div>
    );
};

export default MainProjects;