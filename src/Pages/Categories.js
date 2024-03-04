import { useEffect, useState } from "react";
import axios from 'axios'
import PlusIcon from '../assets/icons/plusIcon.svg'
import CameraIcon from '../assets/icons/CameraIcon.svg'
import EditIcon from '../assets/icons/edit.svg'
import DeleteIcon from '../assets/icons/delete.svg'
import '../assets/styles/Categories.css'
import { ConfirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/md-light-indigo/theme.css'
import { Dialog } from 'primereact/dialog';
import { toast } from "react-toastify"
import { fetchCategories, postAddCategory, putCategory, deleteCategoryById } from "../service";

const Categories = () => {
    const [categories, setCategories] = useState([])
    const [visible, setVisible] = useState()
    const [visibleEdit, setVisibleEdit] = useState()
    const [nameEdit, setNameEdit] = useState("")
    const [idEdit, setIdEdit] = useState()
    const [nameToAdd, setNameToAdd] = useState("")
    const [isTrue, setIsTrue] = useState(true)
    const [visibleDelete, setVisibleDelete] = useState()
    const [idDelete, setIdDelete] = useState()

    const getCategories = () => {
        fetchCategories().then(result => setCategories(result))
    }

    const postCreateCategory = () => {
        postAddCategory(nameToAdd).then(result => {
            setIsTrue(false)
            setVisible(false)
            setNameToAdd("") 
            toast.success("Успешно создался");
            console.log(result) 
        })
    }

    const putEditCategory = () => {
        putCategory(idEdit,nameEdit).then(result =>{
            console.log(result)
            setIsTrue(false)
            setVisibleEdit(false) 
            toast.success("Успешно изменились");
        })
    }

    const handleDeleteCategory = () => {
        deleteCategoryById(idDelete).then(result => {
            setIsTrue(false)
            toast.success("Успешно удалились"); 
        })
    }

    const deleteCategory = (id) => {
        setIdDelete(id)
        setVisibleDelete(true)
    }

    const handleEditCategory = (id,name) =>{
        setIdEdit(id)
        setNameEdit(name)
        setVisibleEdit(true)
    }

    const handleCancelButton = () => {
        setVisible(false)
        setNameToAdd("")
    }

    useEffect(()=>{
        setIsTrue(true)
        getCategories()
    }, [isTrue])

    return(
        <div className="categories__section"> 
            <div className="section__header">
                <h1 className="section__header-title">Категории<span className="projects__count">{categories.length}</span></h1>
                <button onClick={() => setVisible(true)} className="section__header-button"><img src={PlusIcon} alt="" className="section__header-button-icon"/> Добавить</button>

                <Dialog header="Добавить категорию" visible={visible} onHide={() => handleCancelButton()}>
                    <div className="dialog-container"> 
                        <input 
                            value={nameToAdd}
                            onChange={e=> setNameToAdd(e.target.value)}
                            type="text" 
                            placeholder="Название категории" 
                            className="input"
                        />
                        <div className="dialog-button">
                            <button onClick={()=> postCreateCategory()} className="confirm-dialog-accept">Добавить</button>
                            <button onClick={() => handleCancelButton()} className="confirm-dialog-reject">Отмена</button>
                        </div>
                    </div>
                </Dialog>
                <Dialog header="Изменить категорию" visible={visibleEdit} onHide={() => setVisibleEdit(false)}>
                    <div className="dialog-container"> 
                        <input 
                            value={nameEdit}    
                            type="text" 
                            placeholder="Название категории" 
                            className="input"
                            onChange={e=>setNameEdit(e.target.value)}/>
                        <div className="dialog-button">
                            <button onClick={() => putEditCategory()} className="confirm-dialog-accept">Изменить</button>
                            <button onClick={() => setVisibleEdit(false)} className="confirm-dialog-reject">Отмена</button>
                        </div>
                    </div>
                </Dialog>
                <ConfirmDialog visible={visibleDelete} 
                    onHide={() => setVisibleDelete(false)} 
                    message="Вы действительно хотите удалить категорию?"
                    header="Удалить категорию?" 
                    reject={()=>setVisibleDelete(false)} 
                    accept={() => handleDeleteCategory()}
                    acceptLabel="Да, удалить"
                    rejectLabel="Отмена"
                />
            </div>
            <div className="categories__list">
                {categories.map(element => (
                <div key={element.id} className="category__item"> 
                    <h3>{element.name}</h3>
                    <div className="category__footer">
                        <div className="category__movie-count">
                            <img src={CameraIcon} alt=""/>
                            {element.movieCount}
                        </div>
                        <div className="category__footer-icons">
                            <img src={EditIcon} onClick={() => handleEditCategory(element.id, element.name)} alt=""/>
                            <img src={DeleteIcon} onClick={e => deleteCategory(element.id)} alt=""/>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;