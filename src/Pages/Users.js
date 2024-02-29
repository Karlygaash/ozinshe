import { useEffect, useState } from "react";
import DownIcon from '../assets/icons/DownIcon.svg'
import axios from 'axios'
import '../assets/styles/Users.css'
import { Dialog } from 'primereact/dialog';
import UserIcon from '../assets/icons/user__icon.svg'

const Users = () => {
    const [sortField, setSortField] = useState("name")
    const [users, setUsers] = useState([])
    const [visible, setVisible] = useState()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [birthDate, setBirthDate] = useState("") 

    const getUsers = () => {
        const token = localStorage.getItem("ozinshe_token")
        axios
            .get(`http://api.ozinshe.com/core/V1/admin/?size=20&direction="ASC"&sortField=${sortField}`, 
            {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                setUsers(result.data.content)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleShowDialog = (name, email, birthDate) => {
        setName(name)
        setBirthDate(birthDate)
        setEmail(email)
        setVisible(true)
    }

    useEffect(()=>{
        getUsers()
    }, [sortField])

    return(
        <div className="section"> 
            <div className="section__header">
                <h1 className="section__header-title">Пользователи<span className="projects__count">{users.length}</span></h1>
            </div>

            <div className="section__sorted">
                <div className="sorted__item">
                    <p className="sorted__item-p">Сортировать:</p>
                    <div className="sorted__item-select-box">
                        <select className="sorted__item-select" onChange={e=>setSortField(e.target.value)}>
                            <option value="name">По имени</option>
                            <option value="createdDate">По дате регистрации</option>
                        </select>
                        <img src={DownIcon} className="sorted__item-select-box-icon" alt=""/>
                    </div>
                </div>
            </div>
            <div className="section__project-list">
                {users.map(element => (
                    <div className="section__project-item" key={element.id} onClick={()=>handleShowDialog(element.name, element.user.email, element.birthDate)}>
                        <div className="user__item">
                            <button className="user__item-ava">
                                {element.name === null ? "" : element.name[0]}
                            </button>
                            <h3>{element.name}</h3>
                            <p>{element.user.email}</p>
                        </div>
                    </div>
                ))}
            </div>
                <Dialog header="Данные пользователя" visible={visible} onHide={() => setVisible(false)}>
                    <div className="dialog-container"> 
                        <img src={UserIcon} alt=""/>
                        <h3>{name}</h3>
                        <p>{email}</p>
                        <p>Дата рождения: {birthDate}</p>
                        <div className="dialog-button">
                            <button onClick={() => setVisible(false)} className="confirm-dialog-accept">Закрыть</button>
                        </div>
                    </div>
                </Dialog>
        </div>
    );
};

export default Users;