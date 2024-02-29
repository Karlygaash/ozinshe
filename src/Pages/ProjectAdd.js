import { Link } from 'react-router-dom';
import RightIcon from '../assets/icons/rightIcon.svg'
import '../assets/styles/ProjectAdd.css'
import Button from '../assets/icons/Button.svg'
import { useEffect, useState } from 'react';
import axios from 'axios'

const ProjectsAdd = () => {
    const [jenres, setJenres] = useState([])
    const [categories, setCategories] = useState([])
    const [categoryAges, setCategoryAges] = useState([])

    const getJenres = () => {
        const token = localStorage.getItem("ozinshe_token")
        axios
            .get('http://api.ozinshe.com/core/V1/genres', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                setJenres(result.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const getCategories = () => {
        const token = localStorage.getItem("ozinshe_token")
        axios
            .get('http://api.ozinshe.com/core/V1/categories', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                setCategories(result.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const getCategorуAges = () => {
        const token = localStorage.getItem("ozinshe_token")
        axios
            .get('http://api.ozinshe.com/core/V1/category-ages', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                setCategoryAges(result.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(()=>{
        getJenres()
        getCategories()
        getCategorуAges()
    }, [])
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
                    <h2>Оснавная информация</h2>
                </div>
                <div className='add__container-form'>
                    <div className='input-box'>
                        <input className='input' type="text" required/>
                        <div className='labelline'> Название проекта</div>
                    </div>
                    <div className='input-box'>
                        <select className='input' required>
                            <option></option>
                            {categories.map(element=>(
                               <option value={element.id}>{element.name}</option>
                            ))}
                        </select>
                        <div className='labelline'>Категория</div>
                    </div>
                    <div className='input-box'>
                        <select className='input' required>
                            <option></option>
                            {jenres.map(element=>(
                               <option value={element.id}>{element.name}</option>
                            ))}
                        </select>
                        <div className='labelline'>Жанры</div>
                    </div>
                    <div className='input-box-grid'>
                        <div className='input-box'>
                            <select className='input' required>
                                <option></option>
                                <option>Сериал</option>
                                <option>Фильм</option>
                            </select>
                            <div className='labelline'>Тип проекта</div>
                        </div>
                        <div className='input-box'>
                            <select className='input' required>
                                <option></option>
                                {categoryAges.map(element=>(
                                    <option value={element.id}>{element.name}</option>
                                ))}
                            </select>
                            <div className='labelline'>Возрастная категория</div>
                        </div>
                        <div className='input-box'>
                            <input className='input' type="number" required/>
                            <div className='labelline'>Год</div>
                        </div>
                        <div className='input-box'>
                            <input className='input' type="number" required/>
                            <div className='labelline'>Хронометраж (мин)</div>
                        </div>
                    </div>
                    <div className='input-box'>
                        <input className='input' type="number" required/>
                        <div className='labelline'>Ключевые слова</div>
                    </div>
                    <div className='textarea-box'>
                        <textarea className='textarea' required/>
                        <div className='labelline'>Описание</div>
                    </div>
                    <div className='input-box'>
                        <input className='input' type="text" required/>
                        <div className='labelline'>Режиссер</div>
                    </div>
                    <div className='input-box'>
                        <input className='input' type="text" required/>
                        <div className='labelline'>Продюсер</div>
                    </div>
                </div>
                <div className='add__container-buttons'>
                    <button className='further__button'>Далее</button>
                    <Link to="/projects"><button className='cancel__button'>Отмена</button></Link>
                </div>

            </div>
        </div>
    );
};

export default ProjectsAdd;