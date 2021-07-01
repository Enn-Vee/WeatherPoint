import React, {useRef} from 'react'
import GoogleButton from 'react-google-button'
import { useAppDispatch } from '../../redux/hooks';
import { getUser } from '../../redux/reducers/userReducer';

interface ModalProps {
    show: boolean,
    setShow:React.Dispatch<React.SetStateAction<boolean>>,
    children?: | React.ReactNode
}

function Modal(props: ModalProps) {

    const dispatch = useAppDispatch();

    const googleLogInRedirect = async () => {
        let timer: NodeJS.Timeout | null = null;
        const loginWindow = window.open(process.env.REACT_APP_BACKEND_URL + "/auth/google/", "_blank", "width=500, height=600, resizable=no" )
        if(loginWindow) {
            loginWindow.focus()
            timer = setInterval(() => {
                if(loginWindow.closed) {
                    if(timer)
                        clearInterval(timer)
                    dispatch(getUser());
                    props.setShow(false);
                }
            }, 500)
        }
    }

    const modalRef = useRef<HTMLDivElement>(null)
    const closeModal = (e:React.MouseEvent):void => {
        e.preventDefault();
        if(modalRef.current === e.target) {
            props.setShow(false);
        }
    }

    return (
        <>{ props.show ? <div ref={modalRef} onClick={e => closeModal(e)} style={{position:"absolute", top:"0", left:"0", height:"100%", width:"100%", backgroundColor:"rgba(0,0,0,0.6)", zIndex:100}}>
            {props.children}
            <GoogleButton style={{position:"absolute",top:"50%", left:"50%", transform:"translate(-50%,-50%)"}} onClick={googleLogInRedirect} />
        </div> : null}</>
    )
}

export default Modal
