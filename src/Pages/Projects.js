import { useEffect, useState } from "react";
import axios from 'axios'
import PlusIcon from '../assets/icons/plusIcon.svg'
import DownIcon from '../assets/icons/DownIcon.svg'
import ClockIcon from '../assets/icons/clockIcon.svg'
import EyeIcon from '../assets/icons/EyeIcon.svg'
import EditIcon from '../assets/icons/editIcon.svg'
import DeleteIcon from '../assets/icons/deleteIcon.svg'
import { Link } from "react-router-dom";
import '../assets/styles/Projects.css'

const Projects = () => {
    const [projects, setProjects] = useState([])
    const [categories, setCategories] = useState([])
    const [yearList, setYearList] = useState([])
    const [year, setYear]=useState("")
    const [categoryId, setCategoryId] = useState("")
    const [type, setType] =useState("")
    const [sortField, setSortField] = useState("")
  
    const getMovies = () => {
        const token = localStorage.getItem("ozinshe_token")
        axios
            .get(`http://api.ozinshe.com/core/V1/movies/page?year=${year}&categoryId=${categoryId}&type=${type}&sortField=${sortField}`, 
            {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                setProjects(result.data.content)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const getCategories = () => {
        const token = localStorage.getItem("ozinshe_token")
        axios
            .get("http://api.ozinshe.com/core/V1/categories", {
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

    const getYearsController = () => {
        const token = localStorage.getItem("ozinshe_token")
        axios
            .get("http://api.ozinshe.com/core/V1/year/list", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                setYearList(result.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(()=>{
        getMovies()
        getCategories()
        getYearsController()
    }, [year, categoryId, type, sortField])
    return(
        <div className="section">
            <div className="section__header">
                <h1 className="section__header-title">Проекты<span className="projects__count">{projects.length}</span></h1>
                <Link to="/projects/add"><button className="section__header-button"><img src={PlusIcon} alt="" className="section__header-button-icon"/> Добавить</button></Link>
            </div>

            <div className="section__sorted">
                <div className="sorted__item">
                    <p className="sorted__item-p">Сортировать:</p>
                    <div className="sorted__item-select-box">
                        <select className="sorted__item-select" onChange={e=>setSortField(e.target.value)}>
                            <option value="name">По имени</option>
                            <option value="createdDate">По дате регистрации</option>
                            <option value="lastModifiedDate">По дате обновление</option>
                        </select>
                        <img src={DownIcon} className="sorted__item-select-box-icon" alt=""/>
                    </div>
                </div>
                <div className="sorted__item">
                    <p className="sorted__item-p">Категория:</p>
                    <div className="sorted__item-select-box">
                        <select className="sorted__item-select" onChange={e=>setCategoryId(e.target.value)}>
                            <option value="">Все категории</option>
                            {categories.map(element =>(
                                <option value={element.id}>{element.name}</option>        
                            ))}
                        </select>
                        <img src={DownIcon} className="sorted__item-select-box-icon" alt=""/>
                    </div>
                </div>
                <div className="sorted__item">
                    <p className="sorted__item-p">Тип:</p>
                    <div className="sorted__item-select-box">
                        <select className="sorted__item-select" onChange={e=>setType(e.target.value)}>
                            <option value="">Все</option>
                            <option value="MOVIE">Фильмы</option>
                            <option value="SERIAL">Сериалы</option>
                        </select>
                        <img src={DownIcon} className="sorted__item-select-box-icon" alt=""/>
                    </div>
                </div>
                <div className="select__year">
                    <img src={ClockIcon} className="select__year-icon"/>    
                    <select className="sorted__item-select" onChange={e=>setYear(e.target.value)}>
                        <option>Выберите год</option>
                        {yearList.map(element => (
                            <option value={element}>{element}</option>
                        ))}
                    </select>
                </div>
            </div>  

            <div className="section__project-list">
                {projects.map(element =>(
                    <div key={element.id} className="section__project-item">
                        <Link to={`/projects/${element.id}`}><img src={element.poster.link} className="project__poster-image"/></Link>
                        <Link to={`/projects/${element.id}`}><h4 className="project__title">
                            {element.name.slice(0, 22)}
                            {element.name.length >22 ? '...' : ''}
                        </h4> </Link>
                        <ul>
                            <li className="">
                                {element.categories[0].name.slice(0, 11)}
                                {element.categories[0].name.length >11 ? '...' : ''}
                            </li>
                            
                            {element.categories.length>1 ? 
                            <li> 
                                {element.categories[1].name.slice(0, 11)}
                                {element.categories[1].name.length >11 ? '...' : ''}
                            </li> : ''}
            
                            
                        </ul>
                        <div className="project__footer">
                            <div className="project__watch-count">
                                <img src={EyeIcon} alt=""/>
                                {element.watchCount}
                            </div>
                            <div className="project__buttons">
                                <img className="project__button" src={EditIcon} alt=""/>
                                <img className="project__button" src={DeleteIcon} alt=""/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>    
        </div>
    );
};

export default Projects;