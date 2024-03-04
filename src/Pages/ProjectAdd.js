import { Link, useNavigate } from 'react-router-dom';
import RightIcon from '../assets/icons/rightIcon.svg'
import '../assets/styles/ProjectAdd.css'
import Button from '../assets/icons/Button.svg'
import { useEffect, useState } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { fetchCategories, fetchJenres, getAgeCategoryService } from '../service';
import axios from 'axios'

const ProjectsAdd = () => {
    const [jenres, setJenres] = useState([])
    const [categories, setCategories] = useState([])
    const [categoryAges, setCategoryAges] = useState([])
    const [selectedCategories, setSelectedCategories] = useState(null);
    const [selectedJenres, setSelectedJenres] = useState(null)
    const [selectedCategoryAges, setSelectedCategoryAges] = useState(null)
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [keyWords, setKeyWords] = useState("")
    const [movieType, setMovieType] = useState("")
    const [year, setYear] = useState()
    const [timing, setTiming] = useState()
    const [director, setDirector] = useState("")
    const [producer, setProducer] = useState("")
    const [idMovie, setIdMovie] = useState()

    const getJenres = () => {
        fetchJenres().then(result => setJenres(result))
    }

    const getCategories = () => {
        fetchCategories().then(result => setCategories(result))
    }

    const getCategorуAges = () => {
        getAgeCategoryService().then(result => setCategoryAges(result))
    }

    const postCreateMovie = () => {
        const token = localStorage.getItem("ozinshe_token")
        axios
            .post("http://api.ozinshe.com/core/V1/movies", {
                name,
                keyWords,
                movieType,
                timing,
                year,
                producer,
                director,
                description,
                "genres" : selectedJenres,
                "categories" : selectedCategories,
                "categoryAges" : selectedCategoryAges
            }, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
            .then(result => {
                console.log(result)
                setIdMovie(result.data.id)
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
                    <h2>Основная информация</h2>
                </div>
                <div className='add__container-form'>
                    <div className='input-box'>
                        <input value={name} onChange={e=>setName(e.target.value)} className='input' type="text" required/>
                        <div className='labelline'> Название проекта</div>
                    </div>
                    <div className='input__box'>
                        <MultiSelect value={selectedCategories} onChange={(e) => setSelectedCategories(e.value)} options={categories} optionLabel="name" 
                            maxSelectedLabels={4} className="input" />
                        <div className='labelline'>Категория</div>
                    </div>

                    <div className='input__box'>
                        <MultiSelect value={selectedJenres} onChange={(e) => setSelectedJenres(e.value)} options={jenres} optionLabel="name" 
                            maxSelectedLabels={4} className="input" />
                        <div className='labelline'>Жанры</div>
                    </div>
                   
                    <div className='input-box-grid'>
                        <div className='input-box'>
                            <select onChange={e=> setMovieType(e.target.value)} className='input' required>
                                <option></option>
                                <option value="SERIAL">Сериал</option>
                                <option value="MOVIE">Фильм</option>
                            </select>
                            <div className='labelline'>Тип проекта</div>
                        </div>
                        <div className='input__box'>
                            <MultiSelect value={selectedCategoryAges} onChange={(e) => setSelectedCategoryAges(e.value)} options={categoryAges} optionLabel="name" 
                                maxSelectedLabels={4} className="input" />
                            <div className='labelline'>Возрастная категория</div>
                        </div>
                        <div className='input-box'>
                            <input value={year} onChange={e=>setYear(e.target.valueAsNumber)} className='input' type="number" required/>
                            <div className='labelline'>Год</div>
                        </div>
                        <div className='input-box'>
                            <input value={timing} onChange={e=> setTiming(e.target.valueAsNumber)} className='input' type="number" required/>
                            <div className='labelline'>Хронометраж (мин)</div>
                        </div>
                    </div>
                    <div className='input-box'>
                        <input value={keyWords} onChange={e=> setKeyWords(e.target.value)} className='input' type="text" required/>
                        <div className='labelline'>Ключевые слова</div>
                    </div>
                    <div className='textarea-box'>
                        <textarea value={description} onChange={e=> setDescription(e.target.value)} className='textarea' required/>
                        <div className='labelline'>Описание</div>
                    </div>
                    <div className='input-box'>
                        <input value={director} onChange={e=> setDirector(e.target.value)} className='input' type="text" required/>
                        <div className='labelline'>Режиссер</div>
                    </div>
                    <div className='input-box'>
                        <input value={producer} onChange={e=>setProducer(e.target.value)} className='input' type="text" required/>
                        <div className='labelline'>Продюсер</div>
                    </div>
                </div>
                <div className='add__container-buttons'>
                    <button onClick={()=>postCreateMovie()} className='further__button'>Далее</button>
                    <Link to="/projects"><button className='cancel__button'>Отмена</button></Link>
                </div>
                {idMovie > 0 ? navigate(`/projects/add/${idMovie}/step2`) : ""}
            </div>
        </div>
    );
};

export default ProjectsAdd;