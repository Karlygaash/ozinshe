import axios from 'axios'
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../assets/styles/SearchItem.css'
import { TabView, TabPanel } from 'primereact/tabview';
import EyeIcon from '../assets/icons/EyeIcon.svg'
import EditIcon from '../assets/icons/editIcon.svg'
import DeleteIcon from '../assets/icons/deleteIcon.svg'
import { getInformationSearchedService } from '../service';

const SearchItem = () => {
    const {searchWord} = useParams()
    const [searchItem, setSearchItem] = useState([])
    const [activeIndex, setActiveIndex] = useState(0);

    const getInformationSearched = () => {
        getInformationSearchedService(searchWord).then(result => setSearchItem(result))
    }

    useEffect(()=>{
        getInformationSearched()
    }, [{searchWord}])

    return(
        <div className='search__section'>
            <div className="search__header">
                <h1 className="section__header-title">Результаты поиска
                    <span className="projects__count">{searchItem.length}</span>
                </h1>
            </div>
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header="Проекты">
                    <div className='search__content'>
                        <div className="section__project-list">
                            {searchItem.map(element =>(
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
                </TabPanel>
                <TabPanel header="Категории">
                    <div className='search__content'>
                        <div className='not__found'>
                            Not found...
                        </div>
                    </div>
                </TabPanel>
                <TabPanel header="Пользователи">
                    <div className='search__content'>
                        <div className='not__found'>
                            Not found...
                        </div>
                    </div>
                </TabPanel>
            </TabView>
        </div>
    );
};

export default SearchItem;