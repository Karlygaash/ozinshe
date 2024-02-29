import { useEffect } from 'react';
import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"
import Logo from '../assets/icons/logo.svg'
import {ReactComponent as HomeIcon} from '../assets/icons/home.svg'
import '../assets/styles/MainLayout.css'
import {ReactComponent as ProjectIcon} from '../assets/icons/ProjectIcon.svg' 
import {ReactComponent as CategoryIcon} from '../assets/icons/categoryIcon.svg'
import {ReactComponent as UserIcon} from '../assets/icons/UsersIcon.svg' 
import {ReactComponent as RoleIcon} from '../assets/icons/RoleIcon.svg'
import {ReactComponent as JenresIcon} from '../assets/icons/JenresIcon.svg' 
import {ReactComponent as AgesIcon} from '../assets/icons/AgesIcon.svg'
import SearchInput from '../assets/icons/SeachIcon.svg'
import LogoutIcon from '../assets/icons/logoutIcon.svg'
import axios from 'axios'
import SearchItem from '../Pages/SearchItem';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/md-light-indigo/theme.css'

const MainLayout = () => {
	const [searchWord, setSearchWord] = useState("")
	const navigate =useNavigate()
	const [isTrue, setIsTrue] = useState(false)

	const handleSearched = () => {
		setIsTrue(true)
		navigate(`/search/${searchWord}`)
	}

	const removeItem = () =>{
	    localStorage.removeItem("ozinshe_token")
		navigate("/login")
	}

	const handleLogout = () => {
        confirmDialog({
        message: "Вы действительно хотите выйти",
        header: `Выйти из системы?`,
        rejectLabel: "Отмена",
        acceptLabel: "Да, выйти",
		accept: () => removeItem()
        })
    }

    useEffect(() => {
		const token = localStorage.getItem("ozinshe_token")

		if (!token) {
			navigate("/login")
		}
	}, [navigate, isTrue])

    return(
    <div>
        <div className='header__section'>
			<div className='header__search'>
				<input onChange={e=>setSearchWord(e.target.value)} value={searchWord} placeholder='Поиск' type="text" className='header__search-input'/>
				<img onClick={e=>handleSearched()} src={SearchInput} className="header__search-icon" alt=""/>
			</div>
			<div onClick={e=>handleLogout()} className='header__logout'>
				Выйти
				<img src={LogoutIcon} className='header__logout-icon'/>
			</div>
			<ConfirmDialog/>
        </div>
        <div className="mainLayout">
			<aside className="app__sidebar">
                <div className='logo_main'>
                    <img src={Logo} alt=""/>
                </div>
				<nav className="navigation">
					<ul className="navigation__items">
						<li className="navigation__item">
							<NavLink
								to="/projects"
								className={({ isActive }) =>
									`navigation__link ${
										isActive
											? "navigation__link--active"
											: ""
									}`
								}>
								<ProjectIcon className='link__icon'/>
								Проекты
							</NavLink>
						</li>
						<li className="navigation__item">
							<NavLink
								to="movies-main"
								className={({ isActive }) =>
									`navigation__link ${
										isActive
											? "navigation__link--active"
											: ""
									}`
								}>
								<HomeIcon className='link__icon'/>
								Проекты на главной
							</NavLink>
						</li>

                        <li className="navigation__item">
							<NavLink
								to="/categories"
								className={({ isActive }) =>
									`navigation__link ${
										isActive
											? "navigation__link--active"
											: ""
									}`
								}>
								<CategoryIcon className='link__icon'/>
								Категории
							</NavLink>
						</li>

						<li className="navigation__item">
							<NavLink
								to="/users"
								className={({ isActive }) =>
									`navigation__link ${
										isActive
											? "navigation__link--active"
											: ""
									}`
								}>
								<UserIcon className='link__icon'/>
								Пользователи
							</NavLink>
						</li>

						<li className="navigation__item">
							<NavLink
								to="/roles"
								className={({ isActive }) =>
									`navigation__link ${
										isActive
											? "navigation__link--active"
											: ""
									}`
								}>
								<RoleIcon className='link__icon'/>
								Роли
							</NavLink>
						</li>
						<li className="navigation__item">
							<NavLink
								to="/jenres"
								className={({ isActive }) =>
									`navigation__link ${
										isActive
											? "navigation__link--active"
											: ""
									}`
								}>
								<JenresIcon className='link__icon'/>
								Жанры
							</NavLink>
						</li>
						<li className="navigation__item">
							<NavLink
								to="/category-ages"
								className={({ isActive }) =>
									`navigation__link ${
										isActive
											? "navigation__link--active"
											: ""
									}`
								}>
								<AgesIcon className='link__icon'/>
								Возвраст
							</NavLink>
						</li>
					</ul>
				</nav>
			</aside>

			<main className="app__content">
				<Outlet />
			</main>
		</div>
    </div>
    );
};

export default MainLayout;