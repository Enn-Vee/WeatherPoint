import React,{useState} from 'react'
import User from '../../interfaces/User';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logOut } from '../../redux/reducers/userReducer';
import Modal from './Modal';
import './NavBar.css'
import Bookmarks from './Bookmarks';
import {Avatar, Button, Menu, MenuItem} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function NavBar() {
    const user = useAppSelector<User | null>(state => state.user);
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isDrawn, setIsDrawn] = useState<boolean>(false);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleDrawer = () => {
        setIsDrawn(prev => !prev);
    }
    

    return (
        <>
            <nav className="navbar navbar-expand px-5 pt-3 mb-5">
                    <h1 className="navbar-brand" >WeatherPoint</h1>
                    <div className="ms-auto navbar-nav ">
                        { user ? 
                        <>
                            <Button onClick={handleClick}>
                                <span id="navbar-greeting">
                                    Welcome, {user?.name.split(' ')[0]}
                                </span>              
                                <ExpandMoreIcon />
                                <Avatar alt="Remy Sharp" src={user.picture} />
                            </Button>
                        </> :
                        <>
                            <li className="nav-item">
                            <Button onClick={(e) => {
                                e.preventDefault()
                                setShowModal(true)
                            }}>Log In</Button>
                            </li>
                        </>
                        }
                    </div>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                    >
                        <MenuItem onClick={(e) => {
                            e.preventDefault();
                            toggleDrawer();
                            handleClose();
                        }}>My Bookmarks</MenuItem>
                        <MenuItem onClick={(e) => {
                            e.preventDefault();
                            dispatch(logOut());
                            handleClose();
                        }}>Logout</MenuItem>
                    </Menu>
            </nav>
            <Modal show={showModal} setShow={setShowModal}></Modal>
            <Bookmarks isDrawn={isDrawn} setIsDrawn={setIsDrawn} />
        </>
    )
}

export default NavBar
