import React, { useState, SetStateAction } from 'react'
import './Bookmarks.css'
import {ListItemAvatar, Avatar, ListItemSecondaryAction,  IconButton, SwipeableDrawer, List, ListItem, ListItemText, ListSubheader} from '@material-ui/core'
import { makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import User, { Bookmark } from '../../interfaces/User'
import { changeCoordinates } from '../../redux/reducers/coordinatesReducer';
import { deleteBookmark } from '../../redux/reducers/userReducer';
import PulseLoader from 'react-spinners/PulseLoader';

interface BookmarkProps {
  isDrawn: boolean,
  setIsDrawn: React.Dispatch<SetStateAction<boolean>>
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
  }),
);

function Bookmarks(props:BookmarkProps) {
    const user = useAppSelector<User>(state => state.user)
    const dispatch = useAppDispatch();
    const classes = useStyles();
    const [beingDeleted, setBeingDeleted] = useState<Set<string | undefined>>(new Set())

    const toggleDrawer = () => {
        props.setIsDrawn(prev => !prev)
    }

    const getLatLongString = (lat:number, lng: number):string => {
      let latitude:number = lat;
        let longitude:number = lng;
        let xDirection: string = 'E'
        let yDirection: string = 'N'

        if(latitude < 0) {
            latitude *= -1;
            yDirection = 'S'
        }
        if(longitude < 0) {
            longitude *= -1;
            xDirection = 'W'
        }
        return `${latitude.toFixed(3)}° ${yDirection}, ${longitude.toFixed(3)}° ${xDirection}`
    } 

    const handleLocationClick = (lat: number, lng: number):void  => {
        dispatch(changeCoordinates({lat: lat, lng: lng}))
        toggleDrawer()
    }

    const handleDeletion = async (bookmark:Bookmark) => {
          setBeingDeleted(prev => prev.add(bookmark!._id))
          dispatch(deleteBookmark(bookmark))
          .then(() => {
              setBeingDeleted(prev => { 
                  prev.delete(bookmark!._id);
                  return prev;
              })
          });
    }

    const list = () => (
        <div role="presentation">
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader" className="d-flex align-items-center justify-content-between">  
                Bookmarks
                <IconButton edge="end" aria-label="delete" onClick={(e) => {
                  e.preventDefault();
                  toggleDrawer();
                }}>
                  <ClearIcon />
                </IconButton>       
              </ListSubheader>
            }
          >
            {user?.bookmarks?.map( bookmark => {
              return(
                      <ListItem key={bookmark._id} button onClick={(e) => {
                        e.preventDefault();
                        handleLocationClick(bookmark.latitude, bookmark.longitude);
                      }}>
                        <ListItemAvatar>
                          <Avatar className={classes.small}>
                            <img className="mb-1 ms-1" src={`https://www.countryflags.io/${bookmark.country}/flat/64.png`} alt={`Flag of ${bookmark.country}`}></img>
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={bookmark.name} secondary ={getLatLongString(bookmark.latitude, bookmark.longitude)} />
                        <ListItemSecondaryAction>
                          {beingDeleted.has(bookmark._id) ? 
                          <PulseLoader size={5} color="#4A90E2"/> : 
                          <IconButton edge="end" aria-label="delete" onClick={(e) => {
                            e.preventDefault();
                            handleDeletion(bookmark);
                          }}>
                            <DeleteIcon />
                          </IconButton>}
                        </ListItemSecondaryAction>
                      </ListItem>
              )
            })}
          </List>
        </div>
      );

    return (
        <>
            <SwipeableDrawer
                anchor='right'
                open={props.isDrawn} 
                onClose={(e) => {
                    e.preventDefault()
                    toggleDrawer()
                }}
                onOpen={(e) => {
                    e.preventDefault()
                    toggleDrawer()
                }}
            >
                {list()}
            </SwipeableDrawer>
        </>
    )
}

export default Bookmarks
