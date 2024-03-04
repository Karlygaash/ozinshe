import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import RightIcon from '../assets/icons/rightIcon.svg'
import '../assets/styles/ProjectAdd.css'
import Button from '../assets/icons/Button.svg'
import { useEffect, useState } from 'react';
import axios from 'axios'
import {fetchJenres, getProjectByIdService} from '../service'


const ProjectEdit = () => {
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


    const getJenres = () => {
        fetchJenres().then(result => setJenres(result))
    }

    const getProjectById = () => {
        getProjectByIdService(projectId).then(result => {
            setCategory(result.categories)
            setCategoryAge(result.categoryAge)
            setDescription(result.description)
            setDirector(result.director)
            setJenr(result.jenres)
            setKeyWords(result.keyWords)
            setNameProject(result.name)
            setProducer(result.producer)
            setMovieType(result.movieType)
            setTiming(result.timing)
            setYear(result.year)    
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
        getProjectById()
    }, [])

    const {projectId} = useParams()
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
                    <input value={nameProject} 
                        onChange={e=>setNameProject(e.target.value)}    
                        className='input' 
                        type="text" 
                        required/>
                    <div className='labelline'> Название проекта</div>
                </div>
                <div className='input-box'>
                    <select className='input' required>
                        <option>
                            {category.map(element=>(
                                <div key={element.id}>{element.name} </div>
                            ))}
                        </option>
                        {categories.map(element=>(
                           <option value={element.id}>{element.name}</option>
                        ))}
                    </select>
                    <div className='labelline'>Категория</div>
                </div>
                <div className='input-box'>
                    <select className='input' required>
                        {jenres.map(element=>(
                           <option value={element.id}>{element.name}</option>
                        ))}
                    </select>
                    <div className='labelline'>Жанры</div>
                </div>
                <div className='input-box-grid'>
                    <div className='input-box'>
                        <select className='input' required>
                            <option>{movieType}</option>
                            <option>Сериал</option>
                            <option>Фильм</option>
                        </select>
                        <div className='labelline'>Тип проекта</div>
                    </div>
                    <div className='input-box'>
                        <select className='input' required>
                            {categoryAges.map(element=>(
                                <option value={element.id}>{element.name}</option>
                            ))}
                        </select>
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

                {/* <div className="select-box">
                <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    isMulti
                    placeholder=""
                    styles={{
                        control: (baseStyles, state) =>({
                            ...baseStyles,
                            backgroundColor: "white",
                            fontSize: "17px",
                            letterSpacing: "-0.2px",
                            fontWeight: "700",
                            border: state.isFocused ? "none" : "1px solid #0052CC",
                            width: "100%",
                            padding: "5px 15px",
                            borderRadius: "15px",
                            height: "46px",
                            fontFamily: "'Roboto', sans-serif",
                            position: 'absolute'
                        }),
                        clearIndicator: ()=>({
                            display: "none"
                        })
                    }}
                />
                <div className='select-labelline'>Продюсер</div>
                </div> */}

            </div>
            <div className='add__container-buttons'>
                <button className='further__button'>Далее</button>
                <Link to="/projects"><button className='cancel__button'>Отмена</button></Link>
            </div>

        </div>
    </div>
    );
};

export default ProjectEdit;