import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'
import PlusIcon from '../assets/icons/plusIcon.svg'
import CheckIcon from '../assets/icons/check.svg'
import '../assets/styles/Roles.css'
import DeleteIcon from '../assets/icons/deleteIcon.svg'
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/md-light-indigo/theme.css'
import { Dialog } from 'primereact/dialog';
import '../assets/styles/ProjectAdd.css'
import { toast } from "react-toastify"
import { getRolesService, postCreateRoleService, deleteRolesByIdService} from "../service";

const Roles = () => {
    const [visible, setVisible] = useState()
    const [adminRoles, setAdminRoles] = useState([])
    const [email, setEmail] = useState("")
    const [roleToAdd, setRoleToAdd] = useState("")
    const [isTrue, setIsTrue] = useState()
    const [visibleDelete, setVisibleDelete] = useState()
    const [idDelete, setIdDelete] = useState()
    const [roleDelete, setRoleDelete] = useState("")
    
    const getRoles = () => {
        getRolesService().then(result => setAdminRoles(result.content))
    }

    const postCreateRole = () => {

        postCreateRoleService(email,roleToAdd).then(result => {
            setIsTrue(true)
            toast.success("Успешно создался"); 
        })
    }

    const deleteRolesById = () => {
        deleteRolesByIdService(idDelete, roleDelete).then(result => {
            setIsTrue(false)
            toast.success("Успешно удалились"); 
        })
    }

    const handleCancelButton = () => {
        setVisible(false)
        setEmail("")
    }

    const handleCreateRole = () =>{
        postCreateRole()
        handleCancelButton()
    }

    const handleDeleteRoles = (id, name) => {
        setIdDelete(id)
        setRoleDelete(name)
        setVisibleDelete(true)
        console.log(id, name)
    }

    useEffect(()=>{
        getRoles()
    }, [isTrue])
    return(
        <div className="section"> 
            <div className="section__header">
                <h1 className="section__header-title">Роли<span className="projects__count">{adminRoles.length}</span></h1>
                <button onClick={() => setVisible(true)} className="section__header-button"><img src={PlusIcon} alt="" className="section__header-button-icon"/> Добавить</button>
            </div>
                <Dialog header="Добавить роль" visible={visible} onHide={() => handleCancelButton()}>
                    <div className="dialog-container"> 
                        <div className='input-box'>
                            <input 
                                className='input' 
                                type="text" required
                                value={email}
                                onChange={e=>setEmail(e.target.value)}    
                            />
                            <div className='labelline'>Email</div>
                        </div>
                        <div className='input-box'>
                            <select className='input' onChange={e=>setRoleToAdd(e.target.value)} required>
                                <option value=""></option>
                                <option value="ROLE_ADMIN">Admin</option>
                                <option value="ROLE_MODERATOR">Moderator</option>
                            </select>
                            <div className='labelline'>Категория</div>
                        </div>
                        <div className="dialog-button">
                            <button onClick={()=> handleCreateRole()} className="confirm-dialog-accept">Добавить</button>
                            <button onClick={() => handleCancelButton()} className="confirm-dialog-reject">Отмена</button>
                        </div>
                    </div>
                </Dialog>
                <ConfirmDialog visible={visibleDelete} 
                    onHide={() => setVisibleDelete(false)} 
                    message="Вы действительно хотите удалить роль?"
                    header="Удалить роль?" 
                    reject={()=>setVisibleDelete(false)} 
                    accept={()=>deleteRolesById()}
                    acceptLabel="Да, удалить"
                    rejectLabel="Отмена"
                />
            <div className="role__section-list">
                {adminRoles.map(element => (
                    <div>
                    {element.user.roles.filter(e=>e.id > 1).map(j => (
                    <div key={element.id} className="role__section-item">
                        <h3 className="role__section-user">{element.user.email}</h3>
                        <div className="role__name">
                            <div>{j.name}
                         </div>
                        </div>
                        <div className="role__action-list">
                            <div className="role__action">
                                <img src={CheckIcon} alt=""/>
                                <div className="action__title">Проекты</div>
                                <div className="action">(Редактирование)</div>
                            </div>
                            <div className="role__action">
                                <img src={CheckIcon} alt=""/>
                                <div className="action__title">Категории</div>
                                <div className="action">(Редактирование)</div>
                            </div>
                            <div className="role__action">
                                <img src={CheckIcon} alt=""/>
                                <div className="action__title">Пользователи</div>
                                <div className="action">(Редактирование)</div>
                            </div>
                            <img onClick={() => handleDeleteRoles(element.user.id, j.name)} src={DeleteIcon} className="delete__icon" alt=""/>
                        </div>
                    </div>
                    ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Roles;